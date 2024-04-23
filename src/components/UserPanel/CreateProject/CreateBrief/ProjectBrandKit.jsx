import React, { useState } from "react";
import { useSelector } from "react-redux";
import SelectBrand from "../SelectBrand";
import ProjectBrandInfo from "./ProjectBrandInfo";
import ExpandInputTitle from "../ExpandInputTitle";

const ProjectBrandKit = ({ save, isLoading, projectData }) => {
  const { activeBrif } = useSelector((state) => state.project);
  const [editing, setEditing] = useState(false);
  return activeBrif === "brandKit" ? (
    <SelectBrand
      save={save}
      isLoading={isLoading}
      projectData={projectData}
      setEditing={setEditing}
    />
  ) : editing ? (
    <SelectBrand
      save={save}
      isLoading={isLoading}
      projectData={projectData}
      editing={editing}
      setEditing={setEditing}
    />
  ) : projectData?.brandKit ? (
    <ProjectBrandInfo brandKit={projectData.brandKit} setEditing={setEditing} />
  ) : (
    <ExpandInputTitle title={"Select Brand Kit"} />
  );
};

export default ProjectBrandKit;
