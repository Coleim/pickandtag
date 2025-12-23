import { addTrash } from "@/shared/stores/player-store";
import { LocationInfo } from "@/types/locationInfo";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, type Trash } from "@pickandtag/domain";
import { randomUUID } from 'expo-crypto';
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrashEntry } from "../components/trash-entry";
import TrashPhotoCapture from "../components/trash-photo-capture";

export function NewCollectScreen() {
  const router = useRouter();

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({ latitude: '', longitude: '', city: '', region: '', subregion: '', country: '' });
  const [urlPicture, setUrlPicture] = useState<string>('');
  const [locationError, setLocationError] = useState<boolean>(false);


  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let currentLocation: Location.LocationObject | null = null;

      try {
        // Try to get current position with 2 second timeout
        currentLocation = await Promise.race([
          Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          }),
          new Promise<Location.LocationObject>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 2000)
          )
        ]);
      } catch (error) {
        console.error('Failed to get current position, falling back to last known:', error);
        setLocationError(true);
        // Fallback to last known position
        try {
          currentLocation = await Location.getLastKnownPositionAsync({});
        } catch (fallbackError) {
          console.error('No location available:', fallbackError);
          setLocationError(true);
          return;
        }
      }

      if (currentLocation) {
        setLocationError(false);
        setLocationInfo(prev => ({
          ...prev,
          latitude: currentLocation.coords.latitude.toFixed(4),
          longitude: currentLocation.coords.longitude.toFixed(4)
        }));

        // Reverse geocode
        try {
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
        } catch (geocodeError) {
          console.error('Reverse geocoding failed:', geocodeError);
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
      imageUrl: urlPicture,
      createdAt: new Date(),
      updatedAt: new Date(),
      syncStatus: 'LOCAL'
    };
  };

  function handleTrashAdded(category: string, addAnother: boolean) {
    addTrash(createTrash(category)).then(() => {
      if (addAnother) {
        router.replace('/collect/new-collect');
      } else {
        router.back();
      }
    })
      .catch((err) => {
        // REVIEW: Consider error handling and user feedback (Toast/Alert) on DB failure.
      });
  }

  function getHeaderTitle() {
    if (!urlPicture) return "Ajouter un déchet";
    return "Détails du déchet";
  }


  const handlePhotoCaptured = useCallback((imageUrl: string) => {
    setUrlPicture(imageUrl);
  }, []);



  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
        </View>
        {locationError && (
          <Text style={{ color: 'red', padding: 10, textAlign: 'center' }}>
            Unable to get location. Please enable location services.
          </Text>
        )}
        {urlPicture ?
          <TrashEntry urlPicture={urlPicture} city={locationInfo.city} country={locationInfo.country} onAddTrash={handleTrashAdded} /> :
          <TrashPhotoCapture onPhotoCaptured={handlePhotoCaptured} />
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
