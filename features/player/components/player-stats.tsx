import { Colors } from "@/shared/constants/colors";
import { getLevelForXP } from "@/shared/constants/levels";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import XPSection from "./xp-section";

export default function PlayerStats({ currentXp }: { currentXp: number }) {
  const { current, next } = useMemo(() => getLevelForXP(currentXp), [currentXp]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Niveau {current.level} - {current.title}</Text>
      <XPSection xp={currentXp} xpForNext={next?.xpRequired} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});

