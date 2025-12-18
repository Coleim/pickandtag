import { FaSearch } from "react-icons/fa";
import styles from "./PlayerSearch.module.css";

export default function PlayerSearch() {


  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search by pseudo..." />
      </div>
    </div>
  )
}
