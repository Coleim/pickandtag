import { buttonStyles } from "@/constants/ButtonStyles";
import { Text, TouchableOpacity } from "react-native";

export function PrimaryButton({ title, loadingTitle, loading, onPress }: { title: string, loadingTitle: string, loading: boolean, onPress: () => void }) {

  return (
    <TouchableOpacity disabled={loading} onPress={onPress} style={buttonStyles.primary}>
      <Text style={buttonStyles.primaryText}>{loading ? loadingTitle : title}</Text>
    </TouchableOpacity>

  )
}

