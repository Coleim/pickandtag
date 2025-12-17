import { buttonStyles } from "@/shared/constants/button-styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@pickandtag/domain";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string,
  loadingTitle?: string | null,
  loading?: boolean,
  onPress: () => void,
  iconName?: string | null,
  isPrimary?: boolean,
  disabled?: boolean
};


export function Button({ title, loadingTitle, loading = false, onPress, iconName, isPrimary = false, disabled = false }: ButtonProps) {
  return (
    <Pressable disabled={loading || disabled} onPress={onPress}
      style={[isPrimary ? buttonStyles.primary : buttonStyles.secondary, (loading || disabled) && buttonStyles.disabled]}>
      {iconName && <FontAwesome5 name={iconName} size={20} color={Colors.white} />}
      <Text style={isPrimary ? buttonStyles.primaryText : buttonStyles.secondaryText}>{loading ? loadingTitle ?? "Loading" : title}</Text>
    </Pressable>
  )
}

type FabProps = {
  title?: string | null,
  onPress: () => void
}

export function Fab({ title, onPress }: FabProps) {
  return (
    <Pressable
      style={title ? buttonStyles.fabWithTextPrimary : buttonStyles.fab}
      onPress={onPress}
    >
      <FontAwesome5 name="plus" size={20} color={Colors.white} />
      {title && <Text style={buttonStyles.fabText}>{title}</Text>}
    </Pressable>
  )
}



