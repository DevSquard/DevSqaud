import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import MainPage from "../pages/MainPage";
import CommunityPage from "../pages/community/CommunityPage";
import ProjectPage from "../pages/ProjectPage";
import MyPage from "../pages/MyPage";
import PostDetail from "../components/community/PostDetail";
import PostForm from "../components/community/PostForm";
import GoogleLogin from "../components/oauth/GoogleLogin";


export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
      
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage />} />

        {/*  */}
        <Route path="/oauth/google" element={<GoogleLogin />} />

        {/* 프로젝트 페이지 */}
        <Route path="/project/*" element={<ProjectPage />}/>
        
        {/* 커뮤니티 페이지 */}
        <Route path="/community/*" element={<CommunityPage />}/>
        <Route path="/community/detail/:id" element={<PostDetail />} />
        <Route path="/community/write" element={<PostForm />} />

        {/* 마이 페이지 */}
        <Route path="/my-page/*" element={<MyPage />} />

        {/* 404 에러 페이지 */}
        <Route path="/*" element={<h1>아마 404</h1>} />

      </Route>
    </Routes>
  );
}
