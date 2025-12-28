export const TRASH_STATS_SCHEMA = `
  CREATE TABLE trash_stats (
    category TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  );
`;
