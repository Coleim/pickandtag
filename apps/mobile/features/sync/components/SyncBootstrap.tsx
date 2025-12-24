import { authStore } from "@/shared/stores/auth-store";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";
import { syncImages } from "../services/syncImages";
import { syncPlayerProfile } from "../services/syncPlayerProfile";
import { syncTrashes } from "../services/syncTrashes";
import { playerStore } from "@/shared/stores/player-store";
import { refreshPlayerStore } from "@/shared/services/player";


export function SyncBootstrap() {

  const userId = useStore(authStore, s => s.session?.user.id);
  const storeReady = useStore(playerStore, s => s.status === 'ready');
  const needSync = useStore(authStore, s => s.needSync);

  useEffect(() => {
    if (!userId || !storeReady || !needSync) return;
    async function runSync() {
      try {
        await syncPlayerProfile(userId!);
        await syncImages(userId!);
        await syncTrashes(userId!);

        await refreshPlayerStore();

      } catch (e) {
        console.warn('Sync failed', e);
      }
    }
    runSync();
  }, [userId, storeReady, needSync]);

  return null;
}
