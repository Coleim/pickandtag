import { type Trash } from "@pickandtag/domain";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


interface UsePlayerTrashDataReturn {
  playerTrashes: Trash[];
  trashLoading: boolean;
  trashError: string | null;
}

export function usePlayerTrashData(playerId: string | undefined): UsePlayerTrashDataReturn {
  const [playerTrashes, setPlayerTrashes] = useState<Trash[]>([]);
  const [trashLoading, setTrashLoading] = useState(true);
  const [trashError, setTrashError] = useState<string | null>(null);

  useEffect(() => {
    if (!playerId) {
      setTrashError('No player ID provided');
      setTrashLoading(false);
      return;
    }

    const fetchPlayerTrashData = async () => {
      try {
        setTrashLoading(true);
        setTrashError(null);

        console.log( "Fetching trashes for player ID: ", playerId);
        const { data, error } = await supabase
          .from('trashes')
          .select('id, category, latitude, longitude, city, country, region, subregion, image_url, created_at, updated_at')
          .eq('player_id', playerId)
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          throw new Error('Player not found');
        }
        const playerTrashes: Trash[] = data.map((item) => ({
          id: item.id,
          category: item.category,
          latitude: item.latitude,
          longitude: item.longitude,
          city: item.city,
          subregion: item.subregion,
          region: item.region,
          country: item.country,
          imageUrl: item.image_url ?? undefined,
          syncStatus: 'SYNCED',
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at)
        }));

        setPlayerTrashes(playerTrashes);
      } catch (err) {
        setTrashError(err instanceof Error ? err.message : 'Failed to load player data');
        setPlayerTrashes([]);
      } finally {
        setTrashLoading(false);
      }
    };

    fetchPlayerTrashData();
  }, [playerId]);



  return { playerTrashes, trashLoading, trashError };
}
