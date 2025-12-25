import { supabase } from "@/lib/supabase";
import { database } from "@/shared/database/db";

export async function syncPlayerStats(userId: string) {
  if (!userId) return;

  // get player stats from server
  const { data: serverStats, error: statsError } = await supabase
      .from("trash_stats")  // or your player stats table
      .select("*")
      .eq("player_id", userId);

  if (statsError) {
    console.error("Failed to fetch player stats from server:", statsError);
    return;
  }

  // get trashes that are not synced in local
  const localTrashes = await database.getNotSyncedTrashes();
  const localCounts: Record<string, number> = {};
  for (const t of localTrashes) {
    if (!localCounts[t.category]) localCounts[t.category] = 0;
    localCounts[t.category]++;
  }

  // Add up to update the local stats
  const updatedStats = serverStats?.map((stat: any) => ({
      category: stat.category,
      count: stat.count + (localCounts[stat.category] || 0),
    })) || [];

  // save
  await database.updateAllTrashStats(updatedStats);
}
