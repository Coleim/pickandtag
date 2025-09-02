
export type Trash = {
  id: string;
  category: string;
  latitude: string;
  longitude: string;
  city: string;
  subregion: string;
  region: string;
  country: string;
  imageBase64: string;
  syncStatus: 'dirty' | 'syncing' | 'synced' | 'failed' | 'pending_delete' | 'deleted' | 'conflict';
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date;
};



