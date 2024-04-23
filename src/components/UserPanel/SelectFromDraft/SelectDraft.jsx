import { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import Draft from "./Draft";
import Details from "./Details";
import { setShowDraftModal } from "../../../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";

const SelectDraft = () => {
  const draftRef = useRef();
  const dispatch = useDispatch();
  const { draftStep } = useSelector((state) => state.project);
  useOutsideClick(draftRef, () => dispatch(setShowDraftModal(false)));

  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={draftRef}
        className="max-w-[896px] max-h-[90vh] overflow-y-auto no_scrollbar w-full bg-white text-black p-10 rounded-2xl relative"
      >
        {draftStep === 1 && <Draft />}

        {draftStep === 2 && <Details />}
      </div>
    </div>
  );
};

export default SelectDraft;
