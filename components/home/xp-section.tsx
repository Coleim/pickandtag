import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type XPProps = {
  xp: number;
  xpForNext?: number | undefined;
};

export default function XPSection({ xp, xpForNext }: XPProps) {
  const progress = xpForNext ? Math.min(xp / xpForNext, 1) : xp;
  return (
    <View >
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
      <View style={styles.xpText}>
        <Text style={styles.text}>
          XP : {xp} / {xpForNext ?? xp}
        </Text>
        {/* <TouchableOpacity > */}
        {/*   <FontAwesome5 name="jedi" size={20} /> */}
        {/* </TouchableOpacity> */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  progressBackground: {
    flexDirection: "row",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: Colors.disabled,
    marginBottom: 8,
  },
  progressFill: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
  },
  xpText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});



