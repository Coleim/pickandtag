type SyncStatus =
  | 'LOCAL'           // created locally, nothing uploaded
  | 'dirty'
  | 'IMAGE_UPLOADED'  // image is online, row not yet synced
  | 'SYNCED'          // fully synced
  | 'ERROR';          // last attempt failed




// 'dirty' | 'syncing' | 'synced' | 'failed' | 'pending_delete' | 'deleted' | 'conflict'
// 
