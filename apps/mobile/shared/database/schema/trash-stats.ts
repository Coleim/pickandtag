export const TRASH_STATS_SCHEMA = `
  CREATE TABLE trash_stats (
    category TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (category),
  );
`;
