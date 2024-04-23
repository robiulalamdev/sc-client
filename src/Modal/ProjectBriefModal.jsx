import React, { useRef, useState } from "react";
import BriefHeader from "../components/EditorPanel/EditorDashboard/ProjectModal/BriefHeader";
import ProjectTab from "../components/EditorPanel/EditorDashboard/ProjectModal/ProjectTab";
import VideoFiles from "../components/EditorPanel/EditorDashboard/ProjectModal/VideoFiles";
import ProjectBrief from "../components/EditorPanel/EditorDashboard/ProjectModal/ProjectBrief";
import BrandKit from "../components/EditorPanel/EditorDashboard/ProjectModal/BrandKit";
import useOutsideClick from "../hooks/useOutsideClick";
import VideoComments from "../components/UserPanel/AllVideos/VideoDetails/VideoComments";
import SubmitVideo from "../components/EditorPanel/EditorDashboard/ProjectModal/SubmitVideo";
import * as tus from "tus-js-client";
import { BASE_API_URL } from "../config/config";
import axios from "axios";
import Swal from "sweetalert2";
import { useUpdateProjectMutation } from "../features/project/projectApi";

const ProjectBriefModal = ({
  handlePopup,
  setModalPopup,
  setSelectedProject,
  selectedProject,
}) => {
  const [step, setStep] = useState("Video Files");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(null);

  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const handleSubmitVideo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_API_URL}/v1/vimeo/create-video-instant`, {
        method: "POST",
        body: JSON.stringify({ size: file.size }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      const { upload_link } = result.data;

      const tusUpload = new tus.Upload(file, {
        endpoint: upload_link,
        uploadUrl: upload_link,
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);

          console.log(`${percentage}% uploaded`);
          // setUploadProgress(percentage);
        },

        onError: (error) => {
          console.error("Failed to upload", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error?.message}`,
          });
        },

        onSuccess: async () => {
          // ---- saving data on database ----//

          const formData = {
            title: file?.name,
            size: file?.size,
            path: result.data.player_embed_url,
            projectId: selectedProject?._id,
            submitVideo: true,
          };

          const uploadRes = await updateProject(formData);
          if (uploadRes?.error?.error) {
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${res?.error?.error}`,
            });
          }
          if (uploadRes?.error?.data?.message) {
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${uploadRes?.error?.data?.message}`,
            });
          }
          if (uploadRes?.data?.success) {
            setModalPopup(false);
            setFile(null);
            setLoading(false);
            Swal.fire({
              icon: "success",
              title: "Successful!",
              text: `${uploadRes?.data?.message}`,
            });
          }
        },
      });

      tusUpload.start();
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  const bodyRef = useRef();
  useOutsideClick(bodyRef, () => {
    setModalPopup(false);
    setSelectedProject(null);
  });

  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={bodyRef}
        className="max-w-[896px] max-h-[90vh]   w-full bg-white text-black rounded-2xl relative"
      >
        <BriefHeader
          handlePopup={handlePopup}
          selectedProject={selectedProject}
          setModalPopup={setModalPopup}
          handleSubmitVideo={handleSubmitVideo}
          file={file}
          loading={loading}
        />
        <div className="p-10 overflow-y-auto max-h-[70vh] no_scrollbar">
          <ProjectTab
            step={step}
            setStep={setStep}
            selectedProject={selectedProject}
          />
          {step === "Submit Video" && (
            <SubmitVideo
              selectedProject={selectedProject}
              setFile={setFile}
              file={file}
            />
          )}
          {step === "Video Files" && (
            <VideoFiles projectDetails={selectedProject} />
          )}
          {step === "Project Brief" && (
            <ProjectBrief selectedProject={selectedProject} />
          )}
          {step === "Brand Kit" && (
            <BrandKit selectedProject={selectedProject} />
          )}
          {step === "Ask Questions" && <VideoComments data={selectedProject} />}
        </div>
        <div className="absolute bg-white w-full -bottom-10 rounded-b-2xl  border-t flex items-center justify-between py-6 px-10 ">
          <p className="text-base font-normal">
            Total Project Cost:{" "}
            <span className="font-bold">
              {" "}
              {selectedProject?.totalCredit} Credit
            </span>
          </p>
          <p className="text-indigo-600 text-sm font-semibold">
            Request Credit Change
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectBriefModal;
