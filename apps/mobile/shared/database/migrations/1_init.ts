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
}
