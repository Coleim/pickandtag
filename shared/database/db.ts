import { Player } from "@/types/player";
import { Trash, TrashCount } from "@/types/trash";
import * as SQLite from 'expo-sqlite';
import { init_database_schema } from "./migrations/1_init";
import { images_urls_v2 } from "./migrations/2_images_urls";

export const db = SQLite.openDatabaseSync("pickntag.db");

// const build_database = [init_database_schema];
const build_database = [init_database_schema, images_urls_v2];

class Database {
  private isInitialized: Promise<void>;
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("pickntag.db");
    this.isInitialized = this.initDb();
  }

  private async initDb() {
    try {
      // await this.db.execAsync('DROP TABLE players')
      // await this.db.execAsync('DROP TABLE trashes')
      // await this.db.execAsync('DROP TABLE meta')

      await this.db.execAsync(`CREATE TABLE IF NOT EXISTS meta (
        key TEXT,
        value TEXT,
        PRIMARY KEY(key)
      )`);

      const meta_row: { value: number } | null = await this.db.getFirstAsync(`SELECT value FROM meta where key = 'db_version'`);
      let version = Number(meta_row ? meta_row.value : 0);

      console.log("- We are at version: ", version)

      for (let i = version; i < build_database.length; ++i) {
        console.log(i)
        console.log(i + 1)
        await build_database[i](this.db);
        // await this.db.runAsync(`INSERT OR REPLACE INTO meta (key, value) VALUES('db_version', ?)`, (i + 1).toString());
      }

    } catch (err) {
      console.error("err: ", err)
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
        trash.city, trash.country, trash.region, trash.subregion, trash.imageUrl, trash.syncStatus, trash.createdAt.getTime(), trash.updatedAt.getTime(), trash.lastSyncedAt.getTime());
    } catch (error) {
      console.error("error : ", error)
    }
  }

  async addTrashToPlayer(gainedXP: number) {
    await this.isInitialized;
    try {
      await this.db.runAsync(
        `UPDATE players SET xp = xp + ?, trash_collected = trash_collected + 1, updated_at = CURRENT_TIMESTAMP`,
        [gainedXP]
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
}

export const database = new Database();
