import { supabase } from '@/lib/supabase';
import { TrashCategories } from '@/shared/constants/trash-categories';
import { database } from '@/shared/database/db';
import { Trash, TrashCount } from '@pickandtag/domain';
import { Store } from '@tanstack/react-store';
import { File } from 'expo-file-system';
import { refreshPlayerStore } from '../services/player';
import { getLastMonth, getLastWeek, getThisMonth, getThisWeek, getToday, getYesterdayRange } from '../services/dateRanges';

type StoreStatus = 'idle' | 'loading' | 'ready' | 'error';

export type PlayerState = {
  status: StoreStatus;
  isInitialized: boolean;
  hasTrashes: boolean;
  currentXp?: number;
  displayName?: string;
  playerId?: string;
  updatedAt?: Date;

  lastNTrashes?: Trash[];
  trashCount?: {
    total: TrashCount[];
    bestWeek: number,
    thisWeek: number,
    monthly: TrashCount[];
    weekly: TrashCount[];
    daily: TrashCount[];
    yesterday: TrashCount[],
    lastWeek: TrashCount[],
    lastMonth: TrashCount[]
  },
};

export const playerStore = new Store<PlayerState>({
  status: 'idle',
  isInitialized: false,
  hasTrashes: false
});

let initPromise: Promise<void> | null = null;
export function initializePlayerStore() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    console.log('Initializing player store...');
    try {
      await refreshPlayerStore();
      console.log('Player store initialized.');
    } catch (error) {
      console.error('Error initializing player store:', error);
    }
  })();
  return initPromise;
}

export function updateDisplayName(name: string) {
  playerStore.setState((prev) => {
    return {
      ...prev,
      displayName: name
    }
  });
}

