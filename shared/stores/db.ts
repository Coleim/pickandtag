import { Player } from "@/shared/types/player";
import { Trash, TrashCount } from "@/shared/types/trash";
import { TrashCategory } from "@/shared/types/trashCategory";
import { randomUUID } from "expo-crypto";
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync("pickntag.db");

class Database {
  private isInitialized: Promise<void>;
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("pickntag.db");
    this.isInitialized = this.initDb();

    // Exemple d’utilisation
    // const fakeTrashes = generateTrashes();
    // fakeTrashes.forEach(trash => this.insertTrash(trash))
  }

  private async initDb() {
    try {
      // await this.db.execAsync('DROP TABLE players')
      // await this.db.execAsync('DROP TABLE trashes')
      await this.db.execAsync(`
    CREATE TABLE IF NOT EXISTS trashes (
      id TEXT,
      event_id TEXT,
      category TEXT,
      latitude TEXT,
      longitude TEXT,
      city TEXT,
      country TEXT,
      region TEXT,
      subregion TEXT,
      imageb64 BLOB,
      syncStatus TEXT,
      createdAt INTEGER,
      updatedAt INTEGER,
      lastSyncedAt INTEGER,
      PRIMARY KEY(id) 
   );
  `);
      await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS players (
        id TEXT,
        xp INTEGER NOT NULL DEFAULT 0,
        trash_collected INTEGER NOT NULL DEFAULT 0,
        updated_at INTEGER
      );
    `);

      const row: { count: number } | null = await this.db.getFirstAsync(`SELECT COUNT(*) as count FROM players`);
      if (row?.count === 0) {
        const id = randomUUID();
        await this.db.runAsync(
          `INSERT INTO players(id, xp, trash_collected, updated_at) VALUES(?, 0, 0, CURRENT_TIMESTAMP)`,
          id
        );
        console.log("Player inserted with id:", id);
      } else {
        console.log("Players table is not empty, skipping insert.");
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

  async getTrashesAfter(date: Date): Promise<Trash[]> {
    await this.isInitialized;
    const timestamp = date.getTime();
    return db.getAllAsync(`SELECT * FROM trashes WHERE createdAt >= ? ORDER BY createdAt`, [timestamp]);
  }

  async getTrashesByCategoriesAfter(date: Date): Promise<TrashCount[]> {
    await this.isInitialized;
    const timestamp = date.getTime();
    return db.getAllAsync(`SELECT category, count(id) as count FROM trashes WHERE createdAt >= ? GROUP BY category ORDER BY count DESC`, [timestamp]);
  }

  async getTrashesByCategoriesBetween(range: { from: Date, to: Date }): Promise<TrashCount[]> {
    await this.isInitialized;
    const fromTs = range.from.getTime();
    const toTs = range.to.getTime();

    return db.getAllAsync(`SELECT category, count(id) as count FROM trashes WHERE createdAt >= ? AND createdAt < ? GROUP BY category ORDER BY count DESC`, [fromTs, toTs]);
  }


  async getTrashesByCategories(): Promise<TrashCount[]> {
    await this.isInitialized;
    return db.getAllAsync(`SELECT category, count(id) as count FROM trashes GROUP BY category ORDER BY count DESC`);
  }

  async getPlayer(): Promise<Player | null> {
    await this.isInitialized;
    return db.getFirstAsync('SELECT * FROM players');
  }

  async getBestWeek(): Promise<TrashCount | null> {
    await this.isInitialized;
    return db.getFirstAsync(
      `SELECT 
        MIN(createdAt) as weekStart,
        COUNT(id) as count
     FROM trashes
     GROUP BY strftime('%Y-%W', datetime(createdAt / 1000, 'unixepoch'))
     ORDER BY count DESC
     LIMIT 1`

      // `SELECT 
      //    strftime('%Y-%W', datetime(createdAt / 1000, 'unixepoch')) as week,
      //    COUNT(id) as count
      //    FROM trashes
      //    GROUP BY week
      //    ORDER BY count DESC
      //    LIMIT 1`
    );
  }

  async insertTrash(trash: Trash) {
    await this.isInitialized;
    const query = 'INSERT INTO trashes VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    try {
      await this.db.runAsync(query, trash.id, trash.event_id ?? null, trash.category, trash.latitude, trash.longitude,
        trash.city, trash.country, trash.region, trash.subregion, trash.imageBase64, trash.syncStatus, trash.createdAt.getTime(), trash.updatedAt.getTime(), trash.lastSyncedAt.getTime());
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

}

// TMP To insert trashes
const categories: TrashCategory[] = [
  "Plastique",
  "Polystyrene",
  "Papier",
  "Verre",
  "Metal",
  "Autre",
];

// --- Utilitaires ---
function randomCoord(min: number, max: number): string {
  return (Math.random() * (max - min) + min).toFixed(6);
}

function randomCategory(): TrashCategory {
  return categories[Math.floor(Math.random() * categories.length)];
}

function randomCity(): {
  city: string;
  country: string;
  region: string;
  subregion: string;
} {
  const options = [
    { city: "Paris", country: "France", region: "Île-de-France", subregion: "Paris" },
    { city: "Nice", country: "France", region: "Provence-Alpes-Côte d’Azur", subregion: "Alpes-Maritimes" },
    { city: "Lyon", country: "France", region: "Auvergne-Rhône-Alpes", subregion: "Rhône" },
    { city: "Marseille", country: "France", region: "Provence-Alpes-Côte d’Azur", subregion: "Bouches-du-Rhône" },
    { city: "Toulouse", country: "France", region: "Occitanie", subregion: "Haute-Garonne" },
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function makeTrash(date: Date): Trash {
  const loc = randomCity();
  return {
    id: randomUUID(),
    event_id: randomUUID(),
    category: randomCategory(),
    latitude: randomCoord(43.5, 49.5),
    longitude: randomCoord(1.0, 7.5),
    ...loc,
    imageBase64: "",
    syncStatus: "dirty",
    createdAt: date,
    updatedAt: new Date(date.getTime() + Math.floor(Math.random() * 3600000)), // +0-1h
    lastSyncedAt: new Date(date.getTime() + Math.floor(Math.random() * 7200000)), // +0-2h
  };
}

function randomPastDate(daysBack: number): Date {
  const now = new Date();
  const past = new Date(now);
  past.setDate(now.getDate() - daysBack);
  past.setHours(Math.floor(Math.random() * 24));
  past.setMinutes(Math.floor(Math.random() * 60));
  return past;
}

// --- Génération des datasets ---
function generateTrashes(): Trash[] {
  const trashes: Trash[] = [];

  // 10 aujourd'hui
  const now = new Date();
  for (let i = 0; i < 10; i++) {
    trashes.push(makeTrash(now));
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; ++i) {
    trashes.push(makeTrash(yesterday))
  }

  // 15 la semaine dernière (entre 7 et 13 jours)
  for (let i = 0; i < 15; i++) {
    trashes.push(makeTrash(randomPastDate(Math.floor(Math.random() * 7) + 7)));
  }

  // 35 le mois dernier (entre 14 et 30 jours)
  for (let i = 0; i < 35; i++) {
    trashes.push(makeTrash(randomPastDate(Math.floor(Math.random() * 16) + 14)));
  }

  // 90 répartis sur les 11 mois précédents
  for (let i = 0; i < 90; i++) {
    trashes.push(makeTrash(randomPastDate(Math.floor(Math.random() * 330) + 31)));
  }

  return trashes;
}



export const database = new Database();
