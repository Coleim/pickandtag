import { Colors } from "@/constants/Colors";
import { getLevelForXP } from "@/constants/levels";
import React from "react";
import { StyleSheet, View } from "react-native";
import XPSection from "./xp-section";

export default function PlayerStats({ currentXp }: { currentXp: number }) {
  // REVIEW: getLevelForXP is pure; consider memoizing if currentXp updates frequently.
  const { current, next } = getLevelForXP(currentXp);

  const badges = [
    { id: "1", name: "Verre", color: "green", icon: "wine-bottle" },
    { id: "2", name: "Metal", color: "red", icon: "tools" },
    { id: "3", name: "Plastique", color: "orange", icon: "recycle" },
  ];

  return (
    <View style={styles.container}>
      {/* REVIEW: Extract a small LevelBadge/Title component to keep XPSection focused. */}
      <XPSection level={current.level} xp={currentXp} xpForNext={next?.xpRequired} title={current.title} />
      {/* <BadgesSection badges={badges} /> */}
      {/* REVIEW: ShareTwitter triggers network intent; consider guarding for web and adding analytics event. */}
      {/* <ShareTwitter xp={currentXp} /> */}
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
});

