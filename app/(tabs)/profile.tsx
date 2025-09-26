import PlayerStats from "@/components/home/player-stats";
import TrashBreakdown from "@/components/stats/trashes-breakdown";
import { Colors } from "@/constants/Colors";
import { playerStore } from "@/stores/player-store";
import { TrashCount } from "@/types/trash";
import { useStore } from "@tanstack/react-store";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {

  const currentXp = useStore(playerStore, playerStore => playerStore.currentXp);
  const trashCount = useStore(playerStore, playerStore => playerStore.trashCount);
  const [selected, setSelected] = useState("Jour");
  const [selectedTrashCount, setSelectTrashCount] = useState(0);
  const [previousPeriodTrashCount, setPreviousPeriodTrashCount] = useState(0);
  const [lastPeriodText, setLastPeriodText] = useState<string | undefined>(selected);

  const options = ["Jour", "Cette Semaine", "Ce Mois", "Total"];

  const selectedOption: { trash: TrashCount[], previousTrash?: TrashCount[], text?: string } = useMemo(() => {
    switch (selected) {
      case "Jour":
        return {
          trash: trashCount?.daily ?? [],
          previousTrash: trashCount?.yesterday ?? [],
          text: "hier"
        };
      case "Cette Semaine":
        return {
          trash: trashCount?.weekly ?? [],
          previousTrash: trashCount?.lastWeek ?? [],
          text: "la semaine dernière"
        }
      case "Ce Mois":
        return {
          trash: trashCount?.monthly ?? [],
          previousTrash: trashCount?.lastMonth ?? [],
          text: "le mois dernier"
        }
      case "Total":
        return {
          trash: trashCount?.total ?? [],
        }
      default:
        return {
          trash: [],
        }
    }
  }, [selected, trashCount]);

  useEffect(() => {
    const total = selectedOption.trash.reduce((acc, val) => acc + val.count, 0);
    const previousTotal = selectedOption.previousTrash?.reduce((acc, val) => acc + val.count, 0);
    setSelectTrashCount(total);
    setPreviousPeriodTrashCount(previousTotal ?? 0);
    setLastPeriodText(selectedOption.text)
  }, [selectedOption]);

  //TODO: Find a way to export it in common
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    for (let trash of selectedOption.trash ?? []) {
      map[trash.category] = (map[trash.category] ?? 0) + trash.count;
    }
    return Object.entries(map).map(([type, amount]) => ({ type, amount }));

  }, [selectedOption]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Parcours</Text>
        </View>
      </View>
      <View style={styles.content}>
        <PlayerStats currentXp={currentXp} />

        <View style={styles.totalTrashesCountContainer}>
          <Text style={styles.trashCountNumber}>{selectedTrashCount}</Text>
          <Text style={styles.trashText}>Déchet{selectedTrashCount > 1 ? 's' : ''}</Text>
          <Text style={styles.previousTrashCount}>{selectedOption.previousTrash ? `${previousPeriodTrashCount} collectés ${lastPeriodText}` : ' '}</Text>
        </View>
        <TrashBreakdown categoryBreakdown={categoryBreakdown} />

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
    marginVertical: 20,
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
  previousTrashesCountContainer: {
    marginHorizontal: "auto",
    marginBottom: 35
  },
  previousTrashCount: {
    color: Colors.secondary,
    fontSize: 17,
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

