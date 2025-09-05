import { TrashCategories } from "@/constants/TrashCategories";
import { Trash } from "@/types/trash";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import CollectItem from "./collect-items";

export function LastCollects({ trashes }: { trashes: Trash[] }) {

  const sortedTrashes: Trash[] = useMemo(
    () => sortTrashes(trashes),
    [trashes]
  )

  function sortTrashes(trashes: Trash[]): Trash[] {
    return trashes.sort((a: Trash, b: Trash) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    })
  }

  return (
    <>
      <Text style={styles.sectionTitle}>Dernières collectes</Text>
      <FlatList
        data={sortedTrashes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CollectItem item={item} categories={TrashCategories} />
        )} />
    </>

  );
}


const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
})
