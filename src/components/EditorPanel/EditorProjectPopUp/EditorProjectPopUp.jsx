/* eslint-disable react/prop-types */

import {
  ArrowUp,
  CaretDown,
  CaretRight,
  CaretUp,
  FileText,
  PuzzlePiece,
  Question,
} from "@phosphor-icons/react";
import imgOne from "../../../assets/editor_panel/profile_profile.svg";
import ccImg from "../../../assets/editor_panel/cc_icon.svg";
import PreviousVideo from "../../../assets/editor_panel/previou_video.png";

import uploadVideo from "../../../assets/editor_panel/upload_video.svg";
import voiceOverImg from "../../../assets/editor_panel/voice_over.svg";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";

const EditorProjectPopUp = ({
  jobAction,
  handlePopup,
  setModalPopup,
  handeJobAction,
  handleUploadClick,
  thumbnail,
  getInputProps,
  getRootProps,
  file,
}) => {
  const [expanded, setExpanded] = useState(false);
  const modalOut = useRef();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  useOutsideClick(modalOut, () => setModalPopup(false));

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm">
      <div className="flex justify-center items-center h-screen">
        <div
          ref={modalOut}
          className="w-[1150px] bg-white rounded-3xl overflow-y-scroll no_scrollbar"
        >
          <div className="modal_header border-b border-b-black/10 p-6 flex justify-between items-center">
            <div className="project_info flex gap-3">
              <div className="left">
                <img src={imgOne} alt="profile" />
              </div>
              <div className="right">
                <h2 className="text-slate-900 text-lg font-semibold flex gap-3 items-center">
                  Sales Strategies Video Series
                  {jobAction === true ? (
                    <span className="bg-orange-500 rounded-md text-white py-[2px] px-[6px] text-xs font-semibold">
                      In Progress
                    </span>
                  ) : (
                    <span className="bg-red-500 rounded-md text-white py-[2px] px-[6px] text-xs font-semibold">
                      New Project
                    </span>
                  )}
                </h2>
                <p className="text-slate-600 text-sm font-normal">
                  Created September 1, 2023
                </p>
              </div>
            </div>
            <div className="project_action flex gap-3">
              {jobAction === false ? (
                <>
                  <button
                    onClick={handlePopup}
                    className="text-base font-semibold text-red-600 border border-red-600 py-3 px-6 rounded-full"
                  >
                    Decline Job
                  </button>
                  <button
                    onClick={handeJobAction}
                    className="text-base font-semibold text-white bg-indigo-600 border border-indigo-600 py-3 px-6 rounded-full"
                  >
                    Accept Job
                  </button>
                </>
              ) : (
                <button className="text-base font-semibold text-white bg-indigo-600 border border-indigo-600 py-3 px-6 rounded-full">
                  Share Project
                </button>
              )}
            </div>
          </div>
          <div
            className={`modal_description p-10 h-[640px] ${
              jobAction === true && "overflow-y-scroll no_scrollbar"
            }`}
          >
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-7">
                {jobAction === true && (
                  <div className="submit_video_wrapper pb-10">
                    <div className="section_head pb-4">
                      <h2 className="text-slate-900 text-lg font-semibold flex items-center gap-2">
                        <FileText
                          size={24}
                          className="text-indigo-600"
                          weight="bold"
                        />
                        Submit Video
                      </h2>
                    </div>
                    <div className="submit_video outline-1 outline-dashed outline-slate-200  rounded-3xl">
                      <div className="upoload_video py-12 px-6 flex justify-center items-center flex-col border-b border-dashed">
                        <div {...getRootProps()} onClick={handleUploadClick}>
                          {thumbnail ? (
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
                          )}
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
                              <img src={PreviousVideo} alt="video" />
                              <p className="text-white font-xs font-semibold bg-slate-900 inline rounded-md px-1 absolute bottom-2 left-2">
                                03:45
                              </p>
                            </div>
                          </div>
                          <div className="video_item">
                            <div className="video_img relative">
                              <img src={PreviousVideo} alt="video" />
                              <p className="text-white font-xs font-semibold bg-slate-900 inline rounded-md px-1 absolute bottom-2 left-2">
                                03:45
                              </p>
                            </div>
                          </div>
                          <div className="video_item">
                            <div className="video_img relative">
                              <img src={PreviousVideo} alt="video" />
                              <p className="text-white font-xs font-semibold bg-slate-900 inline rounded-md px-1 absolute bottom-2 left-2">
                                03:45
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                  <div className="project_brief border border-slate-200 rounded-3xl">
                    <div className="project_des p-6 border-b border-b-slate-200">
                      <p className="text-slate-800 text-xs font-normal pb-4">
                        {expanded ? (
                          <>
                            This project aims to create a video series focusing
                            on impactful sales strategies for businesses of all
                            sizes. The series will leverage your on-demand video
                            editing service to showcase its capabilities and
                            attract potential clients, while providing valuable
                            and actionable sales advice. This project aims to
                            create a video series focusing on impactful sales
                            strategies for businesses of all sizes. The series
                            will leverage your on-demand video editing service
                            to showcase its capabilities and attract potential
                            clients, while providing valuable and actionable
                            sales advice.
                          </>
                        ) : (
                          <>
                            This project aims to create a video series focusing
                            on impactful sales strategies for businesses of all
                            sizes. The series will leverage your on-demand video
                            editing service to showcase its capabilities and
                            attract potential clients, while providing valuable
                            and actionable sales advice.
                            <span className="ellipsis"> ...</span>
                          </>
                        )}
                      </p>
                      <p className="text-slate-800 text-xs font-normal">
                        {expanded ? (
                          <>
                            To achieve your project goals, a multifaceted
                            approach blending content marketing, social media
                            engagement, and strategic partnerships is essential.
                            Crafting informative blog posts, videos, and social
                            media content showcasing the benefits of your
                            on-demand video editing service will help increase
                            brand awareness and position your company as thought
                            leaders in the industry. To achieve your project
                            goals, a multifaceted approach blending content
                            marketing, social media engagement, and strategic
                            partnerships is essential. Crafting informative blog
                            posts, videos, and social media content showcasing
                            the benefits of your on-demand video editing service
                            will help increase brand awareness and position your
                            company as thought leaders in the industry.
                          </>
                        ) : (
                          <>
                            To achieve your project goals, a multifaceted
                            approach blending content marketing, social media
                            engagement, and strategic partnerships is essential.
                            Crafting informative blog posts, videos, and social
                            media content showcasing the benefits of your
                            on-demand video editing service will help increase
                            brand awareness and position your company as thought
                            leaders in the industry.
                            <span className="ellipsis"> ...</span>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="see_more flex justify-center py-4">
                      <button
                        onClick={toggleExpanded}
                        className="text-indigo-600 text-sm font-semibold flex items-center gap-2"
                      >
                        {expanded ? "Show Less" : "Show More"}
                        {expanded ? (
                          <CaretUp
                            size={20}
                            className="text-indigo-600 text-sm font-semibold"
                            weight="bold"
                          />
                        ) : (
                          <CaretDown
                            size={20}
                            className="text-indigo-600 text-sm font-semibold"
                            weight="bold"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="addons_wrapper pb-10">
                  <div className="section_head pb-4">
                    <h2 className="text-slate-900 text-lg font-semibold flex items-center gap-2">
                      <PuzzlePiece size={24} className="text-indigo-600" />
                      Add-Ons
                    </h2>
                  </div>

                  <div className="addons_items_wrapper border border-slate-200 rounded-3xl">
                    <div className="addons_items p-4 border-b border-b-slate-100 flex items-center justify-between">
                      <div className="addons_items_left flex gap-4">
                        <div className="addons_items_img">
                          <img src={ccImg} alt="icon" />
                        </div>
                        <div className="addons_items_title">
                          <h2 className="text-base font-semibold text-slate-800">
                            Subtitles and SRT Files
                          </h2>
                          <p className="text-slate-500 text-xs font-normal">
                            Spoken English videos only. Allow up to 24-48 hours.
                          </p>
                        </div>
                      </div>
                      <div className="addons_items_right">
                        <h3 className="text-base font-semibold text-slate-800">
                          0.5 credits
                        </h3>
                      </div>
                    </div>

                    <div className="addons_items p-4 border-b border-b-slate-100 flex items-center justify-between">
                      <div className="addons_items_left flex gap-4">
                        <div className="addons_items_img">
                          <img src={voiceOverImg} alt="icon" />
                        </div>
                        <div className="addons_items_title">
                          <h2 className="text-base font-semibold text-slate-800">
                            Voice Over Artist
                          </h2>
                          <p className="text-slate-500 text-xs font-normal">
                            Professional voice. Allow up to 48 hours.
                          </p>
                        </div>
                      </div>
                      <div className="addons_items_right">
                        <h3 className="text-base font-semibold text-slate-800">
                          1 credit
                        </h3>
                      </div>
                    </div>

                    <div className="addons_items p-4 flex items-center justify-between">
                      <div className="addons_items_left">
                        <div className="addons_items_title">
                          <h2 className="text-base font-normal text-slate-900">
                            Total Project Cost:{" "}
                            <span className="font-bold">2.5 Credit</span>
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

export default EditorProjectPopUp;
