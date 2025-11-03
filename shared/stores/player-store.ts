import { TrashCategories } from '@/shared/constants/trash-categories';
import { database } from '@/shared/database/db';
import { Trash, TrashCount } from '@/types/trash';
import { Store } from '@tanstack/react-store';

type PlayerState = {
  isInit: boolean;
  hasTrashes: boolean;
  trashCount: {
    total: TrashCount[];
    bestWeek: TrashCount | null;
    monthly: TrashCount[];
    weekly: TrashCount[];
    daily: TrashCount[];
    yesterday: TrashCount[],
    lastWeek: TrashCount[],
    lastMonth: TrashCount[]
  } | null,
  weeklyTrashes: Trash[];
  currentXp: number;
};

export const playerStore = new Store<PlayerState>({
  isInit: false,
  hasTrashes: false,
  trashCount: null,
  weeklyTrashes: [],
  currentXp: 0,
});

let initPromise: Promise<void> | null = null;

export function initializeTrashStore() {
  if (!initPromise) {
    initPromise = (async () => {

      try {

        const start = Date.now();

        const t1 = Date.now();
        await database.hasTrashes();
        console.log('1️⃣ hasTrashes:', Date.now() - t1, 'ms');
        const t2 = Date.now();
        await database.hasTrashes();
        console.log('2 hasTrashes:', Date.now() - t2, 'ms');



        // REVIEW: Consider adding try/catch around DB calls to set a recoverable error state.
        const [hasTrashes, bestWeek,
          dailyTrashCount, weeklyTrashCount, monthlyTrashCount, totalTrashCount,
          yesterdayTrashCount, lastWeekTrashCount, lastMonthTrashCount,
          weeklyTrashes, player] = await Promise.all([
            database.hasTrashes(),
            database.getBestWeek(),
            database.getTrashesByCategoriesAfter(getToday()),
            database.getTrashesByCategoriesAfter(getThisWeek()),
            database.getTrashesByCategoriesAfter(getThisMonth()),
            database.getTrashesByCategories(),
            database.getTrashesByCategoriesBetween(getYesterdayRange()),
            database.getTrashesByCategoriesBetween(getLastWeek()),
            database.getTrashesByCategoriesBetween(getLastMonth()),
            database.getLastNTrashes(20),
            database.getPlayer()
          ]);


        console.log('⏱️ TOTAL:', Date.now() - start, 'ms');

        playerStore.setState((state) => ({
          ...state,
          isInit: true,
          hasTrashes: hasTrashes,
          weeklyTrashes: weeklyTrashes.map((t: any) => ({
            ...t,
            createdAt: new Date(t.createdAt), // here we just convert from db timestamp to a real date
          })),
          trashCount: {
            total: totalTrashCount,
            bestWeek: bestWeek ?? { count: 0 },
            monthly: monthlyTrashCount,
            weekly: weeklyTrashCount,
            daily: dailyTrashCount,
            yesterday: yesterdayTrashCount,
            lastWeek: lastWeekTrashCount,
            lastMonth: lastMonthTrashCount
          },
          currentXp: player?.xp ?? 0,
        }));


      } catch (error) {
        console.log("Error ", error)
      }
    })();
  }
  return initPromise;
}

initializeTrashStore();
// REVIEW: Side-effectful initialization at import time can complicate testing and SSR. Consider explicit bootstrap in app root.

function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getYesterdayRange(): { from: Date, to: Date } {
  const from = new Date();
  from.setDate(from.getDate() - 1);
  from.setHours(0, 0, 0, 0);
  const to = new Date(from);
  to.setDate(to.getDate() + 1);
  return { from, to };
}
function getThisWeek(): Date {
  const lastMonday = new Date();
  const day = lastMonday.getDay();
  lastMonday.setDate(lastMonday.getDate() - day + 1);
  lastMonday.setHours(0, 0, 0, 0);
  return lastMonday;
}

function getLastWeek(): { from: Date; to: Date } {
  const to = getThisWeek();

  const from = new Date(to);
  from.setDate(to.getDate() - 7);

  return { from, to };
}

function getThisMonth(): Date {
  const now = new Date();
  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  return now;
}

