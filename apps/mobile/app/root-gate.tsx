import { Camera } from "expo-camera";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import PermissionsScreen from "./permissions-screen";

import { SafeAreaView } from "react-native-safe-area-context";


export default function RootGate({ onReady }: { onReady: () => void }) {

  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  const checkPermissions = async () => {
    const cam = await Camera.getCameraPermissionsAsync();
    const loc = await Location.getForegroundPermissionsAsync();
    return cam.status === "granted" && loc.status === "granted";
  };

  useEffect(() => {
    const init = async () => {
      const perms = await checkPermissions();
      if (!perms) {
        setShowWelcome(true);
      } else {
        onReady();
      }
      setLoading(false);
    };
    init();
  }, [onReady]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (showWelcome) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
        < PermissionsScreen onReady={onReady} />
      </SafeAreaView>
    );
  }

  return null;
}
