import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import style from "./styles/Layout.module.css";

const Layout = () => {
  return (
    <div className={style.layout}>
      <Header />
      <div className={style.content}>
        <main className={style.mainContent}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
