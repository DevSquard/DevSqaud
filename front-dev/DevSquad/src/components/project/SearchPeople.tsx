import style from "./Searchpeople.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import test from "../../assets/logo.png";

const SearchPeople = () => {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className="card" style={{ width: "18rem" }}>
          <img src={test} className="card-img-top" alt="아 또 몰랑" />
          <div className="card-body">
            <p className="card-text">dd</p>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={test} className="card-img-top" alt="아 또 몰랑" />
          <div className="card-body">
            <p className="card-text">dd</p>
          </div>
        </div>
      </div>
      <div className={style.search}>
        <div className={style.searchsidebar}>
          <div className="dropdown d-inline">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              언어검색
            </button>
            <u className="dropdown-menu">
              <a className="dropdown-item" href="#">
                파이썬
              </a>
              <a className="dropdown-item" href="#">
                자바
              </a>
              <a className="dropdown-item" href="#">
                html
              </a>
            </u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
