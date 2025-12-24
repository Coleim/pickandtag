import type { Player } from "@pickandtag/domain";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePlayers from "../../../shared/hooks/usePlayers";
import PlayerList from "../components/PlayerList";
import PlayerSearch from "../components/PlayerSearch";

export default function PlayerSearchPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const { players, loading } = usePlayers(debouncedTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const navigate = useNavigate();

  const handlePlayerSelect = (player: Player) => {
    navigate(`/app/players/${player.id}`);
  };

  return (
    <div>
      <PlayerSearch value={searchTerm} onChange={setSearchTerm} />
      {loading ?
        <p>Loading player profile...</p>
        :
        <PlayerList players={players} onPlayerSelect={handlePlayerSelect} />
      }
    </div>
  )
}
