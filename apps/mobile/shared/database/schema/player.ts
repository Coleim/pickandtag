export const PLAYERS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    xp INTEGER NOT NULL DEFAULT 0,
    trash_collected INTEGER NOT NULL DEFAULT 0,
    displayName TEXT,
    updated_at INTEGER
  );
`;
