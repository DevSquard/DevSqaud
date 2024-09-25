import style from "./ProjectMain.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import test from "../../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// interface CardProps {
//   imageSrc: string;
//   altText: string;
//   text: string;
// }
interface Project {
  id: number;
  projectName: string;
  simpleIntro: string;
  participaint: number;
}
interface IDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
}

// 개별 프로젝트 항목 컴포넌트
const ProjectItem: React.FC<Project> = ({
  id,
  projectName,
  simpleIntro,
  participaint,
}) => (
  <tr>
    <td>{id}</td>
    <td>{projectName}</td>
    <td>{simpleIntro}</td>
    <td>{participaint}</td>
  </tr>
);

export const AlertDialog: React.FC<IDialogProps> = ({
  open,
  handleClose,
  title,
  content,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
const ProjectMain = () => {
  const handleAddProject = () => {
    AlertDialog;
  }

  const [project, setProject] = useState<Project[]>([]);
  const navigate =  useNavigate();
  return (
    <div className={`${style.container}`}>
      <div className={`${style.title}`}>전체 프로젝트</div>

      <div className={style.topbtn}>
        <span>
          <input type="checkbox" />
          출시 서비스만 보기
        </span>

        <button onClick={handleAddProject}>프로젝트 생성</button>
      </div>

      <ul>
        <li>
          {project.map((project) => (
            <ProjectItem
             key={project.id} 
             id={project.id}
             projectName={project.projectName}
             simpleIntro={project.simpleIntro}
             participaint={project.participaint} />
          ))}
        </li>
      </ul>

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
