import { Button, Fab } from "@/shared/components/ui/buttons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type WelcomeScreenProps = {
  onReady: () => void;
};

export default function PermissionsScreen({ onReady }: WelcomeScreenProps) {
  const [cameraGranted, setCameraGranted] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

  const requestCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraGranted(status === "granted");
  };

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationGranted(status === "granted");
  };

  const allGranted = cameraGranted && locationGranted;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Pick & Tag 🌱</Text>

      <Image source={require("@/assets/images/garbo.png")} style={styles.image} />

      <Text style={styles.subtitle}>
        Avant de commencer, nous avons besoin de quelques autorisations :
      </Text>

      <View style={styles.permissionsBox}>
        <View style={styles.permissionItem}>
          <Text style={styles.permissionText}>
            📷 Utilisation de l’appareil photo (scanner tes déchets)
          </Text>
          <Button title={cameraGranted ? "Autorisé ✅" : "Autoriser"} onPress={requestCamera} isPrimary={cameraGranted} />
        </View>

        <View style={styles.permissionItem}>
          <Text style={styles.permissionText}>
            📍 Accès à la localisation (cartographier ton impact)
          </Text>
          <Button title={locationGranted ? "Autorisé ✅" : "Autoriser"} onPress={requestLocation} isPrimary={locationGranted} />
        </View>
      </View>

      {allGranted && (
        <Fab onPress={onReady} title="Demarrer" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start", padding: 24, backgroundColor: "#f5f5f5" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 20 },
  image: { width: "100%", height: 200, resizeMode: "contain", borderRadius: 12, marginBottom: 20 },
  permissionsBox: { width: "100%", marginVertical: 20 },
  permissionItem: { marginBottom: 26 },
  permissionText: { fontSize: 15, marginBottom: 8 },
  permissionButton: { backgroundColor: "#1976D2", paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  permissionButtonText: { color: "white", fontWeight: "bold" },
});

