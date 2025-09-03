import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categoryConfig: Record<
  string,
  { color: string; icon: keyof typeof FontAwesome5.glyphMap }
> = {
  Plastique: { color: "#fdd835", icon: "recycle" },
  Métal: { color: "#fdd835", icon: "tools" },
  Verre: { color: "#4caf50", icon: "wine-bottle" },
  Papier: { color: "#2196f3", icon: "file-alt" },
};

const mockCollects = [
  { id: "1", category: "Plastique", time: "Il y a 2 min" },
  { id: "2", category: "Métal", time: "Il y a 10 min" },
  { id: "3", category: "Verre", time: "Hier" },
];

const mockBreakdown = [
  { name: "Plastique", personal: 5, group: 3 },
  { name: "Métal", personal: 1, group: 1 },
  { name: "Verre", personal: 1, group: 0 },
  { name: "Papier", personal: 1, group: 0 },
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
          <Text style={styles.headerCount}>{totalGlobal} déchets !</Text>

          <View style={styles.breakdownInline}>
            {mockBreakdown.map((c) => (
              <View key={c.name} style={styles.breakdownItem}>
                <View
                  style={[
                    styles.colorDot,
                    { backgroundColor: categoryConfig[c.name]?.color || "#aaa" },
                  ]}
                />
                <Text style={styles.breakdownText}>
                  {c.personal + c.group} {c.name.toLowerCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* MAP placeholder */}
      <View style={styles.mapBox}>
        <TouchableOpacity style={styles.mapButton}>
          <Ionicons name="map-outline" size={20} color="#fff" />
          <Text style={styles.mapButtonText}>Voir la carte</Text>
        </TouchableOpacity>
      </View>

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
        onPress={() => router.push("collect/new-trash")}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  headerWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },

  header: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    margin: 'auto',
    marginTop: 12,
  },
  breakdownItem: {
    margin: 'auto',
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    width: "50%",
    justifyContent: "flex-start", // pastilles alignées à gauche
    paddingLeft: 8, // léger padding pour pastille
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
    bottom: 14, // bouton légèrement plus bas
    alignSelf: "center", // centré horizontalement
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
