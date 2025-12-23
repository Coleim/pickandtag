import { type Trash } from "@pickandtag/domain";
import { database } from "../database/db";
import { TrashCategories } from "../constants/trash-categories";
import { applyTrashAdded } from "../stores/player-store";



export async function addTrash(trash: Trash) {

    // await initializeTrashStore();
    await database.insertTrash(trash);
    const gainedXP = TrashCategories[trash.category].points;
    await database.addTrashToPlayer(gainedXP);

    //TODO: update trash count stats + insert db 
    await applyTrashAdded(trash, gainedXP);

    // mark stats dirty
    // trashStatsStore.setState({ dirty: true });

    // async recompute
    // refreshTrashStatsIfNeeded();


    // sync with server
    // pushPlayerStatsToServer 
    // push Stats 
    // async push trashes 

}
