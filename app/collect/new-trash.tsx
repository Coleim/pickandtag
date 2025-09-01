
import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { updateTrashStore } from "../stores/trash-store";


export default function NewTrash() {
  const [takingPhoto, setTakingPhoto] = useState(false);
  const [base64Picture, setBase64Picture] = useState<string | null>(null);
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // const [region, setRegion] = useState<Region|null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // setRegion({
      //     latitude: currentLocation.coords.latitude,
      //     longitude: currentLocation.coords.longitude,
      //     latitudeDelta: 0.05, // zoom levels
      //     longitudeDelta: 0.05,
      // });


      // Reverse geocode
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        setCity(place.city || place.subregion || null);
        setCountry(place.country || null);
      }
    }

    getCurrentLocation();
  }, []);


  const handlePhotoTaken = useCallback((base64: string) => {
    setBase64Picture(base64);
    setTakingPhoto(false);
  }, []);

  const handleTrashAdded = useCallback((category: string) => {
    // add to store
    // generate id
    updateTrashStore({
      id: 123,
      category,
      location: JSON.stringify(location),
      city: city ?? "",
      country: country ?? "",
      imageBase64: base64Picture ?? ""
    })
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="cancel" size={16} color={Colors.secondary} />
          <Text style={styles.iconText}> Cancel</Text>
        </View>
      </TouchableOpacity>
      {/* location={location}  */}
      {base64Picture ? <TrashDetails base64Picture={base64Picture} city={city} country={country} onAddTrash={handleTrashAdded} /> :
        <View style={styles.content}>
          <Text style={styles.title}>
            Take a photo{"\n"}of the trash
          </Text>
          <Text style={styles.subtitle}>
            Snap a picture of the trash you collected
          </Text>
          <View style={styles.cameraBox}>
            <TrashCamera takingPhoto={takingPhoto} onPhotoTaken={handlePhotoTaken} />
          </View>
          <TouchableOpacity disabled={takingPhoto} onPress={() => setTakingPhoto(true)} style={buttonStyles.primary}>
            <Text style={buttonStyles.primaryText}>{takingPhoto ? "Please wait" : "Take Photo"}</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

function TrashDetails({ base64Picture, city, country, onAddTrash }: { base64Picture: string, city: string | null, country: string | null, onAddTrash: (category: string) => void }) {
  const [category, setCategory] = useState("Plastique");

  return (
    <View style={styles.container}>
      <View style={detailsStyles.imageBox}>
        <Image
          style={detailsStyles.image}
          source={{
            uri: 'data:image/png;base64,' + base64Picture,
          }} />
      </View>
      {/* {region2 && (
                <MapView style={detailsStyles.map} region={region2} >
                    <Marker coordinate={region2} title="You are here" />
                </MapView>
            )} */}
      {city && country && (
        <Text style={detailsStyles.location}>
          Ce dechet a ete rammassé a {city}, {country}
        </Text>
      )}
      {/* Title */}
      <Text style={detailsStyles.question}>Quel type de déchet ?</Text>
      {/* Dropdown */}
      <View style={detailsStyles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={detailsStyles.picker}
          itemStyle={detailsStyles.pickerItem}
          dropdownIconColor={Colors.text}
        >
          <Picker.Item label="Plastique" value="Plastique" />
          <Picker.Item label="Métal" value="Métal" />
          <Picker.Item label="Verre" value="Verre" />
          <Picker.Item label="Papier" value="Papier" />
          <Picker.Item label="Autre" value="Autre" />
        </Picker>
      </View>
      {/* Submit Button */}
      <TouchableOpacity onPress={() => onAddTrash(category)} style={[buttonStyles.primary, detailsStyles.submitButton]}>
        <Text style={buttonStyles.primaryText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const detailsStyles = StyleSheet.create({
  map: {
    width: 300, // small map
    height: 300, // small height
    marginTop: 20,
    borderRadius: 10,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  backButtonText: {
    color: Colors.background,
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: Colors.background,
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 44, // to balance the back arrow
  },
  image: {
    width: 180,
    height: 180,
  },
  imageBox: {
    width: 180,
    height: 180,
    borderRadius: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 32,
    // marginBottom: 24,
  },
  location: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  question: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  pickerWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 32,
    shadowColor: Colors.text,
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  picker: {
    width: '100%',
    height: 56,
    color: Colors.text,
  },
  pickerItem: {
    fontSize: 20,
    color: Colors.text,
  },
  submitButton: {
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 32,
  },
});


function TrashCamera({ takingPhoto, onPhotoTaken }: { takingPhoto: boolean, onPhotoTaken: (uri: string) => void }) {
  const [permission, requestPermission] = useCameraPermissions(); // todo: pass as prop
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
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 38
  },
  subtitle: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    color: Colors.text,
    marginBottom: 40
  },
  icon: {
    padding: 5,
    display: "flex"
  },
  iconText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2 // hack to align icon and text
  },
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
