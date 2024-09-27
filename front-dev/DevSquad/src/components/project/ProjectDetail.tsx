
import ProjectForm from "../mypage/mypage_main/ProjectForm";
import { AlertDialog } from "./AlertDialog";
import ProjectItem from "./ProjectItem";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

interface IDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
}

interface DetailForm {
	projectName: string;
	simpleIntro: string;
	description: string;
	devStack: string;
	participaint: number;
	startedAt: string;
	endedAt: string;
}

export default function ProjectDetail() {
	
	return (
		<>
			<Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
            <text></text>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
		</>
	);
};