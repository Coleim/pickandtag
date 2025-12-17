import { TrashCategories } from "@/shared/constants/trash-categories";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@pickandtag/domain";
import { StyleSheet, Text, View } from "react-native";


export default function TrashBreakdown({ categoryBreakdown }: { categoryBreakdown: { type: string, amount: number }[] }) {

  return (
    <View style={styles.breakdownWrapper}>
      {categoryBreakdown.map((c) => {
        const cfg = TrashCategories[c.type] || { color: "#aaa", icon: "trash" };
        const count = c.amount;
        {/* if (count === 0) return null; */ }
        return (
          <View key={c.type} style={[styles.breakdownPill, { backgroundColor: count === 0 ? '#cccccc' : cfg.color }]}>
            <Text style={styles.breakdownPillText}>
              {count}
            </Text>
            <FontAwesome5 name={cfg.icon as any} size={15} color={Colors.white} />
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
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  breakdownPillText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
});

