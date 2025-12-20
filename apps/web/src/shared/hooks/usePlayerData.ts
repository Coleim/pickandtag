import { getLevelForXP, type Player } from "@pickandtag/domain";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


interface UsePlayerDataReturn {
  player: Player | null;
  loading: boolean;
  error: string | null;
}

export function usePlayerData(playerId: string | undefined): UsePlayerDataReturn {

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!playerId) {
      setError('No player ID provided');
      setLoading(false);
      return;
    }

    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('players')
          .select('id, display_name, xp, trash_collected, updated_at')
          .eq('id', playerId)
          .single();

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        if (!data) {
          throw new Error('Player not found');
        }

        const player: Player = {
          id: data.id,
          displayName: data.display_name,
          xp: data.xp,
          level: getLevelForXP(data.xp).current,
          totalItems: data.trash_collected,
          updated_at: data.updated_at
        }

        setPlayer(player);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load player data');
        setPlayer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);



  return { player, loading, error };
}
