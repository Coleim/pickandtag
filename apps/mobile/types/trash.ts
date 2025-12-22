import { type SyncStatus } from "./syncStatus";

export type Trash = {
  id: string;
  event_id?: string;
  category: string;
  latitude: string;
  longitude: string;
  city: string;
  subregion: string;
  region: string;
  country: string;
  imageUrl?: string;
  syncStatus: SyncStatus;
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date;
};


export type TrashCount = {
  category?: string;
  count: number;
}


