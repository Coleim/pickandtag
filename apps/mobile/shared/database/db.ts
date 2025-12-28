import { Player, Trash, TrashCount} from "@pickandtag/domain";
import * as SQLite from 'expo-sqlite';
import { init_database_schema } from "./migrations/1_init";
import { images_urls_v2 } from "./migrations/2_images_urls";
import { add_player_display_name } from "./migrations/3_player_display_name";
import { PLAYERS_SCHEMA } from "./schema/player";
import { TRASHES_SCHEMA } from "./schema/trashes";
import { dirty_to_local } from "./migrations/4_dirty_to_local";
import { randomUUID } from "expo-crypto";
import { remove_last_synced_at } from "./migrations/5_remove_last_sync";
import { TRASH_STATS_SCHEMA } from "./schema/trash-stats";
import { create_trash_stats } from "./migrations/6_trash_stats";

export const db = SQLite.openDatabaseSync("pickntag.db");

const build_database = [init_database_schema, images_urls_v2, add_player_display_name, dirty_to_local, 
                        remove_last_synced_at, create_trash_stats];

class Database {
  private isInitialized: Promise<void>;
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("pickntag.db");
    this.isInitialized = this.initDb();
    this.initPlayer();
  }

  private async initPlayer() {
    await this.isInitialized;
    const player = await this.getPlayer();
    if( player === null ) {
      await this.newPlayer();
    }
  }

  private async initDb() {
    try {

      await this.db.execAsync(`CREATE TABLE IF NOT EXISTS meta (
        key TEXT,
        value TEXT,
        PRIMARY KEY(key)
      )`);

      // select all rows from meta
      const all_meta_rows = await this.db.getAllAsync(`SELECT * FROM meta`);

      console.info('[DB] all_meta_rows:', all_meta_rows);

      const meta_row: { value: number } | null = await this.db.getFirstAsync(`SELECT value FROM meta where key = 'db_version'`);

      console.info('[DB] meta_row:', meta_row);
      let currentVersion = meta_row ? Number(meta_row.value) : -1;
      const targetVersion = build_database.length;

      console.info('[DB] current version:', currentVersion, ' - target version:', targetVersion);

      // if version is -1 but there are rows in trashes, set version to 0 (legacy db)
      if (currentVersion === -1) {
        // check if the table exists first
        const table_info = await this.db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='trashes';`);
        console.info('[DB] table_info for trashes:', table_info);
        if (table_info.length === 0) {
          console.info('[DB] No trashes table found, assuming fresh install.');
        } else {
          console.info('[DB] Trashes table exists, checking for existing data.');
          const trash_count_row: { count: number } | null = await this.db.getFirstAsync(`SELECT COUNT(*) as count FROM trashes`);
          if (trash_count_row && trash_count_row.count > 0) {
            console.info('[DB] Legacy database detected, setting version to 0');
            await this.db.runAsync(
              `INSERT OR REPLACE INTO meta (key, value) VALUES ('db_version', '0')`
            );
            currentVersion = 0;
          }
        }
      }

      // FRESH INSTALL
      if (currentVersion === -1) {
        console.info('[DB] Fresh install → create final schema');

        // schémas finaux
        await this.db.execAsync(TRASHES_SCHEMA);
        await this.db.execAsync(PLAYERS_SCHEMA);
        await this.db.execAsync(TRASH_STATS_SCHEMA);
        await this.db.runAsync(
          `INSERT INTO meta (key, value) VALUES ('db_version', ?)`,
          targetVersion.toString()
        );
        return;
      }

      for (let i = currentVersion; i < targetVersion; ++i) {
        console.info('[DB] migrate', i, '→', i + 1);
        try {
          await build_database[i](this.db);
          await this.db.runAsync(`UPDATE meta SET value = ? WHERE key = 'db_version'`, (i + 1).toString());
        } catch (err) {
          console.error('[DB] migration failed at step', i, '→', i + 1, err);
          throw err;
        }
      }

    } catch (err) {
      console.error('[DB] init error:', err);
    }
  }

  async getLastNTrashes(n: number): Promise<Trash[]> {
    await this.isInitialized;
    return this.db.getAllAsync(`SELECT id, category, city, createdAt FROM trashes ORDER BY createdAt DESC LIMIT ${n}`);
  }

  async getTrashesByCategoriesAfter(date: Date): Promise<TrashCount[]> {
    await this.isInitialized;
    const timestamp = date.getTime();
    return this.db.getAllAsync(`SELECT category, count(id) as count FROM trashes 
                                WHERE createdAt >= ? 
                                GROUP BY category 
                                ORDER BY count DESC`, [timestamp]);
  }

  async getTrashesByCategoriesBetween(range: { from: Date, to: Date }): Promise<TrashCount[]> {
    await this.isInitialized;
    const fromTs = range.from.getTime();
    const toTs = range.to.getTime();
    return this.db.getAllAsync(`SELECT category, count(id) as count FROM trashes WHERE createdAt >= ? AND createdAt < ? GROUP BY category ORDER BY count DESC`, [fromTs, toTs]);
  }


  async getTrashesByCategories(): Promise<TrashCount[]> {
    await this.isInitialized;
    return this.db.getAllAsync(`SELECT category, count(id) as count FROM trashes GROUP BY category ORDER BY count DESC`);
  }

  async getPlayer(): Promise<Player | null> {
    await this.isInitialized;
    const start = Date.now();
    const player: Player | null = await this.db.getFirstAsync('SELECT * FROM players');
    console.log('[DB] getPlayer:', Date.now() - start, 'ms');
    return player;
  }

  async getBestWeekCount(): Promise<number> {
    await this.isInitialized;
    const start = Date.now();
    const result: { count: number } | null = await this.db.getFirstAsync(
      `SELECT 
        MIN(createdAt) as weekStart,
        COUNT(id) as count
        FROM trashes
        GROUP BY strftime('%Y-%W', datetime(createdAt / 1000, 'unixepoch'))
        ORDER BY count DESC
        LIMIT 1`
    )
    console.log('[DB] getBestWeekCount:', Date.now() - start, 'ms');
    return result?.count ?? 0;
  }

  async newPlayer() {
    await this.isInitialized;
    await db.runAsync(
          `INSERT INTO players(id, xp, trash_collected, updated_at) VALUES(?, 0, 0, CURRENT_TIMESTAMP)`,
          randomUUID()
        );
  }

  async insertTrash(trash: Trash) {
    await this.isInitialized;
    const query = 'INSERT INTO trashes (id, event_id, category, latitude, longitude, city, country, region, subregion, imageUrl, syncStatus, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const trashCount = 'UPDATE players SET trash_collected = trash_collected + 1, updated_at = CURRENT_TIMESTAMP'
    try {
      await this.db.runAsync(query, trash.id, trash.event_id ?? null, trash.category, trash.latitude, trash.longitude,
        trash.city, trash.country, trash.region, trash.subregion, trash.imageUrl ?? null, trash.syncStatus, trash.createdAt.getTime(), trash.updatedAt.getTime());
      await this.db.runAsync(trashCount);
    } catch (error) {
      console.error("error : ", error)
    }
  }

  async addExperienceToPlayer(gainedXP: number) {
    await this.isInitialized;
    console.log("[[[ Adding experience to player ]]] ", gainedXP);
    try {
      await this.db.runAsync(
        `UPDATE players SET xp = MAX(xp + ?, 0), updated_at = CURRENT_TIMESTAMP`,
        [gainedXP]
      );
    } catch (error) {
      console.error(error)
    }
  }


  async updatePlayer(xp: number, trash_collected: number, display_name: string, playerId: string) {
    await this.isInitialized;
    try {
      await this.db.runAsync(
        `UPDATE players SET xp = MAX(?, 0), trash_collected = MAX(?, 0), displayName = ?, updated_at = CURRENT_TIMESTAMP, id = ?`,
        [xp, trash_collected, display_name, playerId]
      );
    } catch (error) {
      console.error(error)
    }
  }

  async getTrashById(trashId: string): Promise<Trash | null> {
    await this.isInitialized;
    const row: any = await this.db.getFirstAsync(
      `SELECT * FROM trashes WHERE id = ?`,
      trashId
    );

    if (!row) return null;
    const trash: Trash = {
      id: row.id,
      event_id: row.event_id ?? undefined,
      category: row.category,
      latitude: row.latitude,
      longitude: row.longitude,
      city: row.city,
      subregion: row.subregion,
      region: row.region,
      country: row.country,
      imageUrl: row.imageUrl ?? undefined,
      syncStatus: row.syncStatus as Trash['syncStatus'],
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt)
    };

    return trash;

  }

  async deleteTrashById(trashId: string) {
    await this.isInitialized;
    await this.db.runAsync(
      `DELETE FROM trashes WHERE id = ?`,
      [trashId]
    );
    await this.db.runAsync(
      `UPDATE players SET trash_collected = MAX(trash_collected - 1, 0), updated_at = CURRENT_TIMESTAMP`
    );
  }

  async getNotSyncedImageUrls(): Promise<{ id: string; imageUrl: string | null }[]> {
    await this.isInitialized;
    return this.db.getAllAsync<{ id: string; imageUrl: string | null }>(`SELECT id, imageUrl FROM trashes WHERE syncStatus IN ('LOCAL')`);
  }

  async getNotSyncedTrashes(): Promise<Trash[]> {
    await this.isInitialized;
    const rows: any[] = await this.db.getAllAsync(
      `SELECT * FROM trashes WHERE syncStatus IN ('IMAGE_UPLOADED', 'LOCAL')`
    );
    return rows.map(row => ({
      id: row.id,
      event_id: row.event_id ?? undefined,
      category: row.category,
      latitude: row.latitude,
      longitude: row.longitude,
      city: row.city,
      subregion: row.subregion,
      region: row.region,
      country: row.country,
      imageUrl: row.imageUrl ?? undefined,
      syncStatus: row.syncStatus,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    }));
  }

  async updateTrashImageUrl(trashId: string, remoteImageUrl: string) {
    await this.isInitialized;
    await this.db.runAsync(
      `UPDATE trashes SET imageUrl = ?, syncStatus = 'IMAGE_UPLOADED', updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [remoteImageUrl, trashId]
    );
  }

  async markTrashesAsSynced(trashIds: string[]) {
    await this.isInitialized;
    const placeholders = trashIds.map(() => '?').join(',');
    await this.db.runAsync(
      `UPDATE trashes SET syncStatus = 'SYNCED', updatedAt = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`,
      [...trashIds]
    );
  }

  async updateAllTrashStats(updatedStats: { category: string; count: number }[]) {
    await this.isInitialized;
    await this.isInitialized;
    await this.db.withTransactionAsync(async () => {
      for (const stat of updatedStats) {
        await this.db.runAsync(
          `INSERT INTO trash_stats (category, count) VALUES (?, ?)
          ON CONFLICT(category) DO UPDATE SET count = ?; `,
          [stat.category, stat.count, stat.count]
        );
      }
    });
  }

  async updateTrashStats(category: string) {
    await this.isInitialized;
    try {
      await this.db.runAsync(
        `INSERT INTO trash_stats (category, count) VALUES (?, 1)
         ON CONFLICT(category) DO UPDATE SET count = count + 1`,
        [category]
      );
    } catch (error) {
      console.error("error updating trash stats: ", error)
    }
  }

  async decrementTrashStats(category: string) {
    await this.isInitialized;
    try {
      await this.db.runAsync(
        `UPDATE trash_stats SET count = CASE WHEN count > 0 THEN count - 1 ELSE 0 END WHERE category = ?`,
        [category]
      );
    } catch (error) {
      console.error("error decrementing trash stats: ", error)
    }
  }

  async getTotalTrashStats() {
    await this.isInitialized;
    return this.db.getAllAsync<TrashCount>(`SELECT category, count FROM trash_stats`);
  }

  async insertTrashes(newTrashes: any) {
    await this.isInitialized;
    const placeholders = newTrashes
      .map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .join(',');
    const values = [];
    for (const t of newTrashes) {
      values.push(
        t.id,
        t.event_id,
        t.category,
        t.latitude,
        t.longitude,
        t.city,
        t.subregion,
        t.region,
        t.country,
        t.image_url,
        'SYNCED',
        t.created_at,
        t.updated_at
      );
    }
    await db.runAsync(`
      INSERT OR IGNORE INTO trashes (
        id, event_id, category, latitude, longitude,
        city, subregion, region, country, imageUrl, syncStatus,
        createdAt, updatedAt
      ) VALUES ${placeholders};
    `, values);
  }
}

export const database = new Database();
