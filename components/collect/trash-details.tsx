import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NoteText, SubTitle } from "../global/titles";


export function TrashDetails({ base64Picture, city, country, onAddTrash }: { base64Picture: string, city: string | null, country: string | null, onAddTrash: (category: string, addAnother: boolean) => void }) {
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
      {city && country &&
        <NoteText text={`Ce déchet a été ramassé à ${city}, ${country}`} />
      }
      <SubTitle text={"Quel type de déchet ?"} />
      <View style={detailsStyles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={detailsStyles.picker}
          itemStyle={detailsStyles.pickerItem}
          dropdownIconColor={Colors.text}
        >
          <Picker.Item style={{ color: 'red' }} label="Plastique" value="Plastique" />
          <Picker.Item label="Métal" value="Métal" />
          <Picker.Item label="Verre" value="Verre" />
          <Picker.Item label="Papier" value="Papier" />
          <Picker.Item label="Autre" value="Autre" />
        </Picker>
      </View>
      {/* Submit Button */}
      <TouchableOpacity onPress={() => onAddTrash(category, false)} style={[buttonStyles.primary, detailsStyles.submitButton]}>
        <Text style={buttonStyles.primaryText}>Collecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onAddTrash(category, true)} style={[buttonStyles.secondary, detailsStyles.submitButton]}>
        <Text style={buttonStyles.primaryText}>Collecter et Ajouter un autre</Text>
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
  pickerWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 'auto',
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
    marginBottom: 12,
  },
});


