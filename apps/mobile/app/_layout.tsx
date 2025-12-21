import { AuthProvider } from "@/features/auth/components/auth-provider";
import { SyncBootstrap } from "@/features/sync/components/SyncBootstrap";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootGate from "./root-gate";

export default function RootLayout() {
  console.log("Root Layout ")
  const [ready, setReady] = useState(false);

  return (
    <AuthProvider>
      <SyncBootstrap />
      <SafeAreaProvider>
        {!ready ? (
          <RootGate onReady={() => setReady(true)} />
        ) : (
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
        )}
      </SafeAreaProvider>
    </AuthProvider>
  );
}

