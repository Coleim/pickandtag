import { authStore } from "@/shared/stores/auth-store";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";
import { syncImages } from "../services/syncImages";
import { syncPlayerProfile } from "../services/syncPlayerProfile";
import { syncTrashes } from "../services/syncTrashes";
import { playerStore } from "@/shared/stores/player-store";


export function SyncBootstrap() {

  const userId = useStore(authStore, s => s.session?.user.id);
  const user = useStore(authStore, s => s.session?.user);
  const storeReady = useStore(playerStore, s => s.isInit);

  useEffect(() => {
    if (!userId || !user || !storeReady) return;
    async function runSync() {
      try {
        await syncPlayerProfile(user!);
        await syncImages(userId!);
        await syncTrashes(userId!);
      } catch (e) {
        console.warn('Sync failed', e);
      }
    }
    runSync();
  }, [userId, user, storeReady]);

  return null;
}
