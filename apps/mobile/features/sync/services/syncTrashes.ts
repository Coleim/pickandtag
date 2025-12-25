import { supabase } from "@/lib/supabase";
import { database } from "@/shared/database/db";

let isTrashSyncRunning = false;
export async function syncTrashes(playerId: string) {
  if (isTrashSyncRunning) return;
  isTrashSyncRunning = true;
  try {
    await uploadTrashes(playerId);
    // await downloadTrashes();
  } finally {
    isTrashSyncRunning = false;
  }
}

// async function downloadTrashes() {
//   const trashes: Trash[] = await database.getSyncedTrashes();
//   console.log(">>>>>>>> Trashes:", JSON.stringify(trashes));
//   const localEventIds = trashes.map( (trash:Trash) => trash.id);
//   console.log( " EVENT IDS TO EXCLUDE:", localEventIds);
//   console.log(`Downloading ${localEventIds.length} new trashes...`);

//   if( localEventIds.length === 0 ) return;

//   const chunkSize = 1000;
//   for (let i = 0; i < localEventIds.length; i += chunkSize) {
//     const chunk = localEventIds.slice(i, i + chunkSize);

//     const { data: newTrashes, error } = await supabase
//       .rpc('get_trashes_not_in', { excluded_ids: chunk });
//     if (error) {
//       console.error('downloadTrashes RPC error:', error);
//     }      
//     if (newTrashes?.length) {
//       await database.insertTrashes(newTrashes);
//     }
//   }
// }

async function uploadTrashes(playerId: string) {

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

    // Upsert vers Supabase
    const { error } = await supabase.from('trashes')
      .upsert(payload, { onConflict: 'id' });

    if(error) {
      console.error("syncTrashes upsert error:", error);
    } else {
      await database.markTrashesAsSynced(trashes.map(t => t.id));
    }
}