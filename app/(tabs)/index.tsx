import { LastCollects } from "@/components/collect/last-collects";
import { Fab } from "@/components/global/buttons";
import PlayerStats from "@/components/home/player-stats";
import TrashBreakdown from "@/components/stats/trashes-breakdown";
import { Colors } from "@/constants/Colors";
import { useCategoryBreakdown } from "@/hooks/categoryBreakdown";
import { playerStore } from "@/stores/player-store";
import { useStore } from "@tanstack/react-store";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


export default function HomeScreen() {
  const router = useRouter();
  const isInit = useStore(playerStore, store => store.isInit);
  const currentXp = useStore(playerStore, store => store.currentXp);
  const weeklyTrashes = useStore(playerStore, store => store.weeklyTrashes);
  const bestWeek = useStore(playerStore, store => store.trashCount?.bestWeek);
  const weeklyCount = useStore(playerStore, store => store.trashCount?.weekly);
  const totalGlobal = weeklyTrashes.length;
  const categoryBreakdown = useCategoryBreakdown(weeklyCount ?? []);
  if (!isInit) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* REVIEW: Componentize header (StatsHeader) to reuse on other screens and keep this file lean. */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cette semaine, tu as collecté</Text>
          <Text style={styles.headerCount}>{totalGlobal.toLocaleString()} déchet{totalGlobal > 1 ? 's' : ''} !</Text>
          <Text style={styles.bestScoreText}>Meilleur score : {bestWeek?.count ?? 0} déchets en une semaine</Text>
          <TrashBreakdown categoryBreakdown={categoryBreakdown} />
        </View>
      </View>

      <View style={styles.content}>
        <PlayerStats currentXp={currentXp} />
        <LastCollects trashes={weeklyTrashes} />
      </View >
      <Fab onPress={() => router.navigate("/collect/new-trash")} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 8, flex: 1 },
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

  headerTitle: { fontSize: 18, color: Colors.text, marginTop: 8, marginBottom: 4, textAlign: "center" },
  headerCount: { fontSize: 28, fontWeight: "700", color: Colors.text, textAlign: "center" },
  bestScoreText: { color: Colors.secondary },
});

