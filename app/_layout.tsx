// import { Stack } from 'expo-router';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//
//
// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
//         <Stack screenOptions={{ headerShown: false }} />
//       </SafeAreaView>
//     </SafeAreaProvider>
//     );
// }
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}> */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Les routes du projet seront résolues automatiquement */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="collect/new-trash"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
      {/* </SafeAreaView> */}

    </SafeAreaProvider>
  );
}

