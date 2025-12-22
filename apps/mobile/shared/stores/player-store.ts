import { supabase } from '@/lib/supabase';
import { TrashCategories } from '@/shared/constants/trash-categories';
import { database } from '@/shared/database/db';
import { Trash, TrashCount } from '@/types/trash';
import { Store } from '@tanstack/react-store';
import { File } from 'expo-file-system';

export type PlayerState = {
  isInit: boolean;
  hasTrashes: boolean;
  trashCount: {
    total: TrashCount[];
    bestWeek: number,
    thisWeek: number,
    monthly: TrashCount[];
    weekly: TrashCount[];
    daily: TrashCount[];
    yesterday: TrashCount[],
    lastWeek: TrashCount[],
    lastMonth: TrashCount[]
  } | null,
  lastNTrashes: Trash[];
  currentXp: number;
  displayName?: string;
  playerId?: string;
  updatedAt?: Date;
};

export const playerStore = new Store<PlayerState>({
  isInit: false,
  hasTrashes: false,
  trashCount: null,
  lastNTrashes: [],
  currentXp: 0,
});


const LAST_N_TRASHES_LIMIT = 20;

let initPromise: Promise<void> | null = null;
initializeTrashStore();

export function initializeTrashStore() {
  if (!initPromise) {
    initPromise = (async () => {
      try {
        const start = Date.now();
        const [hasTrashes, bestWeekCount,
          dailyTrashCount, weeklyTrashCount, monthlyTrashCount, totalTrashCount,
          yesterdayTrashCount, lastWeekTrashCount, lastMonthTrashCount,
          lastNTrashes] = await Promise.all([
            database.hasTrashes(),
            database.getBestWeekCount(),
            database.getTrashesByCategoriesAfter(getToday()),
            database.getTrashesByCategoriesAfter(getThisWeek()),
            database.getTrashesByCategoriesAfter(getThisMonth()),
            database.getTrashesByCategories(),
            database.getTrashesByCategoriesBetween(getYesterdayRange()),
            database.getTrashesByCategoriesBetween(getLastWeek()),
            database.getTrashesByCategoriesBetween(getLastMonth()),
            database.getLastNTrashes(20)
          ]);

        let player = await database.getPlayer();
        if( player === null ) {
          await database.newPlayer();
          player = await database.getPlayer();
        }
        console.log('⏱️ TOTAL DB:', Date.now() - start, 'ms');

        playerStore.setState((state) => ({
          ...state,
          isInit: true,
          hasTrashes: hasTrashes,
          lastNTrashes: lastNTrashes.map((t: any) => ({
            ...t,
            createdAt: new Date(t.createdAt), // here we just convert from db timestamp to a real date
          })),
          trashCount: {
            total: totalTrashCount,
            bestWeek: bestWeekCount,
            thisWeek: weeklyTrashCount.reduce((acc, val) => acc + val.count, 0),
            monthly: monthlyTrashCount,
            weekly: weeklyTrashCount,
            daily: dailyTrashCount,
            yesterday: yesterdayTrashCount,
            lastWeek: lastWeekTrashCount,
            lastMonth: lastMonthTrashCount
          },
          currentXp: player?.xp ?? 0,
          displayName: player?.displayName ?? undefined,
          updatedAt: player?.updated_at ? new Date(player?.updated_at) : new Date()
        }));


      } catch (error) {
        console.error("Error ", error)
      }
    })();
  }
  return initPromise;
}


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
      bestWeek: 0,
      thisWeek: 0,
      monthly: [],
      weekly: [],
      daily: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: []
    };

    return {
      ...prev,
      hasTrashes: true,
      lastNTrashes: [trash, ...prev.lastNTrashes].slice(0, LAST_N_TRASHES_LIMIT),
      trashCount: {
        total: updateCount(prev.trashCount?.total, trash.category),
        monthly: trash.createdAt >= getThisMonth() ? updateCount(prev.trashCount?.monthly, trash.category) : prev.trashCount?.monthly ?? [],
        weekly: trash.createdAt >= getThisWeek() ? updateCount(prev.trashCount?.weekly, trash.category) : prev.trashCount?.weekly ?? [],
        daily: trash.createdAt >= getToday() ? updateCount(prev.trashCount?.daily, trash.category) : prev.trashCount?.daily ?? [],
        bestWeek: Math.max(prevCounts.bestWeek, prevCounts.thisWeek + 1),
        thisWeek: prevCounts.thisWeek + 1,
        yesterday: prevCounts.yesterday,
        lastWeek: prevCounts.lastWeek,
        lastMonth: prevCounts.lastMonth
      },
      currentXp: newXP,
      updatedAt: new Date()
    };
  });
}

export async function deleteTrash(trash: Trash) {
  await initializeTrashStore();

  // 1️⃣ Delete from DB
  await database.deleteTrashById(trash.id);

  // Delete image from storage
  if( trash.imageUrl && (trash.syncStatus === 'LOCAL') ) {
    // Delete local image
    const sourceFile = new File(trash.imageUrl);
    sourceFile.delete();
  } else if (trash.imageUrl) {
    const playerId = playerStore.state.playerId;
    const { error } = await supabase.storage.from('trash-images')
      .remove([`${playerId}/${trash.id}.png`]);
    if (error) {
      console.error('Failed to delete remote image:', error);
    }
  }

  // 2️⃣ Subtract XP
  const lostXP = TrashCategories[trash.category].points;
  await database.addTrashToPlayer(-lostXP);

  const [bestWeekCount,
    dailyTrashCount, weeklyTrashCount, monthlyTrashCount, totalTrashCount,
    yesterdayTrashCount, lastWeekTrashCount, lastMonthTrashCount,
    lastNTrashes] = await Promise.all([
      database.getBestWeekCount(),
      database.getTrashesByCategoriesAfter(getToday()),
      database.getTrashesByCategoriesAfter(getThisWeek()),
      database.getTrashesByCategoriesAfter(getThisMonth()),
      database.getTrashesByCategories(),
      database.getTrashesByCategoriesBetween(getYesterdayRange()),
      database.getTrashesByCategoriesBetween(getLastWeek()),
      database.getTrashesByCategoriesBetween(getLastMonth()),
      database.getLastNTrashes(LAST_N_TRASHES_LIMIT),
    ]);

  // 3️⃣ Update store
  playerStore.setState((prev) => {
    const newXP = Math.max(prev.currentXp - lostXP, 0);

    return {
      ...prev,
      lastNTrashes: lastNTrashes.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt), // here we just convert from db timestamp to a real date
      })),
      trashCount: {
        total: totalTrashCount,
        bestWeek: bestWeekCount,
        thisWeek: weeklyTrashCount.reduce((acc, val) => acc + val.count, 0),
        monthly: monthlyTrashCount,
        weekly: weeklyTrashCount,
        daily: dailyTrashCount,
        yesterday: yesterdayTrashCount,
        lastWeek: lastWeekTrashCount,
        lastMonth: lastMonthTrashCount
      },
      currentXp: newXP,
      updatedAt: new Date()
    }
  });
}


export function updateDisplayName(name: string) {
  playerStore.setState((prev) => {
    return {
      ...prev,
      displayName: name
    }
  });
}

