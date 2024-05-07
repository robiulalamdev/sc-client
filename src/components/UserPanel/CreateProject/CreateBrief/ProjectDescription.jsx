import React, { useState } from "react";
import FromLabel from "../FromLabel";
import ExpandInputTitle from "../ExpandInputTitle";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBrif } from "../../../../features/project/projectSlice";
import Swal from "sweetalert2";

const ProjectDescription = ({ save, isLoading, projectData }) => {
  const { activeBrif } = useSelector((state) => state.project);
  const [editing, setEditing] = useState(false);
  const [inputData, setInputData] = useState({});
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleContinue = async (activeBrif) => {
    try {
      const res = await save({ ...inputData, projectId: projectData?._id });
      // console.log(res, "resss");
      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        // push("/dashboard");

        setEditing(false);
        activeBrif && dispatch(setActiveBrif(activeBrif));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  return activeBrif === "description" ? (
    <div className="border rounded-xl p-6 mb-6">
      <FromLabel
        title="Tell us more about your project"
        subtitle="The more information you provide us, the easier it makes it to deliver a video"
      />
      <textarea
        className="brief_input mb-5"
        cols="30"
        rows="5"
        placeholder="Type Here..."
        name="description"
        onChange={handleInputChange}
      ></textarea>
      <button
        disabled={isLoading}
        className="primary_btn disabled:bg-indigo-300"
        onClick={() => handleContinue("materials")}
      >
        {isLoading ? "Saving..." : "Continue"}
      </button>
    </div>
  ) : editing ? (
    <div className="border rounded-xl p-6 mb-6">
      <FromLabel
        title="Tell us more about your project"
        subtitle="The more information you provide us, the easier it makes it to deliver a video"
      />
      <textarea
        className="brief_input mb-5"
        cols="30"
        rows="5"
        name="description"
        placeholder="Type Here..."
        defaultValue={projectData?.description}
        onChange={handleInputChange}
      ></textarea>
      <button
        disabled={isLoading}
        className="primary_btn disabled:bg-indigo-300"
        onClick={handleContinue}
      >
        {isLoading ? "Saving..." : "Continue"}
      </button>
    </div>
  ) : projectData?.description ? (
    <div className="border rounded-xl p-6 mb-6">
      <div className="mb-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold mb-1">More About Projects </p>{" "}
          <button
            onClick={() => setEditing(true)}
            className="py-1.5 px-4 border border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-50 transition-all duration-300 ease-in"
          >
            Change
          </button>
        </div>
        <p className="text-slate-500 font-normal">{projectData?.description}</p>
      </div>
    </div>
  ) : (
    <ExpandInputTitle title={"Tell us more about your project"} />
  );
};

export default ProjectDescription;
