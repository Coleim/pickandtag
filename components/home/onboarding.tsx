import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();

  return (
    <Swiper
      loop={false}
      showsPagination={true}
      activeDotColor="#4CAF50"
      dotColor="#ccc"
    >
      {/* Étape 1 */}
      <View style={styles.slide}>
        <Image
          source={require("../assets/garbo-pick.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>Garbo ramasse un déchet</Text>
      </View>

      {/* Étape 2 */}
      <View style={styles.slide}>
        <Image
          source={require("../assets/garbo-scan.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>Il scanne le déchet avec l’application</Text>
      </View>

      {/* Étape 3 */}
      <View style={styles.slide}>
        <Image
          source={require("../assets/garbo-throw.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>Puis il le jette dans la bonne poubelle</Text>
      </View>

      {/* Étape 4 avec bouton */}
      <View style={styles.slide}>
        <Image
          source={require("../assets/garbo-happy.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>Garbo est fier de toi. À toi de jouer !</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/collect/new-trash")} // redirection
        >
          <Text style={styles.buttonText}>Commencer à collecter</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
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

