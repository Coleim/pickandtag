import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type WelcomeScreenProps = {
  onReady: () => void;
};

export default function PermissionsScreen({ onReady }: WelcomeScreenProps) {
  const router = useRouter();
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
          <TouchableOpacity
            style={[styles.permissionButton, cameraGranted && { backgroundColor: "#2E7D32" }]}
            onPress={requestCamera}
          >
            <Text style={styles.permissionButtonText}>
              {cameraGranted ? "Autorisé ✅" : "Autoriser"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.permissionItem}>
          <Text style={styles.permissionText}>
            📍 Accès à la localisation (cartographier ton impact)
          </Text>
          <TouchableOpacity
            style={[styles.permissionButton, locationGranted && { backgroundColor: "#2E7D32" }]}
            onPress={requestLocation}
          >
            <Text style={styles.permissionButtonText}>
              {locationGranted ? "Autorisé ✅" : "Autoriser"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {allGranted && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            onReady()
          }}
        >
          <Ionicons name="add" size={28} color="white" />
          <Text style={styles.fabText}>Démarrer</Text>
        </TouchableOpacity>
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
  fab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "#2E7D32",
    paddingHorizontal: 20,
    height: 64,
    borderRadius: 32,
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  fabText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

