import { Stack } from "expo-router";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootGate from "./root-gate";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  return (
    <SafeAreaProvider>
      {!ready ? (
        <RootGate onReady={() => setReady(true)} />
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="collect/new-trash"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      )}
    </SafeAreaProvider>
  );
}

