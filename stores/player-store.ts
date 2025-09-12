import { TrashCategories } from '@/constants/TrashCategories';
import { Trash } from '@/types/trash';
import { Store } from '@tanstack/react-store';
import { addTrashToPlayer, getPlayer, getTrashes, insertTrash } from './db';

type PlayerState = {
  isInit: boolean;
  trashes: Trash[];
  weeklyTrashes: Trash[];
  currentXp: number;
  // level: number;
};

export const playerStore = new Store<PlayerState>({
  isInit: false,
  trashes: [],
  weeklyTrashes: [],
  currentXp: 0,
  // level: 1
});

let initPromise: Promise<void> | null = null;

export function initializeTrashStore() {
  if (!initPromise) {
    initPromise = (async () => {
      const [trashes, player] = await Promise.all([
        getTrashes(),
        getPlayer()
      ]);

      playerStore.setState({
        isInit: true,
        trashes: trashes.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt), // here we just convert from db timestamp to a real date
        })),
        weeklyTrashes: trashes.filter((t: any) => new Date(t.createdAt) > getLastWeekDates()).map(t => ({ ...t, createdAt: new Date(t.createdAt) })),
        currentXp: player?.xp ?? 0,
        // level: calculatePlayerLevel(player?.xp ?? 0)
      });

    })();
  }
  return initPromise;
}


initializeTrashStore();


function getLastWeekDates(): Date {

  // Calculate last week's Monday at 00:00
  const lastMonday = new Date();
  const day = lastMonday.getDay();
  lastMonday.setDate(lastMonday.getDate() - day - 6);
  lastMonday.setHours(0, 0, 0, 0);

  return lastMonday;

  // const now = new Date();
  // const lastHour = new Date(now);
  // lastHour.setHours(now.getHours() - 2);
  // return lastHour;


  // return date;
}


export async function addTrash(trash: Trash) {
  await initializeTrashStore();
  await insertTrash(trash);

  const gainedXP = TrashCategories[trash.category].points;
  await addTrashToPlayer(gainedXP);

  playerStore.setState((prev) => {
    const newXP = prev.currentXp + gainedXP;
    return {
      ...prev,
      trashes: [...playerStore.state.trashes, trash],
      weeklyTrashes: [...playerStore.state.weeklyTrashes.filter((t: any) => t.createdAt > getLastWeekDates()), trash],
      currentXp: newXP,
      // level: calculatePlayerLevel(newXP),
    };
  });
}


