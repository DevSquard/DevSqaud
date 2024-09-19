import React, { useState } from "react"
import style from "../styles/mypage_main/ProfileCard.module.css"

interface ProfileCardEditProps {
    nickname: string
    language: string
    mannerTemperature: number
    update: (updateProfile: {nickname: string, language: string}) => void
}

const ProfileCardEdit: React.FC<ProfileCardEditProps> = ({ nickname, language, mannerTemperature, update }) => {
    const [editNickName, setEditNickName] = useState(nickname)
    const [editLanguage, setEditLanguage] = useState(language)

    const handleSave = () => {
        update({nickname: editNickName, language: editLanguage})
    }
    return (
        <div className={style.profileCard}>
            <div className={style.profileHeader}>
                <img
                    src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Frecommend-works%2Fpng-clipart%2F20240614%2Fourlarge%2Fpngtree-chat-bubbles-talking-dialogue-quotes-png-image_12744383.png&type=a340"
                    alt="User profile"
                    className={style.profileImage}
                />
                <div className={style.profileInfo}>
                    <input
                        type="text"
                        value={editNickName}
                        onChange={(e) => setEditNickName(e.target.value)}
                        className={style.input}
                    />
                      <input
                        type="text"
                        value={editLanguage}
                        onChange={(e) => setEditLanguage(e.target.value)}
                        className={style.input}
                    />
                </div>
                <div className={style.mannerTemperature}>{mannerTemperature}°C</div>
            </div>
            <button onClick={handleSave} className={style.saveButton}>저장</button>
        </div>
        
    )
}
export default ProfileCardEdit