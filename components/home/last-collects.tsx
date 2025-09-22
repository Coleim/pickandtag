import { TrashCategories } from "@/constants/TrashCategories";
import { Trash } from "@/types/trash";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CollectItem from "./collect-items";

export function LastCollects({ trashes }: { trashes: Trash[] }) {

  const sortedTrashes: Trash[] = useMemo(
    () => sortTrashes(trashes),
    [trashes]
  )

  function sortTrashes(trashes: Trash[]): Trash[] {
    // REVIEW: Avoid in-place sort; clone first to keep prop immutable.
    return [...trashes].sort((a: Trash, b: Trash) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.sectionTitle}>Dernières collectes</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={sortedTrashes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CollectItem item={item} categories={TrashCategories} />
        )} />
      {/* REVIEW: Consider ListEmptyComponent for empty states and contentContainerStyle padding for last item spacing. */}
    </View>

  );
}


const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
  },
})
