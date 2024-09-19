import React from "react";
import ProfileCard from "./ProfileCard";
import style from "../styles/mypage_main/MypageMain.module.css"
import ProjectSection from "./ProjectSection";

const MypageMain: React.FC = () => {
  return (
    <div className={style.container}>
      <ProfileCard 
        nickname="김태환" 
        language="java" 
        streakCount={30} 
        mannerTemperature={15} />
        <ProjectSection />
    </div>
  );
};

export default MypageMain;
