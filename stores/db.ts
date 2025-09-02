import { Trash } from "@/types/trash";
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync("pickntag.db");

async function initDb() {
  try {
    const res = await db.execAsync(`
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
  } catch (err) {
    console.log("err: ", err)
  }
}
initDb();

export function getTrashes(): Promise<Trash[]> {
  return db.getAllAsync('SELECT * FROM trashes');
}


export async function insertTrash(trash: Trash) {
  const query = 'INSERT INTO trashes VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
  try {
    const result = await db.runAsync(query, trash.id, trash.category, trash.latitude, trash.longitude,
      trash.city, trash.country, trash.region, trash.subregion, trash.imageBase64, trash.syncStatus, trash.createdAt.getTime(), trash.updatedAt.getTime(), trash.lastSyncedAt.getTime());
    console.log(result.lastInsertRowId, result.changes);
  } catch (error) {
    console.log("error : ", error)
  }
}


