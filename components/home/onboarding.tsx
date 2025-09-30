import { Button } from "@/components/global/buttons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Bienvenue sur Pick & Tag 🌱</Text>
      <Swiper
        loop={false}
        showsPagination={true}
        activeDotColor={Colors.accent}
        dotColor={Colors.inactive}
      >
        {/* Étape 1 */}
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/garbo-pick.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Aide Tritou et ramasse un déchet</Text>
          <View style={styles.spacer}></View>
        </View>

        {/* Étape 2 */}
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/garbo-scan.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Scanne le avec l’application</Text>
          <View style={styles.spacer}></View>
        </View>

        {/* Étape 3 */}
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/garbo-throw.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Jette le dans la bonne poubelle</Text>
          <View style={styles.spacer}></View>
        </View>

        {/* Étape 4 avec bouton */}
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/garbo-happy.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Tritou est fier de toi. À toi de jouer !</Text>
          <Button title="Commencer à collecter" onPress={() => router.navigate("/collect/new-trash")} isPrimary />
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginTop: 60, paddingHorizontal: 30 },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: width * 0.7,
    height: height * 0.4,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.text,
    marginBottom: 20,
  },
  spacer: {
    marginTop: 30,
    paddingVertical: 12,
  }
});

