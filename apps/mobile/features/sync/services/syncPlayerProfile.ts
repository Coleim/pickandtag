import { supabase } from "@/lib/supabase";
import { database } from "@/shared/database/db";
import { playerStore } from "@/shared/stores/player-store";

export async function syncPlayerProfile(userId: string) {
  if (!userId) return null;

  const localState = playerStore.state;
  const trashCount = localState.trashCount?.total ? localState.trashCount.total.reduce((acc, val) => acc + val.count, 0) : 0;

  const input = {
    p_id: userId,
    p_xp: localState.currentXp,
    p_trash: trashCount,
    p_display_name: localState.displayName ?? null,
    p_updated_at: localState.updatedAt
  };
  const { data: updatedPlayer, error } = await supabase.rpc("update_player_progress", input);
  if (error) {
    console.error("syncPlayerProfile RPC error:", error);
    return null;
  }

  if (!updatedPlayer?.length) return null;

  const p = updatedPlayer[0];
  playerStore.setState((state) => ({
    ...state,
    currentXp: p.xp,
    displayName: p.display_name,
    updatedAt: p.updated_at,
    hasTrashes: p.trash_collected > 0,
    playerId: p.id
  }));

  await database.updatePlayer(p.xp, p.trash_collected, p.display_name, p.id);
  return p;
}
