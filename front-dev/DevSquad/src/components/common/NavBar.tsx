import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      {/* 로고 */}
      <NavLink to="/" className={styles.logo}>
        <img src={logo} alt="DevSquad Logo" className={styles.logoImage} />
      </NavLink>

      <div className={styles.menu}>
        <NavLink to="/project" className={styles.menuItem}>Project</NavLink>
        <NavLink to="/community" className={styles.menuItem}>Lounge</NavLink>
        <NavLink to="/my-page" className={styles.menuItem}>MyPage</NavLink>

        <div onClick={handleLoginClick} className={styles.loginButton}>
          Login
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
