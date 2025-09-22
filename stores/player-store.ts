import { TrashCategories } from '@/constants/TrashCategories';
import { Trash } from '@/types/trash';
import { Store } from '@tanstack/react-store';
import { database } from './db';

type PlayerState = {
  isInit: boolean;
  hasTrashes: boolean;
  allTrashes: Trash[];
  monthlyTrashes: Trash[];
  weeklyTrashes: Trash[];
  dailyTrashes: Trash[];
  currentXp: number;
};

export const playerStore = new Store<PlayerState>({
  isInit: false,
  hasTrashes: false,
  allTrashes: [],
  monthlyTrashes: [],
  weeklyTrashes: [],
  dailyTrashes: [],
  currentXp: 0,
});

let initPromise: Promise<void> | null = null;

export function initializeTrashStore() {
  if (!initPromise) {
    initPromise = (async () => {
      const [hasTrashes, dailyTrashes, weeklyTrashes, player] = await Promise.all([
        database.hasTrashes(),
        database.getTrashesAfter(getToday()),
        database.getTrashesAfter(getThisWeek()),
        database.getPlayer()
      ]);

      playerStore.setState((state) => ({
        ...state,
        isInit: true,
        hasTrashes: hasTrashes,
        weeklyTrashes: weeklyTrashes.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt), // here we just convert from db timestamp to a real date
        })),
        dailyTrashes: dailyTrashes.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt), // here we just convert from db timestamp to a real date
        })),
        currentXp: player?.xp ?? 0,
      }));

    })();
  }
  return initPromise;
}

initializeTrashStore();

function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getThisWeek(): Date {
  const lastMonday = new Date();
  const day = lastMonday.getDay();
  lastMonday.setDate(lastMonday.getDate() - day - 6);
  lastMonday.setHours(0, 0, 0, 0);
  return lastMonday;
}
function getThisMonth(): Date {
  const now = new Date();
  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  return now;
}

export async function updateMonthlyTrashes() {
  await initializeTrashStore();
  const monthlyTrashes = await database.getTrashesAfter(getThisMonth());
  playerStore.setState((state) => ({
    ...state,
    monthlyTrashes: monthlyTrashes
  }))
}

export async function updateAllTrashes() {
  await initializeTrashStore();
  const allTrashes = await database.getTrashes();
  playerStore.setState(state => ({
    ...state,
    allTrashes: allTrashes
  }))
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
      hasTrashes: true,
      monthlyTrashes: [...playerStore.state.monthlyTrashes.filter((t: any) => t.createdAt >= getThisMonth()), trash],
      weeklyTrashes: [...playerStore.state.weeklyTrashes.filter((t: any) => t.createdAt >= getThisWeek()), trash],
      dailyTrashes: [...playerStore.state.dailyTrashes.filter((t: any) => t.createdAt >= getToday()), trash],
      currentXp: newXP,
    };
  });
}


