import { Trash } from "@/types/trash";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CollectedItem from "./collected-items";

export function LastCollects({ trashes, onTrashClicked }: { trashes: Trash[], onTrashClicked: (trashId: string) => void }) {

  const sortedTrashes: Trash[] = useMemo(
    () => sortTrashes(trashes),
    [trashes]
  )

  function sortTrashes(trashes: Trash[]): Trash[] {
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
          <CollectedItem item={item} onPress={() => onTrashClicked(item.id)} />
        )} />
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
