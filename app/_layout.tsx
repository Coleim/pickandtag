import { Stack } from "expo-router";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootGate from "./root-gate";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  // REVIEW: Consider driving this readiness from a central app-init (e.g., splash, permissions, db) to avoid local state drift.
  // REVIEW: If you use expo-splash-screen, call preventAutoHideAsync/hideAsync to avoid a white flicker before tabs render.

  return (
    <SafeAreaProvider>
      {!ready ? (
        <RootGate onReady={() => setReady(true)} />
        /* REVIEW: Extract an AppInitGate that also waits for store/DB initialization and hides splash. */
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="collect/new-collect"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      )}
    </SafeAreaProvider>
  );
}

