import { signOut } from '@/lib/auth';
import { playerStore, updateDisplayName } from '@/shared/stores/player-store';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@pickandtag/domain';
import { useStore } from '@tanstack/react-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function ProfileSettings() {
  const router = useRouter();
  const displayName = useStore(playerStore, s => s.displayName);
  const playerId = useStore(playerStore, s => s.playerId);
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(displayName);

  const logout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    router.dismissAll();
  };

  const saveName = () => {
    updateDisplayName(name?.trim() || displayName || '');
    setEditing(false);
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Voici mon profil : https://pickandtag.onrender.com/app/players/${playerId}`,
      });
    } catch (error) {
      console.error('Erreur partage :', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
      <View style={styles.container}>
        {/* ───────── Header ───────── */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </Pressable>

          <Text style={styles.headerTitle}>Profil</Text>
        </View>
        {/* ───────── Content ───────── */}
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.label}>Compte</Text>

            <View style={styles.nameRow}>
              {editing ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    autoFocus
                    onSubmitEditing={saveName}
                    returnKeyType="done"
                  />
                  <Pressable onPress={saveName} style={styles.iconButton}>
                    <FontAwesome5 name="check" size={16} color={Colors.primary} />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setEditing(false);
                      setName(displayName);
                    }}
                    style={styles.iconButton}
                  >
                    <FontAwesome5 name="times" size={16} color={Colors.error} />
                  </Pressable>
                </>
              ) : (
                <>
                  <Text style={styles.name}>{displayName}</Text>
                  <Pressable onPress={() => setEditing(true)} style={styles.iconButton}>
                    <FontAwesome5 name="pen" size={16} color={Colors.inactive} />
                  </Pressable>
                </>
              )}
            </View>
          </View>
          <View style={styles.actions}>
            <Pressable onPress={shareProfile} style={styles.linkButton}>
              <FontAwesome5
                name="share-alt"
                size={16}
                color={Colors.secondary}
                style={styles.linkIcon}
              />
              <Text style={styles.link}>Partager mon profil</Text>
            </Pressable>

            <Pressable onPress={logout} disabled={loading} style={styles.linkButton}>
              <FontAwesome5
                name="sign-out-alt"
                size={16}
                color={Colors.error}
                style={styles.linkIcon}
              />
              <Text style={[styles.link, styles.danger]}>
                {loading ? 'Déconnexion…' : 'Se déconnecter'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  /* Header */
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 24,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    top: 24,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  /* Content */
  content: {
    flex: 1,
    padding: 24,
  },

  section: {
    marginBottom: 32,
  },

  label: {
    fontSize: 13,
    color: Colors.inactive,
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  input: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    flex: 1,
  },

  iconButton: {
    padding: 4,
  },
  actions: {
    gap: 16,
    marginTop: 24,
  },
  link: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: '600',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  linkIcon: {
    width: 20,
    textAlign: 'center',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
  },


  danger: {
    color: Colors.error,
  },
});
