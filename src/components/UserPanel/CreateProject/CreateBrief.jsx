import React, { useState } from "react";
import FromLabel from "./FromLabel";
import ExpandInputTitle from "./ExpandInputTitle";
import { expandsDetails } from "../../../utils/data";
import {
  useAddProjectMutation,
  useGetProjectDetailsQuery,
  useUpdateProjectMutation,
} from "../../../features/project/projectApi";
import ProjectType from "./CreateBrief/ProjectType";
import { useSelector } from "react-redux";
import ProjectDescription from "./CreateBrief/ProjectDescription";
import ProjectMaterials from "./CreateBrief/ProjectMaterials";
import ProjectBrandKit from "./CreateBrief/ProjectBrandKit";
import ProjectRatio from "./CreateBrief/ProjectRatio";
import ProjectPresenter from "./CreateBrief/ProjectPresenter";

const CreateBrief = () => {
  const { projectId } = useSelector((state) => state.project);

  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  const { data } = useGetProjectDetailsQuery(projectId);

  return (
    <div className="max-w-[640px] w-full m-auto ">
      <div>
        <ProjectType
          save={updateProject}
          isLoading={updating}
          projectData={data}
        />

        <ProjectDescription
          save={updateProject}
          isLoading={updating}
          projectData={data}
        />
        <ProjectMaterials
          save={updateProject}
          isLoading={updating}
          projectData={data}
        />
        <ProjectBrandKit
          save={updateProject}
          isLoading={updating}
          projectData={data}
        />
        <ProjectRatio
          save={updateProject}
          isLoading={updating}
          projectData={data}
        />

        <ProjectPresenter
          save={updateProject}
          isLoading={updating}
          projectData={data}
        />

        {/* <div className="flex flex-col gap-6 items-center">
          {expandsDetails.map((data, index) => (
            <div className="w-full" key={index}>
              <div
                className="cursor-pointer"
                onClick={() => handleOpenItem(index)}
              >
                {!activeItems.includes(index) && (
                  <ExpandInputTitle title={data.title} />
                )}
              </div>
              {activeItems.includes(index) && <div>{data.component}</div>}
            </div>
          ))}
        </div> */}
        {/* <button onClick={() => setStep(2)} className=" primary_btn mt-6"> */}
        {/* <button className=" primary_btn mt-6">Save & Continue</button> */}
      </div>
    </div>
  );
};

export default CreateBrief;
