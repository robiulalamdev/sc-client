import React, { useState } from "react";
import {
  CaretDown,
  CaretLeft,
  CaretUp,
  FileText,
  PuzzlePiece,
} from "@phosphor-icons/react";
import cc from "../../../assets/cc.svg";
import voice from "../../../assets/voice.svg";
import { useDispatch, useSelector } from "react-redux";
import { DateConverter } from "../../../utils/converter";
import {
  setActiveBrif,
  setDraftStep,
  setProjectId,
  setSelectedProject,
  setShowCreateModal,
  setShowDraftModal,
  setStep,
} from "../../../features/project/projectSlice";

const Details = () => {
  const [showFullText, setShowFullText] = useState(false);
  const { selectedProject } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const maxWords = 110;

  const truncateText = (text, maxWords) => {
    const words = text?.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const handleSelectDraft = () => {
    dispatch(setProjectId(selectedProject?._id));
    dispatch(setShowCreateModal(true));

    dispatch(setShowDraftModal(false));
    dispatch(setDraftStep(1));
    if (!selectedProject?.description) {
      dispatch(setStep(1));
      dispatch(setActiveBrif("description"));
      return;
    } else if (
      !selectedProject?.supportiveMaterials ||
      selectedProject?.supportiveMaterials.length === 0
    ) {
      dispatch(setStep(1));
      dispatch(setActiveBrif("materials"));
      return;
    } else if (!selectedProject?.brandKit) {
      dispatch(setStep(1));
      dispatch(setActiveBrif("brandKit"));
      return;
    } else if (!selectedProject?.aspectRatio) {
      dispatch(setStep(1));
      dispatch(setActiveBrif("ratio"));
      return;
    } else if (!selectedProject?.presenter) {
      dispatch(setStep(1));
      dispatch(setActiveBrif("presenter"));
      return;
    } else {
      dispatch(setStep(2));
    }
  };
  return (
    <div>
      <div className="flex items-start gap-4 justify-between mb-10">
        <div>
          <div className="flex gap-3 items-center">
            <p className="text-lg font-semibold">
              {selectedProject?.projectTitle}
            </p>
            <button className="px-1.5 py-0.5 bg-slate-900 text-white rounded-md">
              Draft
            </button>
          </div>
          <p className="text-slate-600 text-sm font-normal">
            Created {DateConverter(selectedProject?.createdAt)}
          </p>
        </div>
        <button
          onClick={() => {
            dispatch(setSelectedProject(undefined));
            dispatch(setDraftStep(1));
          }}
          className="flex items-center gap-2 px-6 py-3 text-base font-semibold text-indigo-600 border rounded-full border-indigo-600"
        >
          <CaretLeft size={24} weight="bold" /> Go Back
        </button>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-indigo-600 " size={24} weight="bold" />
          <p className="text-lg font-semibold">Project Brief</p>
        </div>

        <div className="border rounded-3xl mb-10">
          <div className="p-6 border-b">
            <p
              className="text-slate-800 font-normal text-sm"
              dangerouslySetInnerHTML={{
                __html: showFullText
                  ? selectedProject?.description
                  : truncateText(selectedProject?.description, maxWords),
              }}
            />
          </div>
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
                Show More <CaretDown size={20} weight="bold" />
              </>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <PuzzlePiece className="text-indigo-600 " size={24} weight="bold" />
          <p className="text-lg font-semibold">Add-Ons</p>
        </div>

        <div className="border rounded-3xl mb-10">
          {selectedProject?.addOns.length > 0 ? (
            <div className="p-4 border-b flex items-center gap-2 justify-between">
              <div className="flex items-center gap-4">
                <img src={cc} alt="" />
                <div>
                  <p className="text-slate-800 mb-1 text-base font-semibold">
                    Subtitles and SRT Files
                  </p>
                  <p className="text-slate-500 font-normal text-xs">
                    Spoken English videos only. Allow up to 24-48 hours.
                  </p>
                </div>
              </div>
              <p className="text-base font-semibold">0.5 credits</p>
            </div>
          ) : (
            <p className="text-center py-5">No addons available</p>
          )}
          {/* <div className="p-4 border-b flex items-center gap-2 justify-between">
            <div className="flex items-center gap-4">
              <img src={voice} alt="" />
              <div>
                <p className="text-slate-800 mb-1 text-base font-semibold">
                  Voice Over Artist
                </p>
                <p className="text-slate-500 font-normal text-xs">
                  Professional voice. Allow up to 48 hours.
                </p>
              </div>
            </div>
            <p className="text-base font-semibold">1 credit</p>
          </div> */}
          <div className="py-4 px-6  flex items-center gap-2 justify-between">
            <p className="text-base font-normal">
              Total Project Cost:{" "}
              <span className="font-bold">
                {selectedProject?.totalCredit} Credits
              </span>{" "}
            </p>
            <button className="text-indigo-600 text-sm font-semibold">
              Request Credit Change
            </button>
          </div>
        </div>
      </div>
      <button className="primary_btn w-full" onClick={handleSelectDraft}>
        Select Draft
      </button>
    </div>
  );
};

export default Details;
