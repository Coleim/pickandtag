import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type XPProps = {
  level: number;
  xp: number;
  xpForNext: number;
  title: string;
};

export default function XPSection({ level, xp, xpForNext, title }: XPProps) {
  const progress = Math.min(xp / xpForNext, 1);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Niveau {level} - {title}</Text>
      {/* Progress bar maison */}
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>


      <Text style={styles.text}>
        XP : {xp} / {xpForNext}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  progressBackground: {
    flexDirection: "row",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: Colors.disabled,
    marginBottom: 8,
  },
  progressFill: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
  },
  level: {
    fontWeight: "bold",
    fontSize: 15,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});



