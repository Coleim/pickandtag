import * as SQLite from 'expo-sqlite';

export async function remove_last_synced_at(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`ALTER TABLE trashes DROP COLUMN IF EXISTS "lastSyncedAt";`);
}

