import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { PrimaryButton } from "../global/buttons";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Bienvenue sur Pick & Tag 🌱</Text>
      <Swiper
        loop={false}
        showsPagination={true}
        activeDotColor="#4CAF50"
        dotColor="#ccc"
      >
        {/* Étape 1 */}
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/garbo-pick.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Aide Garbo et ramasse un déchet</Text>
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
          <Text style={styles.text}>Garbo est fier de toi. À toi de jouer !</Text>
          <PrimaryButton title="Commencer à collecter" onPress={() => router.navigate("/collect/new-trash")} />
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
    color: "#333",
    marginBottom: 20,
  },
  spacer: {
    marginTop: 30,
    paddingVertical: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

