import { type Player } from '@pickandtag/domain';
import styles from './PlayerList.module.css';

export default function PlayerList({ players }: { players: Player[] }) {
  return (
    <div className={styles.playerListWrapper} >
      <table className={styles.playerListTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Level</th>
            <th>XP</th>
            <th>Total items</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.displayName}</td>
              <td>{p.level}</td>
              <td>{p.xp}</td>
              <td>{p.totalItems}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

