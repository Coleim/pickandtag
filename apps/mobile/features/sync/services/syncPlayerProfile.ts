import { supabase } from "@/lib/supabase";
import { TrashCategories } from "@/shared/constants/trash-categories";
import { database } from "@/shared/database/db";
import { playerStore } from "@/shared/stores/player-store";

export async function syncPlayerProfile(userId: string) {
  //TODO: Rework to be done (See syncPlayerStats ; sync first , then update local diffs)
  console.log("[Syncing player] profile");
  if (!userId) return;

  // 1️⃣ Récupérer le profil serveur
  const { data: serverPlayer, error } = await supabase
    .from("players")
    .select("id, xp, trash_collected, display_name, updated_at")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("syncPlayerProfile error fetching server data:", error);
    return;
  }

  if (!serverPlayer) return;


  // Diff avec le local 
  const localTrashes = await database.getNotSyncedTrashes();
  const totalCount = localTrashes.length + (serverPlayer.trash_collected || 0);
  let totalXp = serverPlayer.xp; // + localXpGained; // TODO: Calculate local XP gained
  // Calculate local XP gained
  for (const t of localTrashes) {
    // Assuming TrashCategories is accessible here
    const categoryPoints = TrashCategories[t.category]?.points || 0;
    totalXp += categoryPoints;
  }

  // 2️⃣ Mettre à jour le store local
  playerStore.setState((state) => ({
    ...state,
    currentXp: totalXp,
    displayName: serverPlayer.display_name,
    updatedAt: serverPlayer.updated_at,
    hasTrashes: totalCount > 0,
    playerId: serverPlayer.id
  }));

  await database.updatePlayer(totalXp, totalCount, serverPlayer.display_name, serverPlayer.id);
}
