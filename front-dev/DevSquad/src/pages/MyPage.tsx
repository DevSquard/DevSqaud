import { Route, Routes } from "react-router-dom";
import SideBar from "../components/mypage/SideBar";
import MypageMain from "../components/mypage/mypage_main/MypageMain";
import MypageActivities from "../components/mypage/mypage_activities/MypageActivities";
import MypageEdit from "../components/mypage/mypage_edit/MypageEdit";

const MyPage = () => {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/" element={<MypageMain />} />
        <Route path="/edit" element={<MypageEdit />} />
        <Route path="/activities" element={<MypageActivities />} />
      </Routes>
    </>
  );
};

export default MyPage;
