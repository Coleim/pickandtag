import { Button } from "@/components/global/buttons";
import { Colors } from "@/constants/Colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function TrashCamera({
  takingPhoto,
  onPhotoTaken,
}: {
  takingPhoto: boolean;
  onPhotoTaken: (uri: string) => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!permission) return;
    if (takingPhoto) {
      const snap = async () => {
        if (!cameraRef.current) return;

        setLoading(true);
        try {
          const photo = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: 0.5,
            skipProcessing: true,
          });
          if (photo.base64) {
            onPhotoTaken(photo.base64);
          }
        } finally {
          // petit délai pour éviter clignotement trop brutal
          setTimeout(() => setLoading(false), 500);
        }
      };
      snap();
    }
  }, [takingPhoto, onPhotoTaken, permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={{ textAlign: "center" }}>
          Nous avons besoin de votre autorisation pour utiliser l’appareil photo.
        </Text>
        <Button onPress={requestPermission} title="Accorder l’accès" />
      </View>
    );
  }

  return (
    <View style={styles.cameraBox}>
      <CameraView ref={cameraRef} style={styles.cameraPreview} facing="back" />

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={styles.loadingText}>Prise de photo...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraBox: {
    width: 320,
    height: 240,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  cameraPreview: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 12,
    borderWidth: 4,
    borderColor: Colors.accent,
    backgroundColor: Colors.background,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.disabled,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "white",
    fontWeight: "bold",
  },
});

