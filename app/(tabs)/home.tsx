import { ProgressSection } from "@/components/progress-section";
import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Categories mises à jour
const categoryConfig: Record<
  string,
  { color: string; icon: keyof typeof FontAwesome5.glyphMap }
> = {
  Plastique: { color: "#FBC02D", icon: "recycle" },
  Polystyrène: { color: "#FF9800", icon: "boxes" },
  Papier: { color: "#1565C0", icon: "file-alt" },
  // Verre: { color: "#2E7D32", icon: "wine-bottle" },
  Verre: { color: "#66BB6A", icon: "wine-bottle" }, // vert plus clair
  Métal: { color: "#B71C1C", icon: "tools" },
  Autre: { color: "#795548", icon: "trash" },
};

// Exemple de 15 collectes
const mockCollects = [
  { id: "1", category: "Plastique", time: "Il y a 2 min" },
  { id: "2", category: "Métal", time: "Il y a 10 min" },
  { id: "3", category: "Verre", time: "Hier" },
  { id: "4", category: "Papier", time: "Hier" },
  { id: "5", category: "Plastique", time: "Il y a 3h" },
  { id: "6", category: "Polystyrène", time: "Il y a 4h" },
  { id: "7", category: "Autre", time: "Il y a 6h" },
  { id: "8", category: "Verre", time: "Hier" },
  { id: "9", category: "Papier", time: "Hier" },
  { id: "10", category: "Polystyrène", time: "Hier" },
  { id: "11", category: "Plastique", time: "Aujourd'hui" },
  { id: "12", category: "Métal", time: "Aujourd'hui" },
  { id: "13", category: "Autre", time: "Aujourd'hui" },
  { id: "14", category: "Verre", time: "Aujourd'hui" },
  { id: "15", category: "Plastique", time: "Aujourd'hui" },
];

// Breakdown pour le header
const mockBreakdown = [
  { name: "Plastique", personal: 2345, group: 3 },
  { name: "Polystyrène", personal: 54422, group: 1 },
  { name: "Métal", personal: 1123, group: 1 },
  { name: "Verre", personal: 1122, group: 0 },
  { name: "Papier", personal: 1333, group: 0 },
  { name: "Autre", personal: 2345235, group: 0 },
];

export default function HomeScreen() {
  const router = useRouter();
  const totalGlobal = mockBreakdown.reduce((sum, c) => sum + c.personal + c.group, 0);

  return (
    <View style={styles.container}>
      {/* HEADER + Breakdown bloc centré */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tu as collecté</Text>
          <Text style={styles.headerCount}>{totalGlobal.toLocaleString()} déchets !</Text>

          <View style={styles.breakdownWrapper}>
            {mockBreakdown.map((c) => {
              const cfg = categoryConfig[c.name] || { color: "#aaa", icon: "trash" };
              const count = c.personal + c.group;
              if (count === 0) return null; // éviter les catégories à 0
              return (
                <View key={c.name} style={[styles.breakdownPill, { backgroundColor: cfg.color }]}>
                  <Text style={styles.breakdownPillText}>
                    {count} {c.name.toLowerCase()}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* <View style={styles.breakdownInline}> */}
          {/*   {mockBreakdown.map((c) => ( */}
          {/*     <View key={c.name} style={styles.breakdownItem}> */}
          {/*       <View */}
          {/*         style={[ */}
          {/*           styles.colorDot, */}
          {/*           { backgroundColor: categoryConfig[c.name]?.color || "#aaa" }, */}
          {/*         ]} */}
          {/*       /> */}
          {/*       <Text style={styles.breakdownText}> */}
          {/*         {c.personal + c.group} {c.name.toLowerCase()} */}
          {/*       </Text> */}
          {/*     </View> */}
          {/*   ))} */}
          {/* </View> */}
        </View>
      </View>

      {/* MAP placeholder */}
      {/* <View style={styles.mapBox}> */}
      {/*   <TouchableOpacity style={styles.mapButton}> */}
      {/*     <Ionicons name="map-outline" size={20} color="#fff" /> */}
      {/*     <Text style={styles.mapButtonText}>Voir la carte</Text> */}
      {/*   </TouchableOpacity> */}
      {/* </View> */}

      <ProgressSection />

      {/* Dernières collectes */}
      <Text style={styles.sectionTitle}>Dernières collectes</Text>
      <FlatList
        data={mockCollects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const cfg = categoryConfig[item.category] || { color: "#aaa", icon: "trash" };
          return (
            <View style={styles.collectItem}>
              <FontAwesome5 name={cfg.icon as any} size={20} color={cfg.color} />
              <Text style={styles.collectText}>
                {item.category} • {item.time}
              </Text>
            </View>
          );
        }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.navigate("/collect/new-trash")}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
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
    backgroundColor: "#e0e0e0",
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },

  collectItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  collectText: { marginLeft: 8, fontSize: 16 },

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

