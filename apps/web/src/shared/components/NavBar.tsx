import { FaMapMarkerAlt, FaTrophy, FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export function NavBar() {

  return (
    <nav className={styles.navbar} >

      <ul className={styles.nav}>
        <li>
          <NavLink to="/app/players"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }>
            <FaUserFriends />
            Players
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/player-rankings"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }>
            <FaTrophy />
            Player Rankings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/location-rankings"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }>
            <FaMapMarkerAlt />
            Location Rankings
          </NavLink>
        </li>
      </ul>

    </nav>
  )

}
