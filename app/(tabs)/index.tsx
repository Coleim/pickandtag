import { Fab } from "@/components/global/buttons";
import { LastCollects } from "@/components/home/last-collects";
import PlayerStats from "@/components/home/player-stats";
import TrashBreakdown from "@/components/stats/trashes-breakdown";
import { Colors } from "@/constants/Colors";
import { playerStore } from "@/stores/player-store";
import { useStore } from "@tanstack/react-store";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


export default function HomeScreen() {
  const router = useRouter();
  const { isInit, currentXp, weeklyTrashes } = useStore(playerStore);
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

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cette semaine, tu as collecté</Text>
          <Text style={styles.headerCount}>{totalGlobal.toLocaleString()} déchet{totalGlobal > 1 ? 's' : ''} !</Text>
          <TrashBreakdown totalGlobal={totalGlobal} categoryBreakdown={categoryBreakdown} />
        </View>
      </View>

      <View style={styles.content}>
        <PlayerStats currentXp={currentXp} />

        {/* Dernières collectes */}
        <LastCollects trashes={weeklyTrashes} />
        {/* Floating Add Button */}
      </View >
      <Fab onPress={() => router.navigate("/collect/new-trash")} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 8 },
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
  container: { flex: 1, backgroundColor: Colors.background },

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

