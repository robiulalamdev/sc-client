import React, { useRef, useState } from "react";
import {
  ArrowUp,
  CaretRight,
  CaretUp,
  CaretUpDown,
  FileText,
  PuzzlePiece,
  Question,
} from "@phosphor-icons/react";
import useOutsideClick from "../hooks/useOutsideClick";
import imgOne from "../assets/editor_panel/profile_profile.svg";
import { addOns } from "../utils/data";

import uploadVideo from "../assets/editor_panel/upload_video.svg";
import { Link } from "react-router-dom";
import { DateConverter } from "../utils/converter";
import { useUpdateProjectMutation } from "../features/project/projectApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
const SubmitProjectModal = ({
  setModalPopup,
  setSelectedProject,
  selectedProject,
}) => {
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const { user } = useSelector((state) => state.auth);

  const submitModal = useRef();

  const [showFullText, setShowFullText] = useState(false);

  const truncateText = (text) => {
    const words = text?.split(" ");
    if (words.length > 110) {
      return words.slice(0, 110).join(" ") + "...";
    }
    return text;
  };

  useOutsideClick(submitModal, () => {
    setModalPopup(false);
    setSelectedProject(null);
  });

  const filteredAddons = addOns.filter((j) =>
    selectedProject?.addOns.find((i) => i.name === j.title)
  );

  const handeAccepteJob = async () => {
    try {
      const formdata = { projectId: selectedProject?._id, editor: user?._id };
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

  const [file, setFile] = useState();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
      "video/mov": [".mov"],
    },
    onDrop: (acceptedFiles) => {
      const upload = async () => {
        setFile(acceptedFiles[0]);
      };

      upload();
    },
    multiple: false,
  });

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm">
      <div className="flex justify-center items-center h-screen">
        <div
          ref={submitModal}
          className="w-[1150px] bg-white rounded-3xl overflow-y-scroll no_scrollbar"
        >
          <div className="modal_header border-b border-b-black/10 p-6 flex justify-between items-center">
            <div className="project_info flex gap-3">
              <div className="left">
                <img src={imgOne} alt="profile" />
              </div>
              <div className="right">
                <h2 className="text-slate-900 text-lg font-semibold flex gap-3 items-center">
                  {selectedProject?.projectTitle}
                  <span className="bg-red-500 rounded-md text-white py-[2px] px-[6px] text-xs font-semibold">
                    New Project
                  </span>
                </h2>
                <p className="text-slate-600 text-sm font-normal">
                  Created {DateConverter(selectedProject?.createdAt)}
                </p>
              </div>
            </div>
            <div className="project_action flex gap-3">
              <button
                onClick={handeAccepteJob}
                disabled={isLoading}
                className="text-base font-semibold text-white bg-indigo-600 border border-indigo-600 py-3 px-6 rounded-full"
              >
                {isLoading ? "Accepting..." : "Submit Project"}
              </button>
            </div>
          </div>
          <div className="modal_description p-10 h-[640px]">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-7">
                <div className="submit_video_wrapper pb-10">
                  <div className="section_head pb-4">
                    <h2 className="text-slate-900 text-lg font-semibold flex items-center gap-2">
                      <FileText size={24} className="text-indigo-600" />
                      Submit Video
                    </h2>
                  </div>
                  <div className="submit_video outline-1 outline-dashed outline-slate-200  rounded-3xl">
                    <div className="upoload_video py-12 px-6 flex justify-center items-center flex-col border-b border-dashed">
                      <div {...getRootProps()}>
                        {/* {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt="thumbnail"
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                            }}
                          />
                        ) : (
                          <img src={uploadVideo} alt="icon" />
                        )} */}
                        <input
                          id="fileInput"
                          type="file"
                          {...getInputProps()}
                          // style={{ display: "none" }}
                        />
                      </div>
                      {file ? (
                        <div>
                          <p className="text-sm font-semibold text-slate-900 pb-1">
                            File uploaded: {file.name}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-sm font-semibold text-slate-900 pb-1">
                            Upload a File or{" "}
                            <Link to="#" className="text-indigo-600 ml-1">
                              Paste URL
                            </Link>
                          </p>
                          <p className="text-sm text-normal text-slate-500">
                            Click to browse or drag & drop a file here
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="previous_veriosn py-6 px-4">
                      <div className="section_head pb-4 flex justify-between items-center">
                        <h2 className="text-slate-900 text-lg font-semibold flex items-center gap-2">
                          Previous Versions
                        </h2>

                        <Link className="text-sm font-semibold text-indigo-600 flex items-center gap-1">
                          See All
                          <CaretRight
                            size={16}
                            className="text-sm font-semibold"
                            weight="bold"
                          />
                        </Link>
                      </div>
                      <div className="previous_video flex gap-4">
                        <div className="video_item">
                          <div className="video_img relative">
                            <img src={uploadVideo} alt="video" />
                            <p className="text-white font-xs font-semibold bg-slate-900 inline rounded-md px-1 absolute bottom-2 left-2">
                              03:45
                            </p>
                          </div>
                        </div>
                        <div className="video_item">
                          <div className="video_img relative">
                            <img src={uploadVideo} alt="video" />
                            <p className="text-white font-xs font-semibold bg-slate-900 inline rounded-md px-1 absolute bottom-2 left-2">
                              03:45
                            </p>
                          </div>
                        </div>
                        <div className="video_item">
                          <div className="video_img relative">
                            <img src={uploadVideo} alt="video" />
                            <p className="text-white font-xs font-semibold bg-slate-900 inline rounded-md px-1 absolute bottom-2 left-2">
                              03:45
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project_brief_wrapper pb-10">
                  <div className="section_head pb-4">
                    <h2 className="text-slate-900 text-lg font-semibold flex items-center gap-2">
                      <FileText
                        size={24}
                        className="text-indigo-600"
                        weight="bold"
                      />
                      Project Brief
                    </h2>
                  </div>

                  <div className="border rounded-3xl mb-10">
                    <div
                      className={`p-6 ${
                        selectedProject?.description?.length > 100 && "border-b"
                      }`}
                    >
                      <p
                        className="text-slate-800 font-normal text-sm"
                        dangerouslySetInnerHTML={{
                          __html: showFullText
                            ? selectedProject?.description
                            : truncateText(selectedProject?.description),
                        }}
                      />
                    </div>
                    {selectedProject?.description?.length > 110 && (
                      <button
                        className="flex gap-2 items-center justify-center w-full text-sm p-4 font-semibold text-indigo-600"
                        onClick={() => setShowFullText(!showFullText)}
                      >
                        {showFullText ? (
                          <>
                            Show Less <CaretUp size={20} weight="bold" />
                          </>
                        ) : (
                          <>
                            Show More <CaretUpDown size={20} weight="bold" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="addons_wrapper pb-10">
                  <div className="section_head pb-4">
                    <h2 className="text-slate-900 text-lg font-semibold flex items-center gap-2">
                      <PuzzlePiece
                        size={24}
                        className="text-indigo-600"
                        weight="bold"
                      />
                      Add-Ons
                    </h2>
                  </div>

                  <div className="addons_items_wrapper border border-slate-200 rounded-3xl">
                    {filteredAddons.map((i, idx) => (
                      <div
                        key={idx}
                        className="addons_items p-4 border-b border-b-slate-100 flex items-center justify-between"
                      >
                        <div className="addons_items_left flex gap-4 items-center">
                          <div className="addons_items_img w-[44px] h-[44px] rounded-full">
                            <img
                              src={i.pic}
                              alt="icon"
                              className="w-full h-full rounded-full object-contain"
                            />
                          </div>
                          <div className="addons_items_title">
                            <h2 className="text-base font-semibold text-slate-800">
                              {i.title}
                            </h2>
                            <p className="text-slate-500 text-xs font-normal">
                              {i.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="addons_items_right">
                          <h3 className="text-base font-semibold text-slate-800">
                            {i.credit} credits
                          </h3>
                        </div>
                      </div>
                    ))}

                    <div className="addons_items p-4 flex items-center justify-between">
                      <div className="addons_items_left">
                        <div className="addons_items_title">
                          <h2 className="text-base font-normal text-slate-900">
                            Total Project Cost:{" "}
                            <span className="font-bold">
                              {filteredAddons.reduce(
                                (total, current) => total + current.credit,
                                0
                              )}{" "}
                              Credit
                            </span>
                          </h2>
                        </div>
                      </div>
                      <div className="addons_items_right">
                        <Link
                          to={""}
                          className="text-sm font-semibold text-indigo-600"
                        >
                          Request Credit Change
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-5">
                <div className="ask_question">
                  <div className="section_head pb-4">
                    <h2 className="text-slate-900 text-lg font-semibold flex items-center gap-2">
                      <Question
                        size={24}
                        className="text-indigo-600"
                        weight="bold"
                      />
                      Ask Question
                    </h2>
                  </div>

                  <div className="ask_question_chat bg-slate-100 rounded-3xl p-6 flex flex-col justify-end min-h-[530px] h-full">
                    <div className="suggestions pb-6">
                      <p className="text-xs font-semibold text-slate-900 uppercase pb-3">
                        SUGGESTIONS
                      </p>
                      <p className="text-indigo-950 text-sm font-normal bg-indigo-100 rounded-xl py-2 px-4 max-w-64 w-full mb-3">
                        Are there any specific deadlines or turnaround times the
                        client requires for the completed edited video?
                      </p>
                      <p className="text-indigo-950 text-sm font-normal bg-indigo-100 rounded-xl py-2 px-4 max-w-52 w-full mb-3">
                        How do you think the editing process for feedback and
                        revisions?
                      </p>
                    </div>

                    <div className="input_suggestions">
                      <div className="input_filed relative">
                        <input
                          type="text"
                          className="py-3 px-4 rounded-xl bg-white w-full placeholder:text-sm placeholder:font-normal placeholder:text-slate-400"
                          placeholder="Ask anything..."
                        />
                        <button className="py-2 px-2 bg-indigo-600 rounded-xl absolute right-2 top-1/2 -translate-y-1/2">
                          <ArrowUp
                            size={20}
                            className="text-white font-bold"
                            weight="bold"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitProjectModal;
