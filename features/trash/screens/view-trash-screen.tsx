import { Colors } from "@/shared/constants/colors";
import { database } from "@/shared/database/db";
import { deleteTrash } from "@/shared/stores/player-store";
import { Trash } from "@/types/trash";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrashDetail from "../components/trash-detail";

export function ViewTrashScreen() {
  const router = useRouter();
  const { trashId } = useLocalSearchParams();
  const [trash, setTrash] = useState<Trash | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrash = async () => {
      const id = Array.isArray(trashId) ? trashId[0] : trashId;
      if (!id) return;
      const trashData = await database.getTrashById(id);

      setTrash(trashData);
      setLoading(false);
    };

    fetchTrash();
  }, [trashId]);

  const handleDeleteTrash = async (trash: Trash) => {
    await deleteTrash(trash);
    router.back();
  };
  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Détail du déchet</Text>
        </View>
        {trash && <TrashDetail trash={trash} onDelete={handleDeleteTrash} onBack={handleBack} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, backgroundColor: Colors.background },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    backgroundColor: Colors.primary,
    paddingTop: 24,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
  backButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    left: 10,
    top: 24,
  },
  headerTitle: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 22,
    fontWeight: "700",
  },
});





