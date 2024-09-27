import style from "./ProjectMain.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import test from "../../assets/logo.png";
import { ChangeEvent, useEffect, useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { IsProjectModalOpen } from "../../recoil/IsProjectModalOpen";
import { AlertDialog } from "./AlertDialog";
import ProjectItem from "./ProjectItem";

interface Project {
  id: number;
  projectName: string;
  simpleIntro: string;
  participaint: number;
}

const ProjectMain = () => {
  const [isOpen, setIsOpen] = useRecoilState(IsProjectModalOpen);
  const [project, setProject] = useState<Project[]>([]);

  const navigate = useNavigate();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchProject = async () => {
      const exampleProject: Project[] = [
        {id : 1, projectName : "1", participaint : 3, simpleIntro : "a"},
      ];
      setProject(exampleProject);
    };
    fetchProject();
  }, []);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>전체 프로젝트</div>

      <div className={style.topbtn}>
        <span>
          <input type="checkbox" />
          출시 서비스만 보기
        </span>

        <button onClick={handleModal}>프로젝트 생성</button>
      </div>
      <div>
        <div className={`${style.common}`}>
          <table className={`${style.tags}`}>
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
                <p className="card-text">
                  {project.map((pro) => (
                    <ProjectItem
                      id={pro.id}
                      projectName={pro.projectName}
                      simpleIntro={pro.simpleIntro}
                      participaint={pro.participaint}
                    />
                  ))}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* AlertDialog 렌더링 */}
      <AlertDialog
        open={isOpen}
        handleClose={handleModal}
        title="프로젝트 생성"
      />
    </div>
  );
};

export default ProjectMain;
