import type { Player } from "@pickandtag/domain";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePlayers from "../../../shared/hooks/usePlayers";
import PlayerList from "../components/PlayerList";
import PlayerSearch from "../components/PlayerSearch";

export default function PlayerSearchPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const { players, loading } = usePlayers(searchTerm)

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
