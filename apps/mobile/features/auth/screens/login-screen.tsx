import { signInWithOAuth } from '@/lib/auth';
import { Colors } from '@pickandtag/domain';
import { useState } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConnectWithButton } from '../components/connect-with-button';
import { useRouter } from 'expo-router';

export function LoginScreen() {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'github' | null>(null);
  const router = useRouter();

  const handleLogin = async (provider: 'google' | 'github') => {
    try {
      setLoadingProvider(provider);
      await signInWithOAuth(provider);
    } catch (e) {
      console.error('Login error:', e);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Se connecter</Text>
        <Text style={styles.subtitle}>
          Connecte-toi pour accéder à ton profil
        </Text>
      </View>

      <View style={styles.buttons}>
        <ConnectWithButton
          provider="google"
          onPress={() => handleLogin('google')}
          loading={loadingProvider === 'google'}
        />

        <ConnectWithButton
          provider="github"
          onPress={() => handleLogin('github')}
          loading={loadingProvider === 'github'}
        />
      </View>

      {/* Bouton secondaire pour continuer sans compte */}
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => router.back()}
      >
        <Text style={styles.skipButtonText}>Continuer sans compte</Text>
      </TouchableOpacity>
        <View style={styles.skipInfo}>
        <Text style={styles.skipInfoText}>
          💡 Sans compte, tu ne pourras pas sauvegarder tes données
        </Text>
      </View>

      <Text style={styles.footerText}>
        En continuant, tu acceptes nos <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://pickandtag.onrender.com/terms')}>
          conditions d’utilisation
        </Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.inactive,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 24,
    gap: 12,
  },
  footerText: {
    marginTop: 32,
    fontSize: 12,
    color: Colors.inactive,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: Colors.secondary,
    textDecorationLine: 'underline',
  },
    skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  skipInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FFA500',
  },
  skipInfoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  }
});



