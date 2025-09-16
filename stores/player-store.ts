import { TrashCategories } from '@/constants/TrashCategories';
import { Trash } from '@/types/trash';
import { Store } from '@tanstack/react-store';
import { database } from './db';

type PlayerState = {
  isInit: boolean;
  trashes: Trash[];
  weeklyTrashes: Trash[];
  currentXp: number;
};

export const playerStore = new Store<PlayerState>({
  isInit: false,
  trashes: [],
  weeklyTrashes: [],
  currentXp: 0,
});

let initPromise: Promise<void> | null = null;

export function initializeTrashStore() {
  if (!initPromise) {
    initPromise = (async () => {
      const [trashes, player] = await Promise.all([
        database.getTrashes(),
        database.getPlayer()
      ]);

      playerStore.setState({
        isInit: true,
        trashes: trashes.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt), // here we just convert from db timestamp to a real date
        })),
        weeklyTrashes: trashes.filter((t: any) => new Date(t.createdAt) > getLastWeekDates()).map(t => ({ ...t, createdAt: new Date(t.createdAt) })),
        currentXp: player?.xp ?? 0,
      });

    })();
  }
  return initPromise;
}

initializeTrashStore();


function getLastWeekDates(): Date {
  const lastMonday = new Date();
  const day = lastMonday.getDay();
  lastMonday.setDate(lastMonday.getDate() - day - 6);
  lastMonday.setHours(0, 0, 0, 0);
  return lastMonday;
}


export async function addTrash(trash: Trash) {
  await initializeTrashStore();
  await database.insertTrash(trash);

  const gainedXP = TrashCategories[trash.category].points;
  await database.addTrashToPlayer(gainedXP);

  playerStore.setState((prev) => {
    const newXP = prev.currentXp + gainedXP;
    return {
      ...prev,
      trashes: [...playerStore.state.trashes, trash],
      weeklyTrashes: [...playerStore.state.weeklyTrashes.filter((t: any) => t.createdAt > getLastWeekDates()), trash],
      currentXp: newXP,
    };
  });
}


