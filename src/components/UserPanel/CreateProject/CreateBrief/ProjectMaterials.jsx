import React, { useState } from "react";
import SupportingMaterial from "../SupportingMaterial";
import { useSelector } from "react-redux";
import SupportiveMaterials from "./SupportiveMaterials";
import ExpandInputTitle from "../ExpandInputTitle";

const ProjectMaterials = ({ save, isLoading, projectData }) => {
  const { activeBrif } = useSelector((state) => state.project);
  const [editing, setEditing] = useState(false);
  return activeBrif === "materials" ? (
    <SupportingMaterial
      save={save}
      isLoading={isLoading}
      projectData={projectData}
      editing={editing}
      setEditing={setEditing}
    />
  ) : editing ? (
    <SupportingMaterial
      save={save}
      isLoading={isLoading}
      projectData={projectData}
      editing={editing}
      setEditing={setEditing}
    />
  ) : projectData?.supportiveMaterials.length > 0 ? (
    <SupportiveMaterials
      data={projectData.supportiveMaterials}
      setEditing={setEditing}
    />
  ) : (
    <ExpandInputTitle title={"Supporting Materials"} />
  );
};

export default ProjectMaterials;
