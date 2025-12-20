import { buttonStyles } from '@/shared/constants/app-button-styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@pickandtag/domain';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type AppButtonProps = {
  label: string;
  loadingLabel?: string;
  loading?: boolean;
  onPress: () => void;
  icon?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function AppButton({
  label,
  loadingLabel = 'Chargement...',
  loading = false,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        buttonStyles.base,
        buttonStyles[variant],
        isDisabled && buttonStyles.disabled,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <View style={buttonStyles.content}>
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          icon && (
            <FontAwesome5
              name={icon}
              size={16}
              color={Colors.white}
            />
          )
        )}

        <Text style={buttonStyles.text}>
          {loading ? loadingLabel : label}
        </Text>
      </View>
    </Pressable>
  );
}

