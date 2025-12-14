import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useRouter } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function NewAuthScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(" onAuthStateChangeAuth session ? ", session)
    })

  }, [])

  WebBrowser.maybeCompleteAuthSession();

  const redirectTo = makeRedirectUri({
    path: "(tabs)/profile"
  });

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;
    if (!access_token) return;
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) throw error;
    return data.session;
  };

  const signInWithProvider = async (provider: "google" | "github") => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectTo, skipBrowserRedirect: false },
    });
    if (error) throw error;
    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );
    if (res.type === "success") {
      const { url } = res;
      await createSessionFromUrl(url);
    }
  };


  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      setLoading(true)
      await signInWithProvider(provider)
      // The browser is opened — when the flow ends, Supabase will redirect back to the app and the hook will update session
    } catch (err: any) {
      console.error("Erreur: ", err.message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false)
      router.back()
    }
  };

  if (session) {
    return (
      <View style={styles.container}>
        <Pressable
          style={[styles.button, styles.googleButton]}
          onPress={() => signOut()}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Deconnexion en cours...' : 'Se deconnecter'}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Pressable
        style={[styles.button, styles.googleButton]}
        onPress={() => handleOAuth('google')}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Connexion en cours...' : 'Sign in with Google'}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.googleButton]}
        onPress={() => handleOAuth('github')}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Connexion en cours...' : 'Sign in with Github'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  githubButton: {
    backgroundColor: '#24292e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  signOutButton: {
    backgroundColor: '#ff6b6b',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  infoBox: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffc107',
    maxWidth: 300,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  infoSubText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});
