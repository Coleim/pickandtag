import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@pickandtag/domain';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type Provider = 'google' | 'github';

type Props = {
  provider: Provider;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function ConnectWithButton({
  provider,
  onPress,
  loading = false,
  disabled = false,
}: Props) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        config.container,
        (disabled || loading) && styles.disabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Se connecter avec ${config.label}`}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={config.spinnerColor} />
        ) : (
          <Ionicons
            name={config.icon}
            size={20}
            color={config.iconColor}
          />
        )}

        <Text style={[styles.text, config.text]}>
          {loading
            ? 'Connexion en cours...'
            : `Se connecter avec ${config.label}`}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    maxWidth: 340,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});


const PROVIDER_CONFIG = {
  google: {
    label: 'Google',
    icon: 'logo-google',
    container: {
      backgroundColor: Colors.white,
      borderColor: '#dadce0',
      borderWidth: 1,
    },
    text: {
      color: '#3c4043',
    },
    iconColor: '#4285F4',
    spinnerColor: '#4285F4',
  },

  github: {
    label: 'GitHub',
    icon: 'logo-github',
    container: {
      backgroundColor: '#24292e',
    },
    text: {
      color: Colors.white,
    },
    iconColor: Colors.white,
    spinnerColor: Colors.white,
  },
} as const;

