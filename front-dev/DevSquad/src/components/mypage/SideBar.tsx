import style from "./styles/SideBar.module.css";
import { Link } from "react-router-dom";

const menuItem = [
  { Text: "MY PAGE", Link: "/my-page" },
  { Text: "프로필수정", Link: "/my-page/edit" },
  { Text: "나의활동", Link: "/my-page/activities" },
];

const SideBar = () => {
  return (
    <div className={style.sidebar}>
      <nav>
        <ul>
          {menuItem.map((item, index) => (
            <li key={index} className={style.menuItem}>
              <Link to={item.Link} className={style.link}>
                {item.Text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
