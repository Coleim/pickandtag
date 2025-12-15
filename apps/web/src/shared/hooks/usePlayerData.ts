import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Player { } //TODO: Use generic one from domain

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
          .select('display_name, xp, trash_collected')
          .eq('id', playerId)
          .single();

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        if (!data) {
          throw new Error('Player not found');
        }


        console.log("DATA: ", data)
        setPlayer(data);
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
