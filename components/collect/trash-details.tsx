import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export function TrashDetails({ base64Picture, city, country, onAddTrash }: { base64Picture: string, city: string | null, country: string | null, onAddTrash: (category: string) => void }) {
  const [category, setCategory] = useState("Plastique");

  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.imageBox}>
        <Image
          style={detailsStyles.image}
          source={{
            uri: 'data:image/png;base64,' + base64Picture,
          }} />
      </View>
      {city && country && (
        <Text style={detailsStyles.location}>
          Ce dechet a ete rammassé a {city}, {country}
        </Text>
      )}
      <Text style={detailsStyles.question}>Quel type de déchet ?</Text>
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: 'column',
  },
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


