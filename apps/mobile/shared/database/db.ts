import { Trash, TrashCount } from "@/types/trash";
import { Player } from "@pickandtag/domain";
import * as SQLite from 'expo-sqlite';
import { init_database_schema } from "./migrations/1_init";
import { images_urls_v2 } from "./migrations/2_images_urls";
import { add_player_display_name } from "./migrations/3_player_display_name";
import { PLAYERS_SCHEMA } from "./schema/player";
import { TRASHES_SCHEMA } from "./schema/trashes";

export const db = SQLite.openDatabaseSync("pickntag.db");

const build_database = [init_database_schema, images_urls_v2, add_player_display_name];

class Database {
  private isInitialized: Promise<void>;
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("pickntag.db");
    this.isInitialized = this.initDb();
  }

  private async initDb() {
    try {

      await this.db.execAsync(`CREATE TABLE IF NOT EXISTS meta (
        key TEXT,
        value TEXT,
        PRIMARY KEY(key)
      )`);

      const meta_row: { value: number } | null = await this.db.getFirstAsync(`SELECT value FROM meta where key = 'db_version'`);
      const currentVersion = meta_row ? Number(meta_row.value) : 0;
      const targetVersion = build_database.length;

      console.log('[DB] current:', currentVersion, 'target:', targetVersion);

      // FRESH INSTALL
      if (currentVersion === 0) {
        console.log('[DB] Fresh install → create final schema');

        // schémas finaux
        await this.db.execAsync(TRASHES_SCHEMA);
        await this.db.execAsync(PLAYERS_SCHEMA);

        await this.db.runAsync(
          `INSERT INTO meta (key, value) VALUES ('db_version', ?)`,
          targetVersion.toString()
        );

        return;
      }


      for (let i = currentVersion; i < targetVersion; ++i) {
        console.log('[DB] migrate', i, '→', i + 1);
        await build_database[i](this.db);
        await this.db.runAsync(`UPDATE meta SET value = ? WHERE key = 'db_version'`, (i + 1).toString());
      }

    } catch (err) {
      console.error('[DB] init error:', err);
    }
  }

  async hasTrashes(): Promise<boolean> {
    await this.isInitialized;
    const row = await this.db.getFirstAsync(
      `SELECT 1 FROM trashes LIMIT 1`
    );
    console.log(" row:  ", row)
    return !!row;
  }

  async getLastNTrashes(n: number): Promise<Trash[]> {
    await this.isInitialized;
    return this.db.getAllAsync(`SELECT id, category, city, createdAt FROM trashes ORDER BY createdAt DESC LIMIT ${n}`);
  }

  async getTrashesByCategoriesAfter(date: Date): Promise<TrashCount[]> {
    await this.isInitialized;
    const timestamp = date.getTime();
    return this.db.getAllAsync(`SELECT category, count(id) as count FROM trashes WHERE createdAt >= ? GROUP BY category ORDER BY count DESC`, [timestamp]);
  }

  async getTrashesByCategoriesBetween(range: { from: Date, to: Date }): Promise<TrashCount[]> {
    console.log("get by : ", range)
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

  async insertTrash(trash: Trash) {
    await this.isInitialized;
    const query = 'INSERT INTO trashes (id, event_id, category, latitude, longitude, city, country, region, subregion, imageUrl, syncStatus, createdAt, updatedAt, lastSyncedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    try {
      await this.db.runAsync(query, trash.id, trash.event_id ?? null, trash.category, trash.latitude, trash.longitude,
        trash.city, trash.country, trash.region, trash.subregion, trash.imageUrl ?? null, trash.syncStatus, trash.createdAt.getTime(), trash.updatedAt.getTime(), trash.lastSyncedAt.getTime());
    } catch (error) {
      console.error("error : ", error)
    }
  }

  async addTrashToPlayer(gainedXP: number) {
    await this.isInitialized;
    try {
      await this.db.runAsync(
        `UPDATE players SET xp = xp + ?, updated_at = CURRENT_TIMESTAMP`,
        [gainedXP]
      );
    } catch (error) {
      console.error(error)
    }
  }


  async updatePlayer(xp: number, trash_collected: number, display_name: string) {
    await this.isInitialized;
    try {
      await this.db.runAsync(
        `UPDATE players SET xp = ?, trash_collected = ?, updated_at = CURRENT_TIMESTAMP`,
        [xp, trash_collected, display_name]
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
      updatedAt: new Date(row.updatedAt),
      lastSyncedAt: new Date(row.lastSyncedAt),
    };

    return trash;

  }

  async deleteTrashById(trashId: string) {
    await this.isInitialized;
    const result = await this.db.runAsync(
      `DELETE FROM trashes WHERE id = ?`,
      [trashId]
    );
  }

  async getNotSyncedImageUrls() {
    await this.isInitialized;
    return this.db.getAllAsync(`SELECT id, imageUrl FROM trashes WHERE syncStatus IN ('dirty', 'LOCAL', 'ERROR')`);
  }
}

export const database = new Database();
