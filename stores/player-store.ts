import { TrashCategories } from '@/constants/TrashCategories';
import { Trash } from '@/types/trash';
import { Store } from '@tanstack/react-store';
import { addTrashToPlayer, getPlayer, getTrashes, insertTrash } from './db';

type PlayerState = {
  isInit: boolean;
  trashes: Trash[];
  xp: number;
  level: number;
};

export const playerStore = new Store<PlayerState>({
  isInit: false,
  trashes: [],
  xp: 0,
  level: 1
});

let initPromise: Promise<void> | null = null;

export function initializeTrashStore() {
  if (!initPromise) {
    initPromise = (async () => {
      const [trashes, player] = await Promise.all([
        getTrashes(),
        getPlayer()
      ]);

      playerStore.setState({
        isInit: true,
        trashes: trashes.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt), // here we just convert from db timestamp to a real date
        })),
        xp: player?.xp ?? 0,
        level: calculatePlayerLevel(player?.xp ?? 0)
      });

    })();
  }
  return initPromise;
}


initializeTrashStore();

export async function addTrash(trash: Trash) {
  await initializeTrashStore();
  await insertTrash(trash);

  const gainedXP = TrashCategories[trash.category].points;
  console.log("Adding trash for ", gainedXP, " XP")
  await addTrashToPlayer(gainedXP);

  playerStore.setState((prev) => {
    const newXP = prev.xp + gainedXP;
    return {
      ...prev,
      trashes: [...playerStore.state.trashes, trash],
      xp: newXP,
      level: calculatePlayerLevel(newXP),
    };
  });
}


//TODO: Better and maybe move to a utils file
function calculatePlayerLevel(xp: number): number {
  return Math.floor(Math.log2(xp / 100 + 1)) + 1;
}
