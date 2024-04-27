import React from "react";
import imgOne from "../../../../assets/editor_panel/profile_profile.svg";
import { DateConverter } from "../../../../utils/converter";
import { useUpdateProjectMutation } from "../../../../features/project/projectApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const BriefHeader = ({
  selectedProject,
  setModalPopup,
  handleSubmitVideo,
  loading,
  file,
}) => {
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const { user } = useSelector((state) => state.auth);
  const handeAccepteJob = async (status) => {
    try {
      const formdata = {
        projectId: selectedProject?._id,
        editor: user?._id,
        status: status,
      };
      const res = await updateProject(formdata);

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
        setModalPopup(false);
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
    <div className="modal_header border-b border-b-black/10 p-6 flex justify-between items-center">
      <div className="project_info flex gap-3">
        <div className="left w-[48px] h-[48px] rounded-full">
          <img
            src={
              selectedProject?.creator.image
                ? selectedProject?.creator.image
                : imgOne
            }
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="right">
          <h2 className="text-slate-900 text-lg font-semibold flex gap-3 items-center">
            {selectedProject?.creator.name}
            {selectedProject?.status === "Pending" ? (
              <span className="bg-red-500 rounded-md text-white py-[2px] px-[6px] text-xs font-semibold">
                New Project
              </span>
            ) : (
              <span className="bg-orange-500 rounded-md text-white py-[2px] px-[6px] text-xs font-semibold">
                {selectedProject?.status}
              </span>
            )}
          </h2>
          <p className="text-slate-600 text-sm font-normal">
            Created {DateConverter(selectedProject?.createdAt)}
          </p>
        </div>
      </div>
      <div className="project_action flex gap-3">
        {selectedProject?.status === "Pending" ? (
          <>
            <button
              // onClick={() => setModalPopup(false)}
              onClick={() => handeAccepteJob("Decline")}
              className="text-base font-semibold text-red-600 border border-red-600 py-3 px-6 rounded-full"
            >
              Decline Job
            </button>
            <button
              onClick={() => handeAccepteJob("accepted")}
              disabled={isLoading}
              className="text-base font-semibold text-white bg-indigo-600 border border-indigo-600 py-3 px-6 rounded-full"
            >
              {isLoading ? "Accepting..." : "Accept Job"}
            </button>
          </>
        ) : (
          <button
            disabled={loading || !file}
            onClick={handleSubmitVideo}
            className={`text-base font-semibold text-white bg-indigo-600 border border-indigo-600 py-3 px-6 rounded-full ${
              selectedProject?.status === "Exported" && "hidden"
            }`}
          >
            {loading ? "Submiting..." : "Submit Project"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BriefHeader;
