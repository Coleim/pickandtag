import { signOut } from '@/lib/auth';
import { AppButton } from '@/shared/components/ui/app-button';
import { playerStore, updateDisplayName } from '@/shared/stores/player-store';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@pickandtag/domain';
import { useStore } from '@tanstack/react-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Share, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileSettings() {
  const router = useRouter();
  const displayName = useStore(playerStore, s => s.displayName);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(displayName);

  const logout = async () => {
    await signOut();
    router.replace('(tabs)/profile');
  };

  const saveName = () => {
    updateDisplayName(name?.trim() || displayName || '');
    setEditing(false);
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Voici mon profil : https://myapp.com/user/${displayName}`,
      });
    } catch (error) {
      console.error('Erreur partage :', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ───────── Header ───────── */}
      <View style={styles.header}>
        <Text style={styles.label}>Compte</Text>
        <View style={styles.nameRow}>
          {editing ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nom"
                autoFocus
                onSubmitEditing={saveName}
                returnKeyType="done"
              />
              <Pressable onPress={saveName} style={styles.iconButton}>
                <FontAwesome5 name="check" size={16} color={Colors.primary} />
              </Pressable>
              <Pressable onPress={() => { setEditing(false); setName(displayName); }} style={styles.iconButton}>
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

      {/* ───────── Actions ───────── */}
      <View style={styles.section}>
        <AppButton
          label="Partager mon profil"
          icon="share-alt"
          onPress={shareProfile}
        />
      </View>

      {/* ───────── Danger zone ───────── */}
      <View style={styles.section}>
        <AppButton
          label="Se déconnecter"
          icon="sign-out-alt"
          variant="danger"
          onPress={logout}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
  },

  /* Header */
  header: {
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

  /* Sections */
  section: {
    marginBottom: 32,
  },
});


