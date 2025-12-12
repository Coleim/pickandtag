import * as SQLite from 'expo-sqlite';

export async function add_player_display_name(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`ALTER TABLE players ADD COLUMN displayName TEXT;`);
}

