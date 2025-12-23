import { type Player } from '@pickandtag/domain';
import tableStyles from '@/shared/components/Table.module.css';

interface PlayerListProps {
  players: Player[];
  onPlayerSelect: (player: Player) => void;
}


export default function PlayerList({ players, onPlayerSelect }: PlayerListProps) {
  return (
    <div className={tableStyles.tableWrapper} >
      <table className={tableStyles.table}>
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
            <tr key={p.id} onClick={() => onPlayerSelect(p)} style={{ cursor: 'pointer' }}>
              <td>{i + 1}</td>
              <td>{p.displayName}</td>
              <td>{p.level.level}</td>
              <td>{p.xp}</td>
              <td>{p.totalItems}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

