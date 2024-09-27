import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertDialog } from "./AlertDialog";
import ProjectDetail from "./ProjectDetail";

interface Project {
    id: number;
    projectName: string;
    simpleIntro: string;
    participaint: number;
  }
  
  // 개별 프로젝트 항목 컴포넌트
const ProjectItem: React.FC<Project> = (
	{
	id,
	projectName,
	simpleIntro,
	participaint,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleModal = () => {
		setIsOpen(!isOpen);
		console.log(isOpen);
	};

	return (
	<div>
		<tr>
			<td>{id}</td>
			<td>{projectName}</td>
			<td>{simpleIntro}</td>
			<td>{participaint}</td>
		</tr>
		<button onClick={handleModal}>이거</button>
		<ProjectDetail
        open={isOpen}
        handleClose={handleModal}
        title="프로젝트 생성"
      />
	</div>
)};

export default ProjectItem;