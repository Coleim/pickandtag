import { useParams } from "react-router-dom";
import { usePlayerData } from "../../../shared/hooks/usePlayerData";


export default function PlayerProfilePage() {

  const { id } = useParams<{ id: string }>();
  const { player, loading, error } = usePlayerData(id);


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading player profile...</p>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="error-container">
        <h2>Player Not Found</h2>
        <p>{error || 'The requested player does not exist.'}</p>
      </div>
    );
  }

  return (
    <div className="player-profile-page">
      {JSON.stringify(player)}
      {/* <PlayerProfile player={player} isPublic /> */}
    </div>
  );
}
