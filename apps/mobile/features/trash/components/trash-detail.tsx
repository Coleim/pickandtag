import { Button } from '@/shared/components/ui/buttons';
import { CategoryPill } from '@/shared/components/ui/category-pill';
import { buttonStyles } from '@/shared/constants/button-styles';
import { TrashCategories } from '@/shared/constants/trash-categories';
import { CategoryConfigDetails } from '@/types/categoryConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, type Trash } from '@pickandtag/domain';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TrashDetailProps = {
  trash: Trash;
  onDelete: (trash: Trash) => void;
  onBack: () => void;
};

export default function TrashDetail({ trash, onDelete, onBack }: TrashDetailProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [reverseGeoCode, setReverseGeoCode] = useState<Location.LocationGeocodedAddress | null>(null);
  const trashCategoryDetails: CategoryConfigDetails = TrashCategories[trash.category];

  const handleDelete = () => {
    Alert.alert(
      'Supprimer le déchet',
      'Es-tu sûr de vouloir supprimer ce déchet ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            onDelete(trash);
          },
        },
      ]
    );
  };

  useEffect(() => {
    async function getLocationDetails() {
      const reverseGeocodes = await Location.reverseGeocodeAsync({
        latitude: Number(trash.latitude),
        longitude: Number(trash.longitude),
      });
      setReverseGeoCode(reverseGeocodes[0]);
    }
    getLocationDetails();
  }, [trash]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={buttonStyles.linkButton} onPress={handleDelete}>
        <FontAwesome5 name="trash" size={16} color={Colors.error} style={{ marginRight: 6 }} />
        <Text style={buttonStyles.linkButtonTextDanger}>Supprimer le déchet</Text>
      </TouchableOpacity>

      {trash.imageUrl ? (
        <View style={styles.imageContainer}>
          { imageLoading && (
            <ActivityIndicator />
          )}
          <Image
            style={styles.image}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            source={{ uri: trash.imageUrl! }}
          />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Text style={styles.noImageText}>Aucune image disponible</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.inlineSection}>
          <Text>Catégorie</Text>
          <CategoryPill isSelected={false} value={trashCategoryDetails} />
          <Text style={styles.xpText}>+{trashCategoryDetails.points}xp</Text>
        </View>

        <View style={styles.inlineSection}>
          <Text style={styles.dateText}>Le {formatDate(trash.createdAt)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Lieu de collecte</Text>
          <Text style={styles.cityText}>{reverseGeoCode?.formattedAddress}</Text>
        </View>
      </View>

      <View style={{ marginTop: 'auto', marginBottom: 10 }}>
        <Button onPress={onBack} title="Fermer" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  noImageText: {
    color: '#6B7280',
    marginTop: 8,
  },
  content: {
    marginTop: 15,
    paddingVertical: 5,
  },
  section: {
    marginBottom: 14,
  },
  inlineSection: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
  },
  cityText: {
    color: '#111827',
    fontWeight: '500',
    fontSize: 16,
  },
  dateText: {
    color: '#111827',
  },
  xpText: {
    marginLeft: 'auto',
    fontWeight: '600',
    color: Colors.accent,
  }
});

