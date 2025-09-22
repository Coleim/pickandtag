import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type XPProps = {
  level: number;
  xp: number;
  xpForNext?: number | undefined;
  title: string;
};

export default function XPSection({ level, xp, xpForNext, title }: XPProps) {

  const progress = xpForNext ? Math.min(xp / xpForNext, 1) : xp;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Niveau {level} - {title}</Text>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
      <View style={styles.xpText}>

        <Text style={styles.text}>
          XP : {xp} / {xpForNext ?? xp}
        </Text>
        <TouchableOpacity >
          <FontAwesome5 name="jedi" size={20} />
        </TouchableOpacity>
      </View>

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
  xpText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});



