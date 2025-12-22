import { Button } from "@/shared/components/ui/buttons";
import { Colors } from "@pickandtag/domain";
import { CameraView, useCameraPermissions } from "expo-camera";
import { File, Paths } from 'expo-file-system';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
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
            quality: 0.8,
            skipProcessing: true,
          });
          const savedImagePath = await processAndSaveImage(photo.uri);
          if (savedImagePath) {
            onPhotoTaken(savedImagePath);
          }
        } catch (error) {
          console.error('Failed to capture image:', error);
        } finally {
          // petit délai pour éviter clignotement trop brutal
          setTimeout(() => setLoading(false), 500);
        }
      };
      snap();
    }
  }, [takingPhoto, onPhotoTaken, permission]);

  async function processAndSaveImage(photoUri: string): Promise<string | null> {

    try {
      // Use the same API as your migration code
      const context = ImageManipulator.manipulate(photoUri);
      context.resize({ width: 800 });
      const image = await context.renderAsync();
      const result = await image.saveAsync({
        format: SaveFormat.PNG,
        compress: 0.5
      });

      // Generate unique filename
      const filename = `trash_image_${Date.now()}.png`;

      // Copy to cache directory
      const sourceFile = new File(result.uri);
      const destinationFile = new File(Paths.document, filename);
      sourceFile.copy(destinationFile);
      return destinationFile.uri;
    } catch (error) {
      console.error('Error processing image:', error);
      return null;
    }
  }

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
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "white",
    fontWeight: "bold",
  },
});

