export const TRASH_STATS_SCHEMA = `
  CREATE TABLE trash_stats (
    category TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (category),
  );
`;
