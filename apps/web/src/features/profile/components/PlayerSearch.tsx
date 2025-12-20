import { FaSearch } from "react-icons/fa";
import styles from "./PlayerSearch.module.css";

type PlayerSearchProps = {
  value: string;
  onChange: (value: string) => void;
};


export default function PlayerSearch({ value, onChange }: PlayerSearchProps) {

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search by pseudo..." value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  )
}
