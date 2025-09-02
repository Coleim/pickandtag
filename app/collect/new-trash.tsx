
import { TrashCamera } from "@/components/collect/trash-camera";
import { TrashDetails } from "@/components/collect/trash-details";
import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import { addTrash } from "@/stores/trash-store";
import { Trash } from "@/types/trash";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Crypto from 'expo-crypto';
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewTrash() {
  const [takingPhoto, setTakingPhoto] = useState(false);
  const [base64Picture, setBase64Picture] = useState<string | null>(null);
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [subregion, setSubRegion] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Reverse geocode
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });


      if (reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        setSubRegion(place.subregion || null);
        setRegion(place.region || null);
        setCity(place.city || null);
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
    const newTrash: Trash = {
      id: Crypto.randomUUID(),
      category,
      latitude: !location ? '' : location?.coords.latitude.toFixed(4),
      longitude: !location ? '' : location?.coords.longitude.toFixed(4), //TODO: use only 4 digits after comma
      city: city ?? "",
      region: region ?? "",
      subregion: subregion ?? "",
      country: country ?? "",
      imageBase64: base64Picture ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSyncedAt: new Date(),
      syncStatus: 'dirty'
    };
    addTrash(newTrash);

  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="cancel" size={16} color={Colors.secondary} />
          <Text style={styles.iconText}> Cancel</Text>
        </View>
      </TouchableOpacity>
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
  }
});
