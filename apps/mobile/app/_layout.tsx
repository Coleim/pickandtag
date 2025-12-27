import { AuthProvider } from "@/features/auth/components/auth-provider";
import { SyncBootstrap } from "@/features/sync/components/SyncBootstrap";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootGate from "./root-gate";
import { initializePlayerStore, playerStore } from "@/shared/stores/player-store";
import { setAuthNeedSync } from "@/shared/stores/auth-store";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://d58008184265fae3dfbcb6ae80d38fda@o4510606017232896.ingest.de.sentry.io/4510606140375120",
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
  // Enable logs to be sent to Sentry
  // Learn more at https://docs.sentry.io/platforms/react-native/logs/
  enableLogs: true,
});


function RootLayout() {
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


export default Sentry.wrap(RootLayout);