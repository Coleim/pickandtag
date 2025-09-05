import { Trash } from '@/types/trash';
import { Store } from '@tanstack/react-store';
import { getTrashes, insertTrash } from './db';

export const trashStore = new Store<Trash[]>([]);


async function initializeTrashStore() {
  const trashes = (await getTrashes()).map((trash: any) => ({
    ...trash,
    createdAt: new Date(trash.createdAt)
  }))
  trashStore.setState(trashes);
}

initializeTrashStore();


export async function addTrash(trash: Trash) {
  await insertTrash(trash);
  trashStore.setState([...trashStore.state, trash]);
}


