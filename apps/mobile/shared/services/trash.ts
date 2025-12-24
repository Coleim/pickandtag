import { type Trash } from "@pickandtag/domain";
import { database } from "../database/db";
import { TrashCategories } from "../constants/trash-categories";
import { refreshPlayerStore } from "./player";
import { setAuthNeedSync } from "../stores/auth-store";
import { File } from 'expo-file-system';
import { supabase } from "@/lib/supabase";
import { playerStore } from "../stores/player-store";


async function updatePlayer(newExperience: number) {
    await database.addTrashToPlayer(newExperience);
    await refreshPlayerStore();
    // update player stats (global trash count per category, and best week)
    await setAuthNeedSync(true);


    // sync with server (async)
    // pushPlayerTableToServer 
    // push player global stats
    // push 'best week table'

}

export async function addTrash(trash: Trash) {
    await database.insertTrash(trash);
    const gainedXP = TrashCategories[trash.category].points;
    await updatePlayer(gainedXP);
}


export async function deleteTrash(trash: Trash) {
    await database.deleteTrashById(trash.id);
    const lostXP = TrashCategories[trash.category].points;

    
    // Delete image from storage
    if( trash.imageUrl && (trash.syncStatus === 'LOCAL') ) {
        // Delete local image
        const sourceFile = new File(trash.imageUrl);
        sourceFile.delete();
    } else if (trash.imageUrl && playerStore.state.playerId) {
        const playerId = playerStore.state.playerId;
        await removeFromCloud(trash.id, playerId);
    }

    await updatePlayer(-lostXP);
}

async function removeFromCloud(trashId: string, playerId: string) {
    console.log( "Removing trash from cloud:", trashId, playerId);
    const { error: removeImageError } = await supabase
        .storage
        .from('trash-images')
        .remove([`${playerId}/${trashId}.png`]);

    if (removeImageError) {
        console.error('Failed to delete remote image:', removeImageError);
    }
    console.log( "Deleting trash from supabase:", trashId, playerId);
    const { error } = await supabase
        .from('trashes')
        .delete()
        .eq('id', trashId)
        .eq('player_id', playerId);
    if (error) {
        console.error("Supabase delete error:", error);
    }
    console.log( "Deleted trash from supabase success");
}
