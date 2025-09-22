import PlayerStats from "@/components/home/player-stats";
import TrashBreakdown from "@/components/stats/trashes-breakdown";
import { Colors } from "@/constants/Colors";
import { getLevelForXP } from "@/constants/levels";
import { playerStore, updateAllTrashes, updateMonthlyTrashes } from "@/stores/player-store";
import { useStore } from "@tanstack/react-store";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {

  const { currentXp, dailyTrashes, weeklyTrashes, monthlyTrashes, allTrashes } = useStore(playerStore);
  const { current, next } = getLevelForXP(currentXp);
  const [selected, setSelected] = useState("Jour");
  const totalGlobal = weeklyTrashes.length;
  const [loadingTrashes, setLoadingTrashes] = useState(false);


  const options = ["Jour", "Semaine", "Mois", "Total"];


  const selectedTrashes = useMemo(() => {
    switch (selected) {
      case "Jour":
        return dailyTrashes;
      case "Semaine":
        return weeklyTrashes;
      case "Mois":
        return monthlyTrashes;
      case "Total":
        return allTrashes;
      default:
        return [];
    }
  }, [selected, dailyTrashes, weeklyTrashes, monthlyTrashes]);

  //TODO: Find a way to export it in common
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    for (let trash of selectedTrashes) {
      map[trash.category] = (map[trash.category] ?? 0) + 1;
    }
    return Object.entries(map).map(([type, amount]) => ({ type, amount }));

  }, [selectedTrashes]);


  useEffect(() => {
    const loadTrashes = async () => {
      setLoadingTrashes(true);
      if (selected === "Mois" && monthlyTrashes.length === 0) {
        await updateMonthlyTrashes();
      }
      if (selected === "Total" && allTrashes.length === 0) {
        await updateAllTrashes();
      }
      setLoadingTrashes(false);
    }

    loadTrashes();
  }, [selected, monthlyTrashes]);


  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>
      <View style={styles.content}>
        <PlayerStats currentXp={currentXp} />

        {loadingTrashes ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <>
            <View style={styles.totalTrashesCountContainer}>
              <Text style={styles.trashCountNumber}>{selectedTrashes.length}</Text>
              <Text style={styles.trashText}>Déchet{selectedTrashes.length > 1 ? 's' : ''}</Text>
            </View>
            <TrashBreakdown totalGlobal={totalGlobal} categoryBreakdown={categoryBreakdown} />
          </>
        )}

        <View style={{ marginTop: 40, marginHorizontal: "auto" }}>
          {/* TODO: Sortir en composant */}
          <View style={styles.pickerButtonRow}>
            {options.map((option, index) => {
              const isFirst = index === 0;
              const isLast = index === options.length - 1;
              const isSelected = selected === option;
              return (
                <TouchableOpacity key={option}
                  onPress={() => setSelected(option)}
                  style={[styles.pickerButton,
                  isSelected && styles.pickerSelected,
                  isFirst && styles.pickerFirstSegment,
                  isLast && styles.pickerLastSegment]}>
                  <Text style={[styles.pickerButtonText, isSelected && styles.selectedText]}>{option}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 8 },
  headerWrapper: {
    alignItems: "center",
    marginBottom: 8,
  },
  totalTrashesCountContainer: {
    marginHorizontal: 'auto',
    marginVertical: 30,
    marginBottom: 40
  },
  trashCountNumber: {
    color: Colors.primary,
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  trashText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  pickerButtonRow: {
    flexDirection: "row",
  },
  pickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  pickerButtonText: {
    color: Colors.text
  },
  pickerFirstSegment: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  pickerLastSegment: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  pickerSelected: {
    backgroundColor: Colors.primary
  },
  selectedText: {
    color: Colors.white
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
});

