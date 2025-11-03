import { Colors } from "@/shared/constants/colors";
import { CategoryConfigDetails } from "@/types/categoryConfig";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, Text } from "react-native";


export function CategoryPill({ isSelected, value, scale }: { isSelected: boolean; value: CategoryConfigDetails; scale?: Animated.Value }) {


  return (
    <Animated.View
      style={[
        styles.pill,
        {
          backgroundColor: isSelected ? value.color : Colors.white,
          borderColor: isSelected ? value.color : Colors.disabled,
          transform: scale ? [{ scale }] : undefined,
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

  )
}


const styles = StyleSheet.create({
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

