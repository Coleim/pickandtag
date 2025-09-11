import React from "react";
import { StyleSheet, View } from "react-native";
import BadgesSection from "./badges-section";
import XPSection from "./xp-section";

export default function PlayerStats() {
  const level = 1;
  const xp = 30;
  const xpForNext = 100;
  const title = "Apprenti écolo 🌱";

  const badges = [
    { id: "1", name: "Verre", color: "green", icon: "wine-bottle" },
    { id: "2", name: "Metal", color: "red", icon: "tools" },
    { id: "3", name: "Plastique", color: "orange", icon: "recycle" },
  ];

  return (
    <View style={styles.container}>
      <XPSection level={level} xp={xp} xpForNext={xpForNext} title={title} />
      <BadgesSection badges={badges} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
  },
});

