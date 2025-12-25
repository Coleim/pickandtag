import { type Trash } from "@pickandtag/domain";
import { database } from "../database/db";
import { TrashCategories } from "../constants/trash-categories";
import { refreshPlayerStore } from "./player";
import { authStore, setAuthNeedSync } from "../stores/auth-store";
import { File } from 'expo-file-system';
import { supabase } from "@/lib/supabase";


async function updatePlayer(newExperience: number) {
    await database.addExperienceToPlayer(newExperience);
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
    await database.updateTrashStats(trash.category);
    const gainedXP = TrashCategories[trash.category].points;
    await updatePlayer(gainedXP);
}


export async function deleteTrash(trash: Trash) {
    await database.deleteTrashById(trash.id);
    // TODO: MARK THE TRASH AS "TO DELETE" INSTEAD OF DELETING IT RIGHT AWAY
    const lostXP = TrashCategories[trash.category].points;
    await database.decrementTrashStats(trash.category);

    // Delete image from storage
    if( trash.imageUrl && (trash.syncStatus === 'LOCAL') ) {
        // Delete local image
        const sourceFile = new File(trash.imageUrl);
        sourceFile.delete();
    } else if (trash.imageUrl && authStore.state.session?.user.id ) {
        const userId = authStore.state.session?.user.id;
        await removeFromCloud(trash.id, userId);
    }

    await updatePlayer(-lostXP);
}

async function removeFromCloud(trashId: string, userId: string) {
    console.log( "Removing trash from cloud:", trashId, userId);
    const { error: removeImageError } = await supabase
        .storage
        .from('trash-images')
        .remove([`${userId}/${trashId}.png`]);

    if (removeImageError) {
        console.error('Failed to delete remote image:', removeImageError);
    }
    console.log( "Deleting trash from supabase:", trashId, userId);
    const { error } = await supabase
        .from('trashes')
        .delete()
        .eq('id', trashId)
        .eq('player_id', userId);
    if (error) {
        console.error("Supabase delete error:", error);
    }
    console.log( "Deleted trash from supabase success");
}
