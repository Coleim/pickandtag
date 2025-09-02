
import { TrashDetails } from "@/components/collect/trash-details";
import TrashPhotoCapture from "@/components/collect/trash-photo-capture";
import { Colors } from "@/constants/Colors";
import { addTrash } from "@/stores/trash-store";
import { LocationInfo } from "@/types/locationInfo";
import { Trash } from "@/types/trash";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import * as Crypto from 'expo-crypto';
import { randomUUID } from 'expo-crypto';
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewTrash() {
  const [base64Picture, setBase64Picture] = useState<string>('');
  const router = useRouter();

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({ latitude: '', longitude: '', city: '', region: '', subregion: '', country: '' });

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      if (currentLocation) {

        setLocationInfo({ ...locationInfo, latitude: currentLocation.coords.latitude.toFixed(4), longitude: currentLocation.coords.longitude.toFixed(4) });

        // Reverse geocode
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });


        if (reverseGeocode.length > 0) {
          const place = reverseGeocode[0];
          setLocationInfo({
            ...locationInfo,
            subregion: place.subregion ?? '',
            region: place.region ?? '',
            city: place.city ?? '',
            country: place.country || ''
          });
        }
      }
    }

    getCurrentLocation();
  }, [locationInfo]);

  function createTrash(category: string): Trash {
    return {
      id: randomUUID(),
      category,
      latitude: locationInfo.latitude,
      longitude: locationInfo.longitude,
      city: locationInfo.city,
      region: locationInfo.region,
      subregion: locationInfo.subregion,
      country: locationInfo.country,
      imageBase64: base64Picture,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSyncedAt: new Date(),
      syncStatus: 'dirty'
    };
  };

  function handleTrashAdded(category: string, addAnother: boolean) {
    // add to store
    addTrash(createTrash(category)).then(() => {
      if (addAnother) {
        router.replace('/collect/new-trash');
      } else {
        router.replace("/(tabs)/home");
      }
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="cancel" size={16} color={Colors.secondary} />
          <Text style={styles.iconText}> Annuler</Text>
        </View>
      </TouchableOpacity>
      {base64Picture ?
        <TrashDetails base64Picture={base64Picture} city={locationInfo.city} country={locationInfo.country} onAddTrash={handleTrashAdded} /> :
        <TrashPhotoCapture onPhotoCaptured={(base64: string) => setBase64Picture(base64)} />
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: 'column',
    padding: 24
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
