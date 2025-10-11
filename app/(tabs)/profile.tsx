import PlayerStats from "@/features/player/components/player-stats";
import TrashBreakdown from "@/features/trash/components/trashes-breakdown";
import { useCategoryBreakdown } from "@/features/trash/hooks/categoryBreakdown";
import { supabase } from '@/lib/supabase';
import { translate } from "@/locales";
import { Colors } from "@/shared/constants/colors";
import { playerStore } from "@/shared/stores/player-store";
import { TrashCount } from "@/types/trash";
import { FontAwesome5 } from "@expo/vector-icons";
import { Session } from '@supabase/supabase-js';
import { useStore } from "@tanstack/react-store";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {

  const [session, setSession] = useState<Session | null>(null);
  const currentXp = useStore(playerStore, playerStore => playerStore.currentXp);
  const trashCount = useStore(playerStore, playerStore => playerStore.trashCount);
  const [selected, setSelected] = useState("day");
  const [selectedTrashCount, setSelectTrashCount] = useState(0);
  const [previousPeriodTrashCount, setPreviousPeriodTrashCount] = useState(0);
  const [lastPeriodText, setLastPeriodText] = useState<string | undefined>(selected);

  const optionsKeys = ["day", "this_week", "this_month", "total"];

  const selectedOption: { trash: TrashCount[], previousTrash?: TrashCount[], text?: string } = useMemo(() => {
    switch (selected) {
      case "day":
        return {
          trash: trashCount?.daily ?? [],
          previousTrash: trashCount?.yesterday ?? [],
          text: "hier"
        };
      case "this_week":
        return {
          trash: trashCount?.weekly ?? [],
          previousTrash: trashCount?.lastWeek ?? [],
          text: "la semaine dernière"
        }
      case "this_month":
        return {
          trash: trashCount?.monthly ?? [],
          previousTrash: trashCount?.lastMonth ?? [],
          text: "le mois dernier"
        }
      case "total":
        return {
          trash: trashCount?.total ?? [],
        }
      default:
        return {
          trash: [],
        }
    }
  }, [selected, trashCount]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

  }, [])

  // const redirectTo = makeRedirectUri({ useProxy: true });
  // const redirectTo = makeRedirectUri({
  //   // pour Expo Go, tu dois spécifier `scheme` et `useProxy` n’est plus là
  //   scheme: 'exp',
  //   path: 'auth/callback', // optionnel, si tu veux personnaliser
  // });

  WebBrowser.maybeCompleteAuthSession();


  const redirectTo = makeRedirectUri({
    // path: "auth/callback",
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


  const signInWithProvider = async (provider: "google" | "linkedin") => {
    console.log(redirectTo)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectTo, skipBrowserRedirect: true },
    });
    if (error) throw error;

    if (data?.url) {
      const url = new URL(data.url);
      const redirectParam = url.searchParams.get('redirect_to');
      console.log("🔍 redirect_to dans l'URL OAuth:", redirectParam);
    }

    console.log("Start auth")
    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );

    console.log("========================================");
    console.log("📱 Type:", res.type);
    if (res.type === "success") {
      console.log("✅ URL callback:", res.url);
    }
    console.log("========================================");


    if (res.type === "success") {
      const { url } = res;
      console.log(" OKKKKK ")
      await createSessionFromUrl(url);
    }



  };




  const handleOAuth = async (provider: 'google' | 'linkedin') => {
    try {
      // setLoading(true)
      await signInWithProvider(provider)

      // The browser is opened — when the flow ends, Supabase will redirect back to the app and the hook will update session
    } catch (err: any) {
      console.error("Erreur: ", err.message)
      // Alert.alert('Erreur', err.message ?? String(err))
    } finally {
      // setoading(false)
      console.log("LOGIN OK");
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("❌ Erreur logout:", error);
        throw error;
      }

      console.log("✅ Déconnexion réussie");
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion:", error);
      throw error;
    }
  };


  useEffect(() => {
    const total = selectedOption.trash.reduce((acc, val) => acc + val.count, 0);
    const previousTotal = selectedOption.previousTrash?.reduce((acc, val) => acc + val.count, 0);
    setSelectTrashCount(total);
    setPreviousPeriodTrashCount(previousTotal ?? 0);
    setLastPeriodText(selectedOption.text)
  }, [selectedOption]);

  const categoryBreakdown = useCategoryBreakdown(selectedOption.trash ?? []);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Profil
            {session && session.user ? session.user.id : "NOT TAUTH"}
          </Text>

          {session && session.user && <TouchableOpacity onPress={() => signOut()} >
            <Text> Log out </Text>
          </TouchableOpacity>}


          <TouchableOpacity onPress={() => handleOAuth('google')} >
            <FontAwesome5 name="user-circle" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <PlayerStats currentXp={currentXp} />

        <View style={styles.totalTrashesCountContainer}>
          <Text style={styles.trashCountNumber}>{selectedTrashCount}</Text>
          <Text style={styles.trashText}>Déchet{selectedTrashCount > 1 ? 's' : ''}</Text>
          <Text style={styles.previousTrashCount}>{selectedOption.previousTrash ? `${previousPeriodTrashCount} collectés ${lastPeriodText}` : ' '}</Text>
        </View>
        <TrashBreakdown categoryBreakdown={categoryBreakdown} />

        <View style={styles.pickerContainer}>
          {/* TODO: Sortir en composant */}
          <View style={styles.pickerButtonRow}>
            {optionsKeys.map((option, index) => {
              const isFirst = index === 0;
              const isLast = index === optionsKeys.length - 1;
              const isSelected = selected === option;
              return (
                <TouchableOpacity key={option}
                  onPress={() => setSelected(option)}
                  style={[styles.pickerButton,
                  isSelected && styles.pickerSelected,
                  isFirst && styles.pickerFirstSegment,
                  isLast && styles.pickerLastSegment]}>
                  <Text style={[styles.pickerButtonText, isSelected && styles.selectedText]}>{translate(option)}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
    </View >
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 8 },
  headerWrapper: {
    alignItems: "center",
    marginBottom: 8,
  },
  totalTrashesCountContainer: {
    marginHorizontal: 'auto',
    marginVertical: 20,
  },
  trashCountNumber: {
    color: Colors.accent,
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  trashText: {
    color: Colors.accent,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  previousTrashCount: {
    color: Colors.secondary,
    fontSize: 17,
  },
  pickerButtonRow: {
    flexDirection: "row",
  },
  pickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  pickerButtonText: {
    color: Colors.text
  },
  pickerContainer: {
    marginTop: 40,
    marginHorizontal: "auto",
  },
  pickerFirstSegment: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  pickerLastSegment: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  pickerSelected: {
    backgroundColor: Colors.primary
  },
  selectedText: {
    color: Colors.white
  },
  header: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, color: Colors.text, marginTop: 8, marginBottom: 4, textAlign: "center" },
});

