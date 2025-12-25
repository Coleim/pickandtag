import * as SQLite from 'expo-sqlite';

export async function remove_last_synced_at(db: SQLite.SQLiteDatabase) {
  try {
    await db.withTransactionAsync(async () => {
      // 1. Rename old table
      await db.execAsync(`ALTER TABLE trashes RENAME TO trashes_old;`);

      // 2. Create new table without lastSyncedAt
      await db.execAsync(`
        CREATE TABLE trashes (
          id TEXT PRIMARY KEY,
          event_id TEXT,
          category TEXT,
          latitude TEXT,
          longitude TEXT,
          city TEXT,
          country TEXT,
          region TEXT,
          subregion TEXT,
          imageUrl TEXT,
          syncStatus TEXT,
          createdAt INTEGER,
          updatedAt INTEGER
        );
      `);

      // 3. Copy data from old table
      await db.execAsync(`
        INSERT INTO trashes (
          id, event_id, category, latitude, longitude, city, country, region, subregion, imageUrl, syncStatus, createdAt, updatedAt
        )
        SELECT
          id, event_id, category, latitude, longitude, city, country, region, subregion, imageUrl, syncStatus, createdAt, updatedAt
        FROM trashes_old;
      `);

      // 4. Drop old table
      await db.execAsync(`DROP TABLE trashes_old;`);
    });

    console.log('Migration complete ✅');
  } catch (err) {
    console.error('Migration failed ❌', err);
    throw err;
  }
}

