import { Button } from "@/shared/components/ui/buttons";
import { BodyText } from "@/shared/components/ui/titles";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TrashCamera } from "./trash-camera";

export default function TrashPhotoCapture({ onPhotoCaptured }: { onPhotoCaptured: (base64: string) => void }) {

  const [takingPhoto, setTakingPhoto] = useState(false);

  function handlePhotoTaken(base64: string) {
    setTakingPhoto(false);
    onPhotoCaptured(base64);
  }


  return (
    <View style={styles.content}>
      <BodyText text={"Prends une photo du déchet que tu as ramassé"} />
      <TrashCamera takingPhoto={takingPhoto} onPhotoTaken={handlePhotoTaken} />
      <Button onPress={() => setTakingPhoto(true)} title={"Prendre une photo"} loadingTitle={"Patientez"} loading={takingPhoto} iconName={takingPhoto ? null : "camera"} isPrimary />
    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    justifyContent: "flex-start",
  },
  cameraBox: {
    width: 320,
    height: 240,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  }
});
