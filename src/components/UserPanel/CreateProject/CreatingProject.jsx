import React from "react";
import created from "../../../assets/project-created.svg";
import { useDispatch } from "react-redux";
import {
  setActiveBrif,
  setProjectId,
  setShowCreateModal,
  setStep,
} from "../../../features/project/projectSlice";

const CreatingProject = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setProjectId(undefined));
    dispatch(setStep(0));
    dispatch(setActiveBrif(undefined));
    dispatch(setShowCreateModal(false));
  };
  return (
    <div className="min-h-[90vh] h-full flex flex-col items-center justify-center">
      <img className="mb-10" src={created} alt="" />
      <p className="text-4xl font-bold mb-3">New Project Created!</p>
      <p className="max-w-[768px] text-center text-lg font-normal text-slate-500 mb-6">
        Go to your project files to see all of the details of the project to
        seamlessly to build new videos to grow your business on social media
        platforms.
      </p>

      <a
        href="#"
        onClick={handleClick}
        className="border border-indigo-600 bg-indigo-600 rounded-full py-3 px-6 f text-white text-base font-semibold"
      >
        Go to Home
      </a>
    </div>
  );
};

export default CreatingProject;
