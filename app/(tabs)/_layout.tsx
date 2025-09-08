import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      {/* TODO:  Remove when more than 1 tab */}
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
          tabBarStyle: { display: "none" },
        })}
      >
        <Tabs.Screen name="index" />
        {/* <Tabs.Screen name="map" /> */}
        {/* <Tabs.Screen name="groups" /> */}
        {/* <Tabs.Screen name="leaderboard" /> */}
        {/* <Tabs.Screen name="profile" /> */}
      </Tabs>
    </SafeAreaView>
  );
}


