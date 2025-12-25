import * as SQLite from 'expo-sqlite';

export async function create_trash_stats(db: SQLite.SQLiteDatabase) {
  try {
    await db.withTransactionAsync(async () => {
      // Create table 
      await db.execAsync(`
        CREATE TABLE trash_stats (
          category TEXT NOT NULL,
          count INTEGER NOT NULL DEFAULT 0,
          PRIMARY KEY (category)
        );`);

      await db.execAsync(`
        INSERT INTO trash_stats (category, count)
          SELECT
            category,
            COUNT(*) AS count
          FROM trashes
          WHERE category IS NOT NULL
          GROUP BY category;`);

    });
    console.log('Migration complete ✅');
  } catch (err) {
    console.error('Migration failed ❌', err);
    throw err;
  }
}

