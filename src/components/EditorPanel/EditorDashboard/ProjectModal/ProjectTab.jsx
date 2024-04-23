import React from "react";
import { projectTab } from "../../../../utils/data";

const ProjectTab = ({ step, setStep, selectedProject }) => {
  console.log(projectTab, "projectTab");
  return (
    <div className="flex items-center gap-3 mb-6 ">
      {projectTab.map((data, index) => (
        <button
          onClick={() => setStep(data.name)}
          className={`${
            step === data.name
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-gray-900"
          } ${
            selectedProject?.status === "Pending" &&
            data.name === "Submit Video"
              ? "hidden"
              : "flex"
          }   rounded-[40px] py-2 px-4 flex items-center gap-2  text-xs font-semibold`}
          key={index}
        >
          {data.icon}
          {data.name}
        </button>
      ))}
    </div>
  );
};

export default ProjectTab;
