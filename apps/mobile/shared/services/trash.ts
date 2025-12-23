import { type Trash } from "@pickandtag/domain";
// import { database } from "../database/db";



export async function addTrash(trash: Trash) {
  // TODO a faire ici

//   await initializeTrashStore();
//   await database.insertTrash(trash);

//   const gainedXP = TrashCategories[trash.category].points;

//   // DB first (source of truth)
//   const updatedTrashCount = await database.addTrashToPlayer(gainedXP);

//   // Then update store
//   applyTrashAdded({
//     trash,
//     gainedXP,
//     updatedTrashCount
//   });

//   1. insert DB locale
//   2. recalc stats depuis DB
//   3. update playerStore
//   4. mark trash as local (syncStatus)
}
