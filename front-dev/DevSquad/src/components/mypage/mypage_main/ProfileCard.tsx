import React from "react";
import style from "../styles/mypage_main/ProfileCard.module.css";

// ProfileCard 컴포넌트 props 타입
interface ProfileCardProps {
  nickname: string;
  language: string;
  streakCount: number;
  mannerTemperature: number;
}
// ProfileCard 컴포넌트
const ProfileCard: React.FC<ProfileCardProps> = ({
  nickname,
  language,
  streakCount,
  mannerTemperature,
}) => {
  // streakCount streak div 생성
  const createStreaks = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className={style.streak}></div>
    ));
  };

  return (
    <div className={style.profileCard}>
      <div className={style.profileHeader}>
        <img
          src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Frecommend-works%2Fpng-clipart%2F20240614%2Fourlarge%2Fpngtree-chat-bubbles-talking-dialogue-quotes-png-image_12744383.png&type=a340"
          alt="User profile"
          className={style.profileImage}
        />
        <div className={style.profileInfo}>
          <h2 className={style.nickname}>{nickname}</h2>
          <p className={style.language}>사용 언어: {language}</p>
          <div className={style.streaksContainer}>
            {createStreaks(streakCount)}
          </div>
        </div>
        <div className={style.mannerTemperature}>{mannerTemperature}°C</div>
      </div>
    </div>
  );
};
export default ProfileCard;
