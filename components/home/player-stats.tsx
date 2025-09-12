import { getLevelForXP } from "@/constants/levels";
import React from "react";
import { StyleSheet, View } from "react-native";
import XPSection from "./xp-section";

export default function PlayerStats({ currentXp }: { currentXp: number }) {

  const { current, next } = getLevelForXP(currentXp);

  const badges = [
    { id: "1", name: "Verre", color: "green", icon: "wine-bottle" },
    { id: "2", name: "Metal", color: "red", icon: "tools" },
    { id: "3", name: "Plastique", color: "orange", icon: "recycle" },
  ];

  return (
    <View style={styles.container}>
      <XPSection level={current.level} xp={currentXp} xpForNext={next?.xpRequired} title={current.title} />
      {/* <BadgesSection badges={badges} /> */}
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

