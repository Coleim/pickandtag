import { PrimaryButton } from "@/components/global/buttons";

import { BodyText } from "@/components/global/titles";
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
      {/* <Title text={"Prends une photo du déchet"} /> */}
      <BodyText text={"Prends une photo du déchet que tu as ramassé"} />
      <TrashCamera takingPhoto={takingPhoto} onPhotoTaken={handlePhotoTaken} />
      <PrimaryButton onPress={() => setTakingPhoto(true)} title={"Prendre une photo"} loadingTitle={"Patientez"} loading={takingPhoto} iconName={takingPhoto ? null : "camera"} />
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
