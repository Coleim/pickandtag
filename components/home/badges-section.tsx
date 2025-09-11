import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Badge = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export default function BadgesSection({ badges }: { badges: Badge[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Derniers badges obtenus</Text>
      <View style={styles.badgesContainer}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badge}>
            <FontAwesome5
              name={badge.icon as any}
              size={20}
              color={badge.color}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.text}>{badge.name}</Text>
          </View>
        ))}
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
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});

