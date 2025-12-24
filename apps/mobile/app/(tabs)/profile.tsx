import PlayerStats from "@/features/player/components/player-stats";
import TrashBreakdown from "@/features/trash/components/trashes-breakdown";
import { useCategoryBreakdown } from "@/features/trash/hooks/categoryBreakdown";
import { supabase } from '@/lib/supabase';
import { translate } from "@/locales";
import { playerStore } from "@/shared/stores/player-store";
import { Colors, type TrashCount } from "@pickandtag/domain";
import { Session } from '@supabase/supabase-js';
import { useStore } from "@tanstack/react-store";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function ProfileScreen() {

  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const currentXp = useStore(playerStore, playerStore => playerStore.currentXp);
  const displayName = useStore(playerStore, playerStore => playerStore.displayName);
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
    const total = selectedOption.trash.reduce((acc, val) => acc + val.count, 0);
    const previousTotal = selectedOption.previousTrash?.reduce((acc, val) => acc + val.count, 0);
    setSelectTrashCount(total);
    setPreviousPeriodTrashCount(previousTotal ?? 0);
    setLastPeriodText(selectedOption.text)
  }, [selectedOption]);

  const categoryBreakdown = useCategoryBreakdown(selectedOption.trash ?? []);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{session ? 'Bienvenue ' + displayName : 'Mon Profil'}</Text>
          {!session && <Pressable onPress={() => router.navigate('/auth/login')}>
            <Text>Se connecter</Text>
          </Pressable>
          }
          {session && <Pressable onPress={() => router.navigate('/profile/settings')}>
            <Text>Gérer mon profil</Text>
          </Pressable>
          }
        </View>
      </View>
      <View style={styles.content}>
        <PlayerStats currentXp={currentXp??0} />
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
                <Pressable key={option}
                  onPress={() => setSelected(option)}
                  style={[styles.pickerButton,
                  isSelected && styles.pickerSelected,
                  isFirst && styles.pickerFirstSegment,
                  isLast && styles.pickerLastSegment]}>
                  <Text style={[styles.pickerButtonText, isSelected && styles.selectedText]}>{translate(option)}</Text>
                </Pressable>
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

