import { TrashCategories } from "@/shared/constants/trash-categories";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, type Trash } from "@pickandtag/domain";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Props du composant
type CollectItemProps = {
  item: Trash;
  onPress: () => void
};

// Composant memoisé
const CollectedItem = memo( function CollectedItem({ item, onPress }: CollectItemProps) {
  const cfg = TrashCategories[item.category];
  const date = item.createdAt instanceof Date ? item.createdAt : new Date(item.createdAt);

  function formatFriendlyDate(date: Date, locale = Intl.DateTimeFormat().resolvedOptions().locale): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "à l'instant";
    if (diffMin < 60) return `il y a ${diffMin} min`;
    if (diffHour < 24 && now.getDate() === date.getDate()) return `il y a ${diffHour} h`;

    if (diffDay === 0 && now.getDate() === date.getDate() ) return "Aujourd'hui";
    if (diffDay <= 1 && now.getDate() !== date.getDate() ) return "Hier";
    if (diffDay <= 7) return `il y a ${diffDay} jours`;

    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <TouchableOpacity style={styles.collectItem} onPress={onPress}>
      <FontAwesome5 name={cfg.icon as any} size={20} color={cfg.color} />
      <Text style={styles.collectText}>
        {item.category} • {formatFriendlyDate(date)}{item.city && ` à ${item.city}`}
      </Text>
      <Text style={styles.xpText}>+{TrashCategories[item.category].points}xp</Text>
    </TouchableOpacity>
  );
});

export default CollectedItem;


const styles = StyleSheet.create({
  collectItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 8,
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
