import { useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const ProjectForm = () => {
  const getProject = async () => {
    try {
      const res = await axios.get("http://localhost:5713");
      const data = res.data;
      setValue("projectName", data.projectName);
      setValue("description", data.fescription);
      setValue("simpleIntro", data.simpleIntro);
      setValue("participant", data.participant);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (projectId) {
      getProject();
    }
  }, []);
  const submit = async () => {
    const formData = new FormData();
  };

  return (
    <>
      <form onSubmit={submit}></form>
    </>
  );
};
export default ProjectForm;
