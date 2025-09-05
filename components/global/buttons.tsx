import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export function PrimaryButton({ title, loadingTitle, loading, onPress, iconName }: { title: string, loadingTitle: string, loading: boolean, onPress: () => void, iconName: string | null }) {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress} style={buttonStyles.primary}>
      {iconName && <FontAwesome5 name={iconName} size={20}
        color={Colors.white}
      />
      }
      <Text style={buttonStyles.primaryText}>{loading ? loadingTitle : title}</Text>
    </TouchableOpacity>
  )
}

