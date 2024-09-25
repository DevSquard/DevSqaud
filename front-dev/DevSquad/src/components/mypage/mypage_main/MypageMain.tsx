import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import style from "../styles/mypage_main/MypageMain.module.css";
import ProjectSection from "./ProjectSection";
import { apiAxios } from "../../../apis/apiAxios";

interface Profile {
  nickname: string;
  language: string;
  intro: string;
  streakCount: number;
  streakDaysInMonth: null;
}

export default function () {
  const [profileForm, setProfileForm] = useState<Profile>({
    nickname: "",
    language: "",
    intro: "",
    streakCount: 0,
    streakDaysInMonth: null,
  });

  const handleProfile = async () => {
    const res = await apiAxios.get("/devsquad/mypage/2");
    setProfileForm({
      nickname: res.data.nickName || "",
      language: res.data.language || "",
      intro: res.data.intro || "",
      streakCount: res.data.streakCount || 0,
      streakDaysInMonth: res.data.streakDaysInMonth || 0,
    });
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div className={style.container}>
      <ProfileCard
        nickname={profileForm.nickname}
        language={profileForm.language}
        streakCount={profileForm.streakCount}
        mannerTemperature={profileForm.streakCount}
      />
      <ProjectSection />
    </div>
  );
}
