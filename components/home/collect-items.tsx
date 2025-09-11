import { Colors } from "@/constants/Colors";
import { TrashCategories } from "@/constants/TrashCategories";
import { CategoryConfig } from "@/types/categoryConfig";
import { Trash } from "@/types/trash";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

// Props du composant
type CollectItemProps = {
  item: Trash;
  categories: CategoryConfig
};

// Composant memoisé
const CollectItem = memo(({ item, categories }: CollectItemProps) => {
  const cfg = categories[item.category] || { color: "#aaa", icon: "trash" };
  const date = item.createdAt instanceof Date ? item.createdAt : new Date(item.createdAt);

  function formatFriendlyDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "à l’instant";
    if (diffMin < 60) return `il y a ${diffMin} min`;
    if (diffHour < 24 && now.getDate() === date.getDate()) return `il y a ${diffHour} h`;

    if (diffDay === 0) return "Aujourd’hui";
    if (diffDay === 1) return "Hier";
    if (diffDay <= 7) return `il y a ${diffDay} jours`;

    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <View style={styles.collectItem}>
      <FontAwesome5 name={cfg.icon as any} size={20} color={cfg.color} />
      <Text style={styles.collectText}>
        {item.category}•{formatFriendlyDate(date)} à {item.city}
      </Text>
      <Text style={styles.xpText}>+{TrashCategories[item.category].points}xp</Text>
    </View>
  );
});



export default CollectItem;


const styles = StyleSheet.create({
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
  xpText: {
    position: "absolute",
    top: 0,
    right: 6,
    fontSize: 12,
    fontWeight: "600",
    color: Colors.accent,
  },
  collectText: { marginLeft: 8, fontSize: 16 },
})
