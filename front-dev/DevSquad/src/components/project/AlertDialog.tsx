import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import { apiAxios } from "../../apis/apiAxios";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { IsProjectModalOpen } from "../../recoil/IsProjectModalOpen";
import style from "./AlertDialog.module.css";


interface IDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
}

interface ProjectForm {
    projectName: string;
    simpleIntro: string;
    description: string;
    devStack: string;
    participaint: number;
    startedAt: string;
    endedAt: string;
}

export const AlertDialog: React.FC<IDialogProps> = ({
    open,
    handleClose,
    title,
  }) => {
    const [projectInput, setProjectInput] = useState<ProjectForm>({
      projectName: "",
      simpleIntro: "",
      description: "",
      devStack: "",
      participaint: 0,
      startedAt: "",
      endedAt: "",
    });
    const [isOpen, setIsOpen] = useRecoilState(IsProjectModalOpen);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setProjectInput((pre: ProjectForm) => ({
        ...pre,
        [name]: value,
      }));
      console.log(projectInput);
    };
  
    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        const res = await apiAxios.post("/project/create", projectInput);
        console.log(res.data);
  
        if (res.data && res.status === 201) {
          setIsOpen(!isOpen);
        } else if (!res.data) {
          alert("잘못된 접근");
        }
      } catch (error) {}
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText className={style.inputBox}>
            <input
              type="text"
              name="projectName"
              onChange={handleChange}
              placeholder="프로젝트명"
            />
            <input
              type="text"
              name="simpleIntro"
              onChange={handleChange}
              placeholder="간략한 소개글"
            />
            <input
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="프로젝트 설명글"
            />
            <input
              type="text"
              name="devStack"
              onChange={handleChange}
              placeholder=""
            />
            <input
              type="number"
              name="participaint"
              onChange={handleChange}
              placeholder="참여 제한 인원"
            />
            <input
              type="date"
              name="startedAt"
              onChange={handleChange}
              placeholder="프로젝트 모집 시작일"
            />
            <input
              type="date"
              name="endedAt"
              onChange={handleChange}
              placeholder="프로젝트 모집 종료일"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>작성</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };