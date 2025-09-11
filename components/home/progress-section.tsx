import { Colors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

export function ProgressSection() {
  const progressAnim = useRef(new Animated.Value(0)).current;

  const radius = 40; // plus petit
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = 0.75; // 75%

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercent,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }, []);

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      {/* Cercle + Progression */}
      <View style={styles.progressWrapper}>
        <Svg width={radius * 2} height={radius * 2}>
          <Circle
            stroke="#eee"
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={Colors.primary}
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset as any}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.progressTextWrapper}>
          <Text style={styles.progressText}>{Math.round(progressPercent * 100)}%</Text>
        </View>
      </View>

      {/* Badge inline */}
      <View style={styles.badgeRow}>
        <Text style={styles.badgeStar}>★</Text>
        <Text style={styles.badgeLevel}>Niveau 3</Text>
      </View>

      {/* Bouton stats */}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Voir les stats</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  progressWrapper: { marginBottom: 8 },
  progressTextWrapper: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  progressText: { fontSize: 14, fontWeight: "700", color: Colors.primary },

  badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  badgeStar: { fontSize: 18, color: "#FFD700", marginRight: 6 },
  badgeLevel: { fontSize: 16, fontWeight: "600" },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});

