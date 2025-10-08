import { TrashDetails } from "@/components/collect/trash-details";
import TrashPhotoCapture from "@/components/collect/trash-photo-capture";
import { Colors } from "@/shared/constants/colors";
import { addTrash } from "@/shared/stores/player-store";
import { LocationInfo } from "@/shared/types/locationInfo";
import { Trash } from "@/shared/types/trash";
import { MaterialIcons } from "@expo/vector-icons";
import { randomUUID } from 'expo-crypto';
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewCollectScreen() {
  const router = useRouter();

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({ latitude: '', longitude: '', city: '', region: '', subregion: '', country: '' });
  const [base64Picture, setBase64Picture] = useState<string>('');

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // REVIEW: Surface a user-visible message/toast when permission is denied.
        return;
      }
      let currentLocation = await Location.getLastKnownPositionAsync({});

      if (currentLocation) {
        setLocationInfo(prev => ({ ...prev, latitude: currentLocation.coords.latitude.toFixed(4), longitude: currentLocation.coords.longitude.toFixed(4) }));
        // Reverse geocode
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        if (reverseGeocode.length > 0) {
          const place = reverseGeocode[0];
          setLocationInfo(prev => ({
            ...prev,
            subregion: place.subregion ?? '',
            region: place.region ?? '',
            city: place.city ?? '',
            country: place.country || ''
          }));
        }
      }
    }
    getCurrentLocation();
  }, []);

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
    addTrash(createTrash(category)).then(() => {
      if (addAnother) {
        router.replace('/collect/new-trash');
      } else {
        router.back();
      }
    })
      .catch((err) => {
        // REVIEW: Consider error handling and user feedback (Toast/Alert) on DB failure.
      });
  }

  function getHeaderTitle() {
    if (!base64Picture) return "Ajouter un déchet";
    return "Détails du déchet";
  }


  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
        </View>
        {base64Picture ?
          <TrashDetails base64Picture={base64Picture} city={locationInfo.city} country={locationInfo.country} onAddTrash={handleTrashAdded} /> :
          <TrashPhotoCapture onPhotoCaptured={(base64: string) => setBase64Picture(base64)} />
        }
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 24,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
  backButton: {
    width: 40, // fixed size so the title can truly center
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    left: 10,
    top: 24
  },
  headerTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: 'column',
    // padding: 24
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
