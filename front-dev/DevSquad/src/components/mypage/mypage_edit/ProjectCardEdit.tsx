import React, { useState } from "react";
import style from "../styles/mypage_edit/ProjectCardEdit.module.css";

interface ProjectCardEditProps {
  image: string;
  title: string;
  content: string;
  update: (updatedProject: { image: string; title: string; content: string }) => void;
  deleteProject: () => void;
}

const ProjectCardEdit: React.FC<ProjectCardEditProps> = ({
  image,
  title,
  content,
  update,
  deleteProject,
}) => {
  const [editMode, setEditMode] = useState(false); 
  const [editImage, setEditImage] = useState(image);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    update({ image: editImage, title: editTitle, content: editContent });
    setEditMode(false); 
  };

  return (
    <div className={style.projectCard}>
      {editMode ? (
        <>
          <input
            type="text"
            value={editImage}
            onChange={(e) => setEditImage(e.target.value)}
            className={style.projectInput}
            placeholder="이미지 URL"
          />
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={style.projectInput}
            placeholder="프로젝트 제목"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={style.projectTextarea}
            placeholder="프로젝트 내용"
          />
          <button onClick={handleSave} className={style.saveButton}>
            저장
          </button>
          <button onClick={() => setEditMode(false)} className={style.cancelButton}>
            취소
          </button>
        </>
      ) : (
        <>
          <img src={image} alt={title} className={style.projectImage} />
          <button onClick={() => setEditMode(true)} className={style.editButton}>
            수정
          </button>
          <div className={style.projectDetails}>
            <h3 className={style.projectTitle}>{title}</h3>
            <p className={style.projectContent}>{content}</p>
          </div>
          <button onClick={deleteProject} className={style.deleteButton}>
            삭제
          </button>
        </>
      )}
    </div>
  );
};

export default ProjectCardEdit;
