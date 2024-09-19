import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import logo from "../../assets/logo.png";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../recoil/IsLoggedInState";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  
  // 로그인 페이지로 이동 시키기
  const handleLoginClick = () => {
    navigate("/login");
  };
  
  // 로그아웃
  const handleLogout = () => {
    console.log(cookies.refreshToken);
    removeCookie('accessToken', { path: '/', expires: new Date(0) });
    removeCookie('refreshToken', { path: '/', expires: new Date(0) });
    setIsLoggedIn(false); // 상태 업데이트
    console.log("로그아웃 처리 완료");
    // window.location.href = '/'; // 로그아웃 후 리디렉션
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
        { isLoggedIn ? (
          <div onClick={handleLogout} className={styles.loginButton}>
            Logout
          </div>
        ) : (
          <div onClick={handleLoginClick} className={styles.loginButton}>
            Login
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
