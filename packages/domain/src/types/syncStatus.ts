export type SyncStatus =
  | 'LOCAL'           // created locally, nothing uploaded
  | 'IMAGE_UPLOADED'  // image is online, row not yet synced
  | 'SYNCED';          // fully synced
