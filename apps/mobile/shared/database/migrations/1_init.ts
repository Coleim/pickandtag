import { randomUUID } from "expo-crypto";
import * as SQLite from 'expo-sqlite';

export async function init_database_schema(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
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
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS players (
      id TEXT,
      xp INTEGER NOT NULL DEFAULT 0,
      trash_collected INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER
    );
  `);

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


}
