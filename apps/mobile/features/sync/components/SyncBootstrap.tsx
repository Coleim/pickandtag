import { authStore } from "@/shared/stores/auth-store";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";
import { syncImages } from "../services/syncImages";
import { syncPlayerProfile } from "../services/syncPlayerProfile";


export function SyncBootstrap() {

  const userId = useStore(authStore, s => s.session?.user.id);
  const user = useStore(authStore, s => s.session?.user);

  useEffect(() => {
    if (!userId || !user) return;

    let cancelled = false;
    async function runSync() {
      try {
        await syncPlayerProfile(user!);
        await syncImages(userId!);
      } catch (e) {
        console.warn('Sync failed', e);
      }
    }
    runSync();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return null;
}
