import { buttonStyles } from "@/constants/ButtonStyles";
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string,
  loadingTitle?: string | null,
  loading?: boolean,
  onPress: () => void,
  iconName?: string | null,
  isPrimary?: boolean
};


export function Button({ title, loadingTitle, loading = false, onPress, iconName, isPrimary = false }: ButtonProps) {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress} style={isPrimary ? buttonStyles.primary : buttonStyles.secondary}>
      {iconName && <FontAwesome5 name={iconName} size={20}
        color={Colors.white}
      />
      }
      <Text style={isPrimary ? buttonStyles.primaryText : buttonStyles.secondaryText}>{loading ? loadingTitle : title}</Text>
      {/* REVIEW: loadingTitle can be null; provide a sensible default to avoid empty text. */}
    </TouchableOpacity>
  )
}

type FabProps = {
  title?: string | null,
  onPress: () => void
}

export function Fab({ title, onPress }: FabProps) {
  return (
    <TouchableOpacity
      style={title ? buttonStyles.fabWithTextPrimary : buttonStyles.fab}
      onPress={onPress}
    >
      <FontAwesome5 name="plus" size={20} color={Colors.white} />
      {title && <Text style={buttonStyles.fabText}>{title}</Text>}
    </TouchableOpacity>
  )
}

// REVIEW: Consider extracting an AddTrashFab that embeds navigation/haptics to reduce repetition across screens.


