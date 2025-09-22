import { Colors } from "@/constants/Colors";
import { TrashCategories } from "@/constants/TrashCategories";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";


export default function TrashBreakdown({ totalGlobal, categoryBreakdown }: { totalGlobal: number, categoryBreakdown: { type: string, amount: number }[] }) {

  return (
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

