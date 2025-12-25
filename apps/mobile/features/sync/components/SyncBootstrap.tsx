import { authStore, setAuthNeedSync } from "@/shared/stores/auth-store";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";
import { syncImages } from "../services/syncImages";
import { syncPlayerProfile } from "../services/syncPlayerProfile";
import { syncTrashes } from "../services/syncTrashes";
import { playerStore } from "@/shared/stores/player-store";
import { refreshPlayerStore } from "@/shared/services/player";
import { syncPlayerStats } from "../services/syncPlayerStats";


export function SyncBootstrap() {

  const userId = useStore(authStore, s => s.session?.user.id);
  const storeReady = useStore(playerStore, s => s.isInitialized);
  const needSync = useStore(authStore, s => s.needSync);

  useEffect(() => {
    console.log('SyncBootstrap effect triggered. userId:', userId, 'storeReady:', storeReady, 'needSync:', needSync);
    if (!userId || !storeReady || !needSync) return;
    async function runSync() {
      try {
        console.log('Starting sync process...');
        console.log('[syncPlayerProfile]');
        await syncPlayerProfile(userId!);
        console.log('[syncPlayerStats]');
        await syncPlayerStats(userId!);
        console.log('[syncImages]');
        await syncImages(userId!);
        console.log('[syncTrashes]');
        await syncTrashes(userId!);

        await refreshPlayerStore();

      } catch (e) {
        console.warn('Sync failed', e);
      } finally {
        console.log('Sync process completed.');
        await setAuthNeedSync(false);
      }
    }
    runSync();
  }, [userId, storeReady, needSync]);

  return null;
}
