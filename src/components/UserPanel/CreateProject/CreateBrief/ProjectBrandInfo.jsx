import React from "react";
import playIcon from "../../../../assets/created.svg";

const ProjectBrandInfo = ({ setEditing, brandKit }) => {
  return (
    <div className="border rounded-xl p-6 mb-6">
      <div className="mb-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold mb-1">Brand Kit </p>{" "}
          <button
            onClick={() => setEditing(true)}
            className="py-1.5 px-4 border border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-50 transition-all duration-300 ease-in"
          >
            Change
          </button>
        </div>
        <div className="flex items-center gap-6">

        <div className=" text-[#0F172A] text-[14px] font-[600] flex items-center gap-[8px]  bg-[#F1F5F9] p-[12px] rounded-[8px] border border-[#E2E8F0]">
          <div className="w-[24px] h-[24px] rounded-full">
            <img
              src={playIcon}
              alt=""
              className="w-full h-full rounded-full object-contain"
            />
          </div>
          <p>{brandKit}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBrandInfo;
