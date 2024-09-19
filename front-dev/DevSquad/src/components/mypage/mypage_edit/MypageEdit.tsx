import React, { useState } from "react";
import ProfileCardEdit from "./ProfileCardEdit";
import ProjectCardEdit from "./ProjectCardEdit";
import style from "../styles/mypage_main/MypageMain.module.css";

const MypageEdit: React.FC = () => {
  const [profile, setProfile] = useState({
    nickname: "김태환",
    language: "Java",
    mannerTemperature: 15,
  });

  const [projects, setProjects] = useState([
    { image: "https://via.placeholder.com/200", title: "프로젝트 1", content: "프론트엔드 개발" },
    { image: "https://via.placeholder.com/200", title: "프로젝트 2", content: "백엔드 개발" },
  ]);

  const handleProfileUpdate = (updatedProfile: { nickname: string; language: string }) => {
    setProfile(prevProfile => ({ ...prevProfile, ...updatedProfile }));
  };

  const handleProjectUpdate = (index: number, updatedProject: { image: string; title: string; content: string }) => {
    setProjects(prevProjects =>
      prevProjects.map((project, i) => (i === index ? updatedProject : project))
    );
  };

  const handleProjectDelete = (index: number) => {
    setProjects(prevProjects => prevProjects.filter((_, i) => i !== index));
  };

  return (
    <div className={style.container}>
      <ProfileCardEdit
        nickname={profile.nickname}
        language={profile.language}
        mannerTemperature={profile.mannerTemperature}
        update={handleProfileUpdate}
      />
      <div className={style.projectContainer}>
        {projects.map((project, index) => (
          <ProjectCardEdit
            key={index}
            image={project.image}
            title={project.title}
            content={project.content}
            update={(updatedProject) => handleProjectUpdate(index, updatedProject)}
            deleteProject={() => handleProjectDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MypageEdit;
