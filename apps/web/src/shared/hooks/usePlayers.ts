import { getLevelForXP, type Player } from "@pickandtag/domain"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"


export default function usePlayers(search: string) {

  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true)

      const query = supabase
        .from('player_ranks')
        .select('player_id, display_name, xp, trash_collected, rank')
        .order('rank')
        .limit(10);

      if (search.length > 0) {
        query.ilike('display_name', `*${search}*`)
      }

      const { data, error } = await query

      if (!error) {
        const players = data.map(d => ({
          id: d.player_id,
          displayName: d.display_name,
          xp: d.xp,
          level: getLevelForXP(d.xp).current,
          totalItems: d.trash_collected,
          updated_at: new Date(),
        }))

        setPlayers(players)
      }
      setLoading(false)
    }

    fetchPlayers()
  }, [search])

  return { players, loading }



}
