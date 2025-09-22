import Onboarding from "@/components/home/onboarding";
import { Colors } from "@/constants/Colors";
import { playerStore } from "@/stores/player-store";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "@tanstack/react-store";
import { Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {

  const { hasTrashes, isInit } = useStore(playerStore);

  if (!isInit) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  if (!hasTrashes) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom', 'top']}>
        <Onboarding />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "index") iconName = "home";
            else if (route.name === "map") iconName = "map-outline";
            else if (route.name === "groups") iconName = "people-outline";
            else if (route.name === "leaderboard") iconName = "trophy-outline";
            else if (route.name === "profile") iconName = "person-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tabs.Screen name="index" />
        {/* <Tabs.Screen name="map" /> */}
        {/* <Tabs.Screen name="groups" /> */}
        {/* <Tabs.Screen name="leaderboard" /> */}
        <Tabs.Screen name="profile" />
      </Tabs>
    </SafeAreaView>
  );
}


