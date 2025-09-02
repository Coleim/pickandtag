import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export function TrashCamera({ takingPhoto, onPhotoTaken }: { takingPhoto: boolean, onPhotoTaken: (uri: string) => void }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission) {
      return;
    }
    if (takingPhoto) {
      const snap = async () => {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0 });
        if (photo.base64) {
          onPhotoTaken(photo.base64);
        }
      };
      snap();
    }
  }, [takingPhoto, onPhotoTaken, permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={{ textAlign: "center" }}>Nous avons besoin de votre autorisation pour utiliser l’appareil photo.</Text>
        {/* <Button onPress={requestPermission} title="Accorder l’accès" /> */}
        <TouchableOpacity onPress={requestPermission} style={[buttonStyles.accent, { margin: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Accorder l’accès</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <CameraView
      ref={cameraRef}
      style={styles.cameraPreview}
      facing='back'
    />
  );
}

const styles = StyleSheet.create({
  cameraBox: {
    width: 320,
    height: 240,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  },
  cameraPreview: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderWidth: 4,
    borderColor: Colors.accent,
    backgroundColor: Colors.background,
  }
});
