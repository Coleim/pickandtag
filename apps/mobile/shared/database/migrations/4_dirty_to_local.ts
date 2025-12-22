import * as SQLite from 'expo-sqlite';

export async function dirty_to_local(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`UPDATE trashes
    SET syncStatus = 'LOCAL'
    WHERE syncStatus = 'dirty';`);
}

