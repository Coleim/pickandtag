import PlayerStats from "@/components/home/player-stats";
import { Colors } from "@/constants/Colors";
import { playerStore } from "@/stores/player-store";
import { useStore } from "@tanstack/react-store";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {


  const { isInit, currentXp, weeklyTrashes, trashes } = useStore(playerStore);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>

      <PlayerStats currentXp={currentXp} />
    </View >
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
  },

  headerTitle: { fontSize: 18, color: "#fff", marginTop: 8, marginBottom: 4, textAlign: "center" },

});

