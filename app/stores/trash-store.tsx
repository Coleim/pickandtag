import { Store } from '@tanstack/react-store';


export type Trash = {
  id: number;
  category: string;
  location: string;
  city: string;
  country: string;
  imageBase64: string;
}


export const trashStore = new Store<Trash[]>([]);


export const updateTrashStore = (trash: Trash) => {
  trashStore.setState((state) => {
    return [...state, trash]
  })
}


