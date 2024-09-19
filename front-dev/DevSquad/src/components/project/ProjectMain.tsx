import style from "./ProjectMain.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import test from "../../assets/logo.png";

// interface CardProps {
//   imageSrc: string;
//   altText: string;
//   text: string;
// }
const ProjectMain = () => {
  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>전체 프로젝트</div>

      <div className={style.topbtn}>
        <span>
          <input type="checkbox" />
          출시 서비스만 보기
        </span>

        <button>프로젝트 생성</button>
      </div>

      {/* <ul>
                <li>
                {ProjectMain.map(project => (
                <Project key={project.projectId} project={project} />
                ))}
                </li>
            </ul> */}

      <div>
        <div className={`${style.common}`}>
          <table className={`${style.tags}`}>
            <th>
              <a href="#">태그</a>
            </th>
            <th>
              <a href="#">태그</a>
            </th>
            <th>
              <a href="#">태그</a>
            </th>
            <th>
              <a href="#">태그</a>
            </th>
          </table>
        </div>
        <ul className={`${style.list1}`}>
          <li className={`${style.li1}`}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={test} className="card-img-top" alt="아몰랑" />
              <div className="card-body">
                <p className="card-text">dd</p>
              </div>
            </div>
          </li>
          <li className={`${style.li1}`}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={test} className="card-img-top" alt="아몰랑" />
              <div className="card-body">
                <p className="card-text">dd</p>
              </div>
            </div>
          </li>
          <li className={`${style.li1}`}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={test} className="card-img-top" alt="dd" />
              <div className="card-body">
                <p className="card-text">dd</p>
              </div>
            </div>
          </li>
          <li className={`${style.li1}`}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={test} className="card-img-top" alt="아몰랑" />
              <div className="card-body">
                <p className="card-text">dd</p>
              </div>
            </div>
          </li>
          <li className={`${style.li1}`}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={test} className="card-img-top" alt="아몰랑" />
              <div className="card-body">
                <p className="card-text">dd</p>
              </div>
            </div>
          </li>
          <li className={`${style.li1}`}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={test} className="card-img-top" alt="아몰랑" />
              <div className="card-body">
                <p className="card-text">dd</p>
              </div>
            </div>
          </li>
          <li className={`${style.li1}`}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={test} className="card-img-top" alt="아몰랑" />
              <div className="card-body">
                <p className="card-text">dd</p>
              </div>
            </div>
          </li>
          <li className={`${style.li1}`}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={test} className="card-img-top" alt="아몰랑" />
              <div className="card-body">
                <p className="card-text">dd</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectMain;
