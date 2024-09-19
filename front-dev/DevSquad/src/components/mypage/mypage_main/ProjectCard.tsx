import React from "react";
import style from "../styles/mypage_main/ProjectCard.module.css"

interface ProjectCardProps {
    image: string;
    title: string;
    content: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({image,title,content}) => {
    return (
        <div className={style.projectCard}>
            <img src={image} alt={title} className={style.projectImage} />
            <div className={style.projectDetails}>
                <h3 className={style.projectTitle}>{title}</h3>
                <p className={style.projectContent}>{content}</p>
            </div>
        </div>
    )
}
export default ProjectCard;