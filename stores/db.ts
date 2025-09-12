import { Player } from "@/types/player";
import { Trash } from "@/types/trash";
import { randomUUID } from "expo-crypto";
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync("pickntag.db");


async function initDb() {
  try {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS trashes (
      id TEXT,
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
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS players (
        id TEXT,
        xp INTEGER NOT NULL DEFAULT 0,
        trash_collected INTEGER NOT NULL DEFAULT 0,
        updated_at INTEGER
      );
    `);


    // await db.execAsync('DELETE FROM players')
    // await db.execAsync('DELETE FROM trashes')

    const row: { count: number } | null = await db.getFirstAsync(`SELECT COUNT(*) as count FROM players`);
    if (row?.count === 0) {
      const id = randomUUID();
      await db.runAsync(
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
initDb();

export function getTrashes(): Promise<Trash[]> {
  return db.getAllAsync('SELECT * FROM trashes');
}

export function getPlayer(): Promise<Player | null> {
  return db.getFirstAsync('SELECT * FROM players');
}

export async function insertTrash(trash: Trash) {
  const query = 'INSERT INTO trashes VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
  try {
    const result = await db.runAsync(query, trash.id, trash.category, trash.latitude, trash.longitude,
      trash.city, trash.country, trash.region, trash.subregion, trash.imageBase64, trash.syncStatus, trash.createdAt.getTime(), trash.updatedAt.getTime(), trash.lastSyncedAt.getTime());
  } catch (error) {
    console.error("error : ", error)
  }
}


export async function addTrashToPlayer(gainedXP: number) {
  try {
    await db.runAsync(
      `UPDATE players SET xp = xp + ?, trash_collected = trash_collected + 1, updated_at = CURRENT_TIMESTAMP`,
      [gainedXP]
    );
  } catch (error) {
    console.error(error)
  }
}





