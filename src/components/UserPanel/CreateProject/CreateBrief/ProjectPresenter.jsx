import React, { useState } from "react";
import ExpandInputTitle from "../ExpandInputTitle";
import { useSelector } from "react-redux";
import AddPresenter from "../AddPresenter";

const ProjectPresenter = ({ save, isLoading, projectData }) => {
  const { activeBrif } = useSelector((state) => state.project);
  return activeBrif === "presenter" ? (
    <AddPresenter save={save} isLoading={isLoading} projectData={projectData} />
  ) : (
    //   ) : editing ? (
    //     <AspectRatio
    //       save={save}
    //       isLoading={isLoading}
    //       projectData={projectData}
    //       editing={editing}
    //       setEditing={setEditing}
    //     />
    //   ) : projectData?.aspectRatio ? (
    //     <ProjectRatioInfo
    //       aspectRatio={projectData.aspectRatio}
    //       setEditing={setEditing}
    //     />
    <ExpandInputTitle title={"Add Presenter"} />
  );
};

export default ProjectPresenter;
