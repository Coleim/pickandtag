import { Camera } from "expo-camera";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import PermissionsScreen from "./permissions-screen";

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
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (showWelcome) {
    return (
      <PermissionsScreen onReady={onReady} />
    );
  }

  return null;
}
