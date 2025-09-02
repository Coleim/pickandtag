import { Trash } from '@/types/trash';
import { Store } from '@tanstack/react-store';
import { getTrashes, insertTrash } from './db';

export const trashStore = new Store<Trash[]>([]);


async function initializeTrashStore() {
  const trashes = await getTrashes();
  // console.log('trashed: ', trashes)
  trashStore.setState(trashes);
}

initializeTrashStore();


export async function addTrash(trash: Trash) {
  await insertTrash(trash);
  trashStore.setState([...trashStore.state, trash]);
}


