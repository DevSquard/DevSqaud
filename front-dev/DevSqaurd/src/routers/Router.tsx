import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import MainPage from "../pages/MainPage";
import CommunityPage from "../pages/community/CommunityPage";
import ProjectPage from "../pages/ProjectPage";
import MyPage from "../pages/MyPage";
import PostDetail from "../components/community/PostDetail";

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
      
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage />} />

        {/* 프로젝트 페이지 */}
        <Route path="/project/*" element={<ProjectPage />}/>
        
        {/* 커뮤니티 페이지 */}
        <Route path="/community/*" element={<CommunityPage />}/>
        <Route path="/community/detail/:id" element={<PostDetail />} />

        {/* 마이 페이지 */}
        <Route path="/my-page/*" element={<MyPage />} />

      </Route>
    </Routes>
  );
}
