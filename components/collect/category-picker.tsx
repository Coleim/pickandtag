
import { Colors } from "@/constants/Colors";
import { TrashCategories } from "@/constants/TrashCategories";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";


export function CategoryPicker({ selected, onChange }: { selected: string | undefined; onChange: (value: string | undefined) => void; }) {

  const scaleAnim = useRef<{ [key: string]: Animated.Value }>({}).current;

  // Initialiser les Animated values pour chaque catégorie
  Object.keys(TrashCategories).forEach((key) => {
    if (!scaleAnim[key]) scaleAnim[key] = new Animated.Value(1);
  })

  const handlePress = (key: string) => {
    // Animation de press
    Animated.sequence([
      Animated.timing(scaleAnim[key], { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim[key], { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onChange(key);
  };

  return (
    <View style={styles.wrapper}>
      {Object.entries(TrashCategories).map(([key, value]) => {
        const isSelected = selected === key;
        return (
          <TouchableWithoutFeedback key={key} onPress={() => handlePress(key)}>
            <Animated.View
              style={[
                styles.pill,
                {
                  backgroundColor: isSelected ? value.color : Colors.white,
                  borderColor: isSelected ? value.color : Colors.disabled,
                  transform: [{ scale: scaleAnim[key] }],
                },
              ]}
            >

              <FontAwesome5 name={value.icon as any} size={20}
                color={isSelected ? Colors.white : value.color}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.pillText,
                  { color: isSelected ? Colors.white : value.color },
                ]}
              >
                {value.label}
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
    paddingHorizontal: 10,
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

