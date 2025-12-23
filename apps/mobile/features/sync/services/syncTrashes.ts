import { supabase } from "@/lib/supabase";
import { database } from "@/shared/database/db";

let isTrashSyncRunning = false;
export async function syncTrashes(playerId: string) {
  if (isTrashSyncRunning) return;
  isTrashSyncRunning = true;
  try {
    const trashes = await database.getNotSyncedTrashes();

    if (trashes.length === 0) return;

    const payload = trashes.map((trash) => ({
      id: trash.id,
      event_id: trash.event_id || null,
      player_id: playerId,
      category: trash.category,
      latitude: trash.latitude,
      longitude: trash.longitude,
      city: trash.city,
      subregion: trash.subregion,
      region: trash.region,
      country: trash.country,
      image_url: trash.imageUrl || null,
      created_at: trash.createdAt.getTime(),
      updated_at: trash.updatedAt?.getTime() || trash.createdAt.getTime()
    }));

    console.log(`Syncing ${payload.length} trashes for player ${playerId}`);
    // Upsert vers Supabase
    const { error } = await supabase.from('trashes')
      .upsert(payload, { onConflict: 'id' });
    if(error) {
      console.error("syncTrashes upsert error:", error);
    }
  } finally {
    isTrashSyncRunning = false;
  }
}