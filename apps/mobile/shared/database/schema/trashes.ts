export const TRASHES_SCHEMA = `
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
`;

