import { Trash } from '@/types/trash';
import { Store } from '@tanstack/react-store';
import { getTrashes, insertTrash } from './db';

type TrashState = {
  isInit: boolean;
  items: Trash[];
};

export const trashStore = new Store<TrashState>({
  isInit: false,
  items: [],
});

let initPromise: Promise<void> | null = null;

export function initializeTrashStore() {
  if (!initPromise) {
    initPromise = (async () => {
      const trashes = (await getTrashes()).map((trash: any) => ({
        ...trash,
        createdAt: new Date(trash.createdAt), // here we just convert from db timestamp to a real date
      }));
      trashStore.setState({
        isInit: true,
        items: trashes,
      });
    })();
  }
  return initPromise;
}


initializeTrashStore();

export async function addTrash(trash: Trash) {
  // on attend que le store soit bien init
  await initializeTrashStore();
  await insertTrash(trash);
  trashStore.setState({
    ...trashStore.state,
    items: [...trashStore.state.items, trash],
  });
}



