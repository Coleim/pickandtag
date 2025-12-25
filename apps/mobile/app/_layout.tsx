import { AuthProvider } from "@/features/auth/components/auth-provider";
import { SyncBootstrap } from "@/features/sync/components/SyncBootstrap";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootGate from "./root-gate";
import { initializePlayerStore, playerStore } from "@/shared/stores/player-store";
import { setAuthNeedSync } from "@/shared/stores/auth-store";

export default function RootLayout() {
  const [gateReady, setGateReady] = useState(false);
  const [storeReady, setStoreReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      await initializePlayerStore();
      console.log('Player store is initialized:', playerStore.state.isInitialized);
      setStoreReady(playerStore.state.isInitialized);
      setAuthNeedSync(true);
    }
    bootstrap();
  }, []);

  const appReady = storeReady && gateReady;

  return (
    <AuthProvider>
      <SafeAreaProvider>
        {!appReady ? (
          <RootGate onReady={() => setGateReady(true)} />
        ) : (
          <>
            <SyncBootstrap />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="collect/new-collect"
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="auth/login"
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="profile/settings"
                options={{ presentation: "modal", headerShown: false }}
              />
            </Stack>
          </>
        )}
      </SafeAreaProvider>
    </AuthProvider>
  );
}


