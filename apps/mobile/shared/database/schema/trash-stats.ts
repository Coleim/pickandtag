export const TRASH_STATS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS trash_stats (
    category TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  );
`;
