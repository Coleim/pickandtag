import { Fab } from "@/components/global/buttons";
import { LastCollects } from "@/components/home/last-collects";
import Onboarding from "@/components/home/onboarding";
import PlayerStats from "@/components/home/player-stats";
import { Colors } from "@/constants/Colors";
import { TrashCategories } from "@/constants/TrashCategories";
import { playerStore } from "@/stores/player-store";
import { FontAwesome5 } from "@expo/vector-icons";
import { useStore } from "@tanstack/react-store";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


export default function HomeScreen() {
  const router = useRouter();
  const { isInit, currentXp, weeklyTrashes, trashes } = useStore(playerStore);
  const totalGlobal = weeklyTrashes.length;

  const categoryBreakdown = useMemo(() => {

    const map: Record<string, number> = {};
    for (let trash of weeklyTrashes) {
      map[trash.category] = (map[trash.category] ?? 0) + 1;
    }
    return Object.entries(map).map(([type, amount]) => ({ type, amount }));

  }, [weeklyTrashes]);

  if (!isInit) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (trashes.length === 0) {
    return <Onboarding />;
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cette semaine, tu as collecté</Text>
          <Text style={styles.headerCount}>{totalGlobal.toLocaleString()} déchet{totalGlobal > 1 ? 's' : ''} !</Text>
          <View style={styles.breakdownWrapper}>
            {categoryBreakdown.map((c) => {
              const cfg = TrashCategories[c.type] || { color: "#aaa", icon: "trash" };
              const count = c.amount;
              if (count === 0) return null; // éviter les catégories à 0
              return (
                <View key={c.type} style={[styles.breakdownPill, { backgroundColor: cfg.color }]}>
                  <Text style={styles.breakdownPillText}>
                    {count}
                  </Text>
                  <FontAwesome5 name={cfg.icon as any} size={20} color={Colors.white} />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* <View style={[styles.mapBox]} /> */}
      <PlayerStats currentXp={currentXp} />


      {/* Dernières collectes */}
      <LastCollects trashes={weeklyTrashes} />
      {/* Floating Add Button */}
      <Fab onPress={() => router.navigate("/collect/new-trash")} />
    </View >
  );
}

const styles = StyleSheet.create({

  breakdownWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  breakdownPill: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    borderColor: Colors.accent,
  },
  breakdownPillText: {

    color: Colors.white,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  headerWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },

  header: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
  },

  headerTitle: { fontSize: 18, color: "#fff", marginTop: 8, marginBottom: 4, textAlign: "center" },
  headerCount: { fontSize: 28, fontWeight: "700", color: "#fff", textAlign: "center" },
  colorDot: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },

  mapBox: {
    height: 150,
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  mapButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  mapButtonText: { color: "#fff", marginLeft: 6 },

});

