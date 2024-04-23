import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpandInputTitle from "../ExpandInputTitle";
import AspectRatio from "../AspectRatio";
import ProjectRatioInfo from "./ProjectRatioInfo";

const ProjectRatio = ({ save, isLoading, projectData }) => {
  const { activeBrif } = useSelector((state) => state.project);
  const [editing, setEditing] = useState(false);
  return activeBrif === "ratio" ? (
    <AspectRatio
      save={save}
      isLoading={isLoading}
      projectData={projectData}
      setEditing={setEditing}
    />
  ) : editing ? (
    <AspectRatio
      save={save}
      isLoading={isLoading}
      projectData={projectData}
      editing={editing}
      setEditing={setEditing}
    />
  ) : projectData?.aspectRatio ? (
    <ProjectRatioInfo
      aspectRatio={projectData.aspectRatio}
      setEditing={setEditing}
    />
  ) : (
    <ExpandInputTitle title={"Aspect Ratio"} />
  );
};

export default ProjectRatio;
