import Login from '../components/landing-page/Login';
import style from './styles/MainPage.module.css';
import StackCard from '../components/common/StackCard';
import RecruitBox from '../components/landing-page/RecruitBox';

const MainPage = () => {
    return (
        <div className={style.container}>
            <div className={style.mainContent}>
                <Login />
                <div className={style.cardBox}>
                    <StackCard titleText="시험 글1입니다."/>
                    <StackCard titleText="시험 글2입니다."/>
                    <StackCard titleText="시험 글3입니다."/>
                </div>
                <div className={style.projectRecruitContainer}>
                    <p className={style.subHeading}>팀 프로젝트를 개설하고 참여하세요!</p>
                    <p className={style.heading}>DevSquard</p>
                    <div className={style.recruitBox}>
                        <RecruitBox />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
