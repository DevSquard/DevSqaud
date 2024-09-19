import { Route, Routes } from "react-router-dom";
import ProjectMain from "../components/project/ProjectMain";
import SearchPeople from "../components/project/SearchPeople";

const ProjectPage = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectMain />} />
      <Route path="/search" element={<SearchPeople />} />
    </Routes>
  );
};

export default ProjectPage;
