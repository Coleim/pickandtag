import { randomUUID } from "expo-crypto";
import { database } from "../database/db";
import { playerStore } from "../stores/player-store";
import { getLastMonth, getLastWeek, getThisMonth, getThisWeek, getToday, getYesterdayRange } from "./dateRanges";
import { type Trash } from "@pickandtag/domain";
import { type LocationInfo } from "@/types/locationInfo";

const LAST_N_TRASHES_LIMIT = 20;

export async function refreshPlayerStore() {
  if (playerStore.state.status === 'loading') return;

  playerStore.setState((prev) => ({
     ...prev, 
     status: 'loading' 
  }));

  try {
    const snapshot = await loadPlayerSnapshot();
    if( snapshot ) {
      playerStore.setState((prev) => ({
        ...prev,
        status: 'ready',
        isInitialized: true,
        hasTrashes: snapshot.hasTrashes,
        currentXp: snapshot.player?.xp,
        displayName: snapshot.player?.displayName,
        playerId: snapshot.player?.id,
        updatedAt: snapshot.player?.updated_at,
        lastNTrashes: snapshot.lastNTrashes,
        trashCount: snapshot.trashCount
      }));
    }
  } catch (error) {
    console.error("Error refreshing player store:", error);
    playerStore.setState((prev) => ({
     ...prev, 
     status: 'error' 
  }));
  }
};


async function loadPlayerSnapshot() {
  try {
    const start = Date.now();
    const [totalTrashCount, bestWeekCount,
      dailyTrashCount, weeklyTrashCount, monthlyTrashCount,
      yesterdayTrashCount, lastWeekTrashCount, lastMonthTrashCount,
      lastNTrashes, player] = await Promise.all([
        database.getTrashesByCategories(),
        database.getBestWeekCount(),
        database.getTrashesByCategoriesAfter(getToday()),
        database.getTrashesByCategoriesAfter(getThisWeek()),
        database.getTrashesByCategoriesAfter(getThisMonth()),
        database.getTrashesByCategoriesBetween(getYesterdayRange()),
        database.getTrashesByCategoriesBetween(getLastWeek()),
        database.getTrashesByCategoriesBetween(getLastMonth()),
        database.getLastNTrashes(LAST_N_TRASHES_LIMIT),
        database.getPlayer()
      ]);

    console.log(">>>>>>> Loaded player from DB:", player);
    console.log('⏱️ TOTAL DB:', Date.now() - start, 'ms');

    return {
      player: player,
      hasTrashes: lastNTrashes.length > 0,
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
    }
  } catch (error) {
    console.error("Error ", error)
  }
  return null;
}


export function createTrash(category: string, locationInfo: LocationInfo, urlPicture: string): Trash {
  return {
    id: randomUUID(),
    category,
    latitude: locationInfo.latitude,
    longitude: locationInfo.longitude,
    city: locationInfo.city,
    region: locationInfo.region,
    subregion: locationInfo.subregion,
    country: locationInfo.country,
    imageUrl: urlPicture,
    createdAt: new Date(),
    updatedAt: new Date(),
    syncStatus: 'LOCAL'
  };
};