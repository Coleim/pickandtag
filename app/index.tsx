import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { trashStore, updateTrashStore } from "./stores/trash-store";
import { useStore } from "@tanstack/react-store";

export default function Index() {
  const router = useRouter();

  // const store = useStore(trashStore);
  //
  // function addTrash() {
  //
  //
  //
  //   updateTrashStore({
  //
  //     id: 12,
  //     category: "test",
  //     location: "123",
  //     city: "Paris",
  //     country: "France",
  //     imageBase64: "sdgsdfsdfsdfu"
  //   })
  //
  // }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Collect New Trash" onPress={() => router.navigate('/collect/new-trash')} />

      {/* <Text>Hello - {JSON.stringify(store)} - </Text> */}

      {/* <Button title="Add Trash" onPress={() => addTrash()} /> */}
      {/* All trashes will be listed here. */}
    </View>
  );
}