function getLastMonth(): { from: Date, to: Date } {
  const to = new Date();
  to.setDate(1);
  to.setHours(0, 0, 0, 0);

  const from = new Date(to.getFullYear(), to.getMonth() - 1, 1);
  from.setHours(0, 0, 0, 0);

  return { from, to };
}

export async function addTrash(trash: Trash) {
  await initializeTrashStore();
  await database.insertTrash(trash);

  const gainedXP = TrashCategories[trash.category].points;
  await database.addTrashToPlayer(gainedXP);

  playerStore.setState((prev) => {
    const newXP = prev.currentXp + gainedXP;
    const updateCount = (counts: TrashCount[] = [], category: string): TrashCount[] => {
      let found = false;
      const updated = counts.map(e => {
        if (e.category === category) {
          found = true;
          return { ...e, count: e.count + 1 };
        }
        return e;
      });
      if (!found) updated.push({ category, count: 1 });
      return updated;
    };

    const prevCounts = prev.trashCount ?? {
      total: [],
      bestWeek: { count: 0 },
      monthly: [],
      weekly: [],
      daily: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: []
    };

    prevCounts.bestWeek!.count = Math.max(prev.weeklyTrashes.length + 1, prevCounts.bestWeek?.count ?? 0)

    return {
      ...prev,
      hasTrashes: true,
      weeklyTrashes: [...prev.weeklyTrashes.filter((t: Trash) => t.createdAt >= getThisWeek()), trash],
      trashCount: {
        total: updateCount(prev.trashCount?.total, trash.category),
        monthly: trash.createdAt >= getThisMonth() ? updateCount(prev.trashCount?.monthly, trash.category) : prev.trashCount?.monthly ?? [],
        weekly: trash.createdAt >= getThisWeek() ? updateCount(prev.trashCount?.weekly, trash.category) : prev.trashCount?.weekly ?? [],
        daily: trash.createdAt >= getToday() ? updateCount(prev.trashCount?.daily, trash.category) : prev.trashCount?.daily ?? [],
        bestWeek: prevCounts.bestWeek,
        yesterday: prevCounts.yesterday,
        lastWeek: prevCounts.lastWeek,
        lastMonth: prevCounts.lastMonth
      },
      currentXp: newXP,
    };
  });
}

export async function deleteTrash(trash: Trash) {
  await initializeTrashStore();

  // 1️⃣ Delete from DB
  await database.deleteTrashById(trash.id);

  // 2️⃣ Subtract XP
  const lostXP = TrashCategories[trash.category].points;
  await database.addTrashToPlayer(-lostXP);

  // 3️⃣ Update store
  playerStore.setState((prev) => {
    const newXP = Math.max(prev.currentXp - lostXP, 0);

    const updateCount = (counts: TrashCount[] = [], category: string): TrashCount[] => {
      return counts
        .map(e => (e.category === category ? { ...e, count: Math.max(e.count - 1, 0) } : e))
        .filter(e => e.count > 0);
    };

    const prevCounts = prev.trashCount ?? {
      total: [],
      bestWeek: { count: 0 },
      monthly: [],
      weekly: [],
      daily: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: []
    };

    const updatedWeeklyTrashes = prev.weeklyTrashes.filter((t: Trash) => t.id !== trash.id);
    const bestWeekCount = Math.max(prevCounts.bestWeek?.count ?? 0, updatedWeeklyTrashes.length);

    return {
      ...prev,
      weeklyTrashes: updatedWeeklyTrashes,
      trashCount: {
        total: updateCount(prev.trashCount?.total, trash.category),
        monthly: trash.createdAt >= getThisMonth() ? updateCount(prev.trashCount?.monthly, trash.category) : prev.trashCount?.monthly ?? [],
        weekly: trash.createdAt >= getThisWeek() ? updateCount(prev.trashCount?.weekly, trash.category) : prev.trashCount?.weekly ?? [],
        daily: trash.createdAt >= getToday() ? updateCount(prev.trashCount?.daily, trash.category) : prev.trashCount?.daily ?? [],
        bestWeek: { count: bestWeekCount },
        yesterday: prev.trashCount?.yesterday ?? [],
        lastWeek: prev.trashCount?.lastWeek ?? [],
        lastMonth: prev.trashCount?.lastMonth ?? [],
      },
      currentXp: newXP,
    };
  });
}
