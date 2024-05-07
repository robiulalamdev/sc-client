import React, { useEffect, useState } from "react";
import FromLabel from "../FromLabel";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setActiveBrif } from "../../../../features/project/projectSlice";

const ProjectType = ({ save, isLoading, projectData }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [inputData, setInputData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    if (name === "videoDuration") {
      const calcutateCredit =
        value === "under 5 mins"
          ? projectData?.totalCredit + 1
          : value === "under 10 mins"
          ? projectData?.totalCredit + 2
          : projectData?.totalCredit + 3;

      setInputData({
        ...inputData,
        totalCredit: calcutateCredit,
        videoDuration: value,
      });
    }
  };

  // console.log(inputData, "df");

  const handleContinue = async (activeBrif) => {
    try {
      const res = await save({ ...inputData, projectId: projectData?._id });
      console.log(res, "resss");
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

  return editing ? (
    <div className="border rounded-xl p-6 mb-6">
      <div className="mb-8">
        <FromLabel
          title="Project Title *"
          subtitle="eg. Sales Training Video"
        />
        <input
          className="brief_input"
          type="text"
          name="projectTitle"
          onChange={handleInputChange}
          defaultValue={projectData?.projectTitle}
        />
      </div>
      <div className="mb-8">
        <FromLabel
          title="Video Type *"
          subtitle="Choose the type of video you are interested in."
        />
        <select
          className="brief_input"
          name="videoType"
          onChange={handleInputChange}
        >
          <option selected disabled>
            Please Select
          </option>
          <option value="mp4" selected={projectData?.videoType === "mp4"}>
            MP4
          </option>
          <option value="mov" selected={projectData?.videoType === "mov"}>
            MOV
          </option>
        </select>
      </div>
      <div className="mb-8">
        <FromLabel
          title="Video Duration *"
          subtitle="Select the duration of the video that suits your preferences."
        />
        <select
          className="brief_input"
          name="videoDuration"
          onChange={handleInputChange}
        >
          <option selected disabled>
            Select video duration
          </option>
          <option
            value="under 5 mins"
            selected={projectData?.videoDuration === "under 5 mins"}
          >
            Under 5 mins - 1 Credit
          </option>
          <option
            value="under 10 mins"
            selected={projectData?.videoDuration === "under 10 mins"}
          >
            Under 10 mins - 2 Credit
          </option>
          <option
            value="under 15 mins"
            selected={projectData?.videoDuration === "Under 15 mins"}
          >
            Under 15 mins - 3 Credit
          </option>
        </select>
      </div>
      <button
        disabled={Object.keys(inputData).length === 0 || isLoading}
        className="primary_btn disabled:bg-indigo-300"
        onClick={handleContinue}
      >
        {isLoading ? "Saving..." : "Continue"}
      </button>
    </div>
  ) : projectData?.projectTitle ? (
    // &&
    //   projectData?.videoType &&
    //   projectData?.videoDuration
    <div className="border rounded-xl p-6 mb-6">
      <div className="flex justify-between items-start gap-6 ">
        <div>
          <p className="text-slate-500 text-sm font-normal mb-1">
            Project Title
          </p>

          <input
            className="w-full text-lg font-semibold mb-4"
            type="text"
            value={projectData?.projectTitle}
            readOnly
          />
          <p className="text-slate-500 text-sm font-normal mb-1">Video Type</p>

          <input
            className="w-full text-lg font-semibold"
            type="text"
            value={projectData?.videoType}
            readOnly
          />
        </div>
        <button
          onClick={() => setEditing(true)}
          className="py-1.5 px-4 border border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-50 transition-all duration-300 ease-in"
        >
          Change
        </button>
      </div>
    </div>
  ) : (
    <div className="border rounded-xl p-6 mb-6">
      <div className="mb-8">
        <FromLabel
          title="Project Title *"
          subtitle="eg. Sales Training Video"
        />
        <input
          className="brief_input"
          type="text"
          name="projectTitle"
          onChange={handleInputChange}
          defaultValue={projectData?.projectTitle}
        />
      </div>
      <div className="mb-8">
        <FromLabel
          title="Video Type *"
          subtitle="Choose the type of video you are interested in."
        />
        <select
          className="brief_input"
          name="videoType"
          onChange={handleInputChange}
        >
          <option selected disabled>
            Please Select
          </option>
          <option value="mp4">MP4</option>
          <option value="mov">MOV</option>
        </select>
      </div>
      <div className="mb-8">
        <FromLabel
          title="Video Duration *"
          subtitle="Select the duration of the video that suits your preferences."
        />
        <select
          className="brief_input"
          name="videoDuration"
          onChange={handleInputChange}
        >
          <option selected disabled>
            Select video duration
          </option>
          <option value="under 5 mins">Under 5 mins - 1 Credit</option>
          <option value="under 10 mins">Under 10 mins - 2 Credit</option>
          <option value="under 15 mins">Under 15 mins - 3 Credit</option>
        </select>
      </div>
      <button
        disabled={Object.keys(inputData).length === 0 || isLoading}
        className="primary_btn disabled:bg-indigo-300"
        onClick={() => handleContinue("description")}
      >
        {isLoading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
};

export default ProjectType;
