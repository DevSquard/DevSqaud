import { Link } from 'react-router-dom';
import cardImg from '../../assets/recruit.jpg';
import style from './styles/RecruitBox.module.css';

export default function RecruitBox() {
  return (
    <div className={style.container}>
      <div className={style.textBox}>
        <h4 className={style.contentHeader}>프로젝트 개설</h4>
        <p className={style.contentText}>최고의 팀원을 모집하고, <br />성공적으로 프로젝트를 완성해보세요!</p>
        <div className={style.icons}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
        <Link to="/project"> {/* 프로젝트 만들기 폼으로 이동(수정필요 240902) */}
          <button className={style.createButton}>프로젝트 만들기 &gt;</button>
        </Link>
      </div>
      <div className={style.imgBox}>
        <img className={style.imgContent} src={cardImg} alt="" />
      {/* <a href="https://kr.freepik.com/free-vector/project-word-concept_2453846.htm#fromView=search&page=1&position=21&uuid=c53f4054-b708-462c-ae8e-ee79e26f57ed">출처 freepik</a> */}
      </div>
    </div>
  );
};
  