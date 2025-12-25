import { Trash, TrashCount } from '@pickandtag/domain';
import { Store } from '@tanstack/react-store';
import { refreshPlayerStore } from '../services/player';

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
