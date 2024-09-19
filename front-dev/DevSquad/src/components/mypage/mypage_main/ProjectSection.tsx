import React from "react";
import style from "../styles/mypage_main/ProjectCard.module.css";
import ProjectCard from "./ProjectCard";

const projects = [
  { image: 'https://via.placeholder.com/200', title: '프로젝트 1', content: '프론트엔드 개발' },
  { image: 'https://via.placeholder.com/200', title: '프로젝트 2', content: '백엔드 개발' },
  { image: 'https://via.placeholder.com/200', title: '프로젝트 3', content: '디자인' },
  { image: 'https://via.placeholder.com/200', title: '프로젝트 4', content: '전체 관리' },
];

const ProjectSection: React.FC = () => {
  return (
    <div className={style.projectContainer}>
      {projects.map((project, index) => (
        <ProjectCard 
          key={index} 
          image={project.image} 
          title={project.title} 
          content={project.content} 
        />
      ))}
    </div>
  );
};

export default ProjectSection;
