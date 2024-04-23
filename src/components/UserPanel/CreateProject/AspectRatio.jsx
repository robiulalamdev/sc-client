import React, { useState } from "react";
import FromLabel from "./FromLabel";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { aspectRatio } from "../../../utils/data";
import Swal from "sweetalert2";
import { setActiveBrif } from "../../../features/project/projectSlice";
import { useDispatch } from "react-redux";

const AspectRatio = ({ save, isLoading, projectData, editing, setEditing }) => {
  const [selectedRatio, setSelectedRatio] = useState(
    projectData?.aspectRatio ? projectData?.aspectRatio : null
  );

  const dispatch = useDispatch();

  const handleInputChange = (name) => {
    setSelectedRatio(name);
  };

  const isChecked = (name) => {
    return selectedRatio === name;
  };

  const handleContinue = async (activeBrif) => {
    try {
      const res = await save({
        projectId: projectData?._id,
        aspectRatio: selectedRatio,
      });

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

        !editing && activeBrif && dispatch(setActiveBrif(activeBrif));
        setEditing(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };
  return (
    <div className="border rounded-xl p-6 mb-6">
      <div className="flex gap-4 justify-between items-start mb-6">
        <FromLabel
          title="Aspect Ratio"
          subtitle="Select the main size for your video"
        />
        <div className="flex items-center gap-1 text-xs font-medium">
          <p className="text-slate-500">Need Help?</p>
          <Link className="text-indigo-600 flex items-center gap-1" to="#">
            See Guide <ArrowUpRight size={12} weight="bold" />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {aspectRatio.length > 0 &&
          aspectRatio.map((data, index) => (
            <label
              htmlFor={data.name}
              className={`${
                isChecked(`${data.ratio} ${data.name}`)
                  ? "border-indigo-600"
                  : "border-slate-200"
              } border text-center rounded-xl p-2 w-[120px] h-[124px] text-sm font-semibold`}
              key={index}
            >
              <div className="text-end">
                <input
                  id={data.name}
                  type="radio"
                  name="ratio"
                  value={data.name}
                  onChange={() => {
                    handleInputChange(`${data.ratio} ${data.name}`);
                  }}
                />
              </div>

              <img className="m-auto" src={data.pic} alt="" />
              <p className="mt-2">{data.ratio}</p>
              <p>{data.name}</p>
            </label>
          ))}
        <label
          htmlFor="custom"
          className={`${
            isChecked("custom") ? "border-indigo-600" : "border-slate-200"
          } border text-center rounded-xl p-2 w-[120px] h-[124px] text-sm font-semibold`}
        >
          <div className="text-end">
            <input
              type="radio"
              id="custom"
              name="ratio"
              value="custom"
              onChange={() => handleInputChange("custom")}
            />
          </div>

          <p className="mb-5">Custom</p>
          <input
            className="brief_input"
            type="text"
            placeholder="Type Here"
            onChange={(e) => handleInputChange(e.target.value)}
            defaultValue={projectData?.aspectRatio}
          />
        </label>
      </div>
      <button
        disabled={!selectedRatio || isLoading}
        className="primary_btn disabled:bg-indigo-300 mt-6"
        onClick={() => handleContinue("presenter")}
      >
        {isLoading ? "Loading..." : "Continue"}
      </button>
    </div>
  );
};

export default AspectRatio;
