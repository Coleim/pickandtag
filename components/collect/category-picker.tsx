
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

type Category = {
  label: string;
  value: string;
  color: string;
  icon: string;
};

// Palette FR + Polystyrène ajouté
const categories: Category[] = [
  { label: "Plastique", value: "Plastique", color: "#FFD600", icon: "recycle" },
  { label: "Polystyrène", value: "Polystyrene", color: "#FF9800", icon: "boxes" },
  { label: "Papier", value: "Papier", color: "#1565C0", icon: "file-alt" },
  { label: "Verre", value: "Verre", color: "#66BB6A", icon: "wine-bottle" },
  { label: "Métal", value: "Métal", color: "#B71C1C", icon: "tools" },
  { label: "Autre", value: "Autre", color: "#795548", icon: "trash" },
];


export function CategoryPicker({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  const scaleAnim = useRef<{ [key: string]: Animated.Value }>({}).current;

  // Initialiser les Animated values pour chaque catégorie
  categories.forEach(cat => {
    if (!scaleAnim[cat.value]) scaleAnim[cat.value] = new Animated.Value(1);
  });

  const handlePress = (value: string) => {
    // Animation de press
    Animated.sequence([
      Animated.timing(scaleAnim[value], { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim[value], { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onChange(value);
  };

  return (
    <View style={styles.wrapper}>
      {categories.map((cat) => {
        const isSelected = selected === cat.value;
        return (
          <TouchableWithoutFeedback key={cat.value} onPress={() => handlePress(cat.value)}>
            <Animated.View
              style={[
                styles.pill,
                {
                  backgroundColor: isSelected ? cat.color : Colors.white,
                  borderColor: isSelected ? cat.color : "#ccc",
                  transform: [{ scale: scaleAnim[cat.value] }],
                },
              ]}
            >

              <FontAwesome5 name={cat.icon as any} size={20}
                color={isSelected ? "#fff" : cat.color}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.pillText,
                  { color: isSelected ? "#fff" : cat.color },
                ]}
              >
                {cat.label}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: screenWidth * 0.9,
    alignSelf: "center",
    gap: 12,
    marginVertical: 16,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10, // ajusté pour tenir sur 2 lignes
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: "center",
  },
  pillText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

