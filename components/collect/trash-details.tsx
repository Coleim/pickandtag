import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "../global/buttons";
import { NoteText, SubTitle } from "../global/titles";
import { CategoryPicker } from "./category-picker";


export function TrashDetails({ base64Picture, city, country, onAddTrash }: { base64Picture: string, city: string | null, country: string | null, onAddTrash: (category: string, addAnother: boolean) => void }) {
  const [category, setCategory] = useState<string | undefined>();

  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.imageBox}>
        <Image
          style={detailsStyles.image}
          source={{
            uri: 'data:image/png;base64,' + base64Picture,
          }} />
        {/* REVIEW: Base64 images can be heavy; consider caching/thumbnail or using ImageManipulator to resize. */}
      </View>
      {city && country &&
        <NoteText text={`Ce déchet a été ramassé à ${city}, ${country}`} />
      }
      <SubTitle text={"Quel type de déchet ?"} />
      <CategoryPicker selected={category} onChange={setCategory} />
      <View style={{ marginTop: 24, gap: 10 }}>
        <Button disabled={!category} onPress={() => onAddTrash(category!, false)} title="Collecter" isPrimary />
        <Button disabled={!category} onPress={() => onAddTrash(category!, true)} title="Collecter et Ajouter un autre" />
      </View>

    </View>
  );
}

const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: 'column',
    paddingTop: 20,
    paddingHorizontal: 24,
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
  }
});


