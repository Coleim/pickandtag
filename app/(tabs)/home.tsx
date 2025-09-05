import { LastCollects } from "@/components/home/last-collects";
import { Colors } from "@/constants/Colors";
import { TrashCategories } from "@/constants/TrashCategories";
import { trashStore } from "@/stores/trash-store";
import { Trash } from "@/types/trash";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useStore } from "@tanstack/react-store";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function HomeScreen() {
  const router = useRouter();
  const trashes: Trash[] = useStore(trashStore);
  const totalGlobal = trashes.length;
  const categoryBreakdown = useMemo(() => {

    const map: Record<string, number> = {};
    for (let trash of trashes) {
      map[trash.category] = (map[trash.category] ?? 0) + 1;
    }

    return Object.entries(map).map(([type, amount]) => ({ type, amount }));

  }, [trashes]);

  return (
    <View style={styles.container}>
      {/* HEADER + Breakdown bloc centré */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tu as collecté</Text>
          <Text style={styles.headerCount}>{totalGlobal.toLocaleString()} déchets !</Text>

          <View style={styles.breakdownWrapper}>
            {categoryBreakdown.map((c) => {
              const cfg = TrashCategories[c.type] || { color: "#aaa", icon: "trash" };
              const count = c.amount;
              if (count === 0) return null; // éviter les catégories à 0
              return (
                <View key={c.type} style={[styles.breakdownPill, { backgroundColor: cfg.color }]}>
                  <Text style={styles.breakdownPillText}>
                    {count}
                    {/* {c.type.toLowerCase()} */}
                  </Text>
                  <FontAwesome5 name={cfg.icon as any} size={20} color="#FFF" />

                </View>
              );
            })}
          </View>

        </View>
      </View>

      {/* MAP placeholder */}
      <View style={[styles.mapBox]} />

      {/* <TouchableOpacity style={styles.mapButton}>
          <Ionicons name="map-outline" size={20} color="#fff" />
          <Text style={styles.mapButtonText}>Voir la carte</Text>
        </TouchableOpacity>
        */}

      {/* <ProgressSection /> */}

      {/* Dernières collectes */}
      <LastCollects trashes={trashes} />
      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.navigate("/collect/new-trash")}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({

  breakdownWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
    gap: 8, // espace entre les pills
  },
  breakdownPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 6,
    // borderWidth: 1,      // bordure blanche
    // borderColor: "#fff",  // blanc
  },
  breakdownPillText: {
    // color: "#000",
    color: "#fff",
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
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
  },

  headerTitle: { fontSize: 18, color: "#fff", marginBottom: 4, textAlign: "center" },
  headerCount: { fontSize: 28, fontWeight: "700", color: "#fff", textAlign: "center" },

  breakdownInline: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
  },
  breakdownItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    width: "50%",
    justifyContent: "flex-start",
    paddingLeft: 8,
  },
  colorDot: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },
  breakdownText: { color: "#fff", fontSize: 15 },

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


  fab: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    backgroundColor: Colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});

