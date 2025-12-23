import { useParams } from "react-router-dom";
import { usePlayerData } from "@/shared/hooks/usePlayerData";
import { usePlayerTrashData } from "@/shared/hooks/usePlayerTrashData";
import tableStyles from '@/shared/components/Table.module.css';
import { useState } from "react";
import { type Trash } from "@pickandtag/domain";
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function PlayerProfilePage() {

  const { id } = useParams<{ id: string }>();
  const { player, loading, error } = usePlayerData(id);
  const { playerTrashes, trashLoading, trashError } = usePlayerTrashData(id);
  const [selectedTrash, setSelectedTrash] = useState<Trash | null>(null);

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
      <h1>{player.displayName}</h1>
      <h2>{player.level.title}</h2>
      <h3>Level {player.level.level}</h3>
      <h3>XP: {player.xp}</h3>
      <h1>Trashes Collected: {player.totalItems}</h1>
      <h2>Trashes Details:</h2>
      {trashLoading ? (
        <p>Loading trashes...</p>
      ) : trashError ? (
        <p>Error loading trashes: {trashError}</p>
      ) : (
        <div className={tableStyles.tableWrapper} >
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Collecté le</th>
                <th>City / Country</th>
                <th>Region / Subregion</th>
              </tr>
            </thead>
            <tbody>
              {playerTrashes.map((trash) => (
                <tr
                  key={trash.id}
                  onClick={() => setSelectedTrash(trash)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{trash.category || '-'}</td>
                  <td>{new Date(trash.createdAt).toLocaleDateString()}</td>
                  <td>
                    {trash.city ? trash.city + ', ' : ''}
                    {trash.country || '-'}
                  </td>
                  <td>
                    {trash.region || '-'} / {trash.subregion || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

<Modal
        isOpen={!!selectedTrash}
        onRequestClose={() => setSelectedTrash(null)}
        contentLabel="Trash Details"
        style={{
          content: { maxWidth: '500px', margin: 'auto' },
        }}
      >
        {selectedTrash && (
          <div>
            <h2>{selectedTrash.category}</h2>
            <p>Collected: {new Date(selectedTrash.createdAt).toLocaleDateString()}</p>
            <p>Location: {selectedTrash.city}, {selectedTrash.country}</p>
            {selectedTrash.imageUrl && (
              <img src={selectedTrash.imageUrl} alt={selectedTrash.category} style={{ maxWidth: '100%' }} />
            )}
            <button onClick={() => setSelectedTrash(null)}>Close</button>
          </div>
        )}
      </Modal>

    </div>

    
  );
}
