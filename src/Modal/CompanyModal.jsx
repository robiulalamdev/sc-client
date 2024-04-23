import React, { useRef, useState } from "react";
import close from "../assets/close.svg";
import aveter from "../assets/aveter1.svg";
import search from "../assets/search.svg";
import CompanySidebar from "../components/AdminPanel/InternalUsers/CompanySidebar";
import useOutsideClick from "../hooks/useOutsideClick";
import TeamMembers from "../components/AdminPanel/InternalUsers/TeamMembers";
import PlanBilling from "../components/AdminPanel/InternalUsers/PlanBilling";

const CompanyModal = ({ setShowModal }) => {
  const [step, setStep] = useState(0);
  const modalRef = useRef();
  useOutsideClick(modalRef, () => setShowModal(false));
  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div
        ref={modalRef}
        className="max-w-6xl max-h-[90vh] overflow-y-auto no_scrollbar w-full bg-white text-black  rounded-2xl "
      >
        <div className="flex items-center gap-4 justify-between p-6 border-b">
          <div className="flex w-full items-center gap-3">
            <img className="rounded-full h-10 w-10" src={aveter} alt="" />
            <div>
              <p className="text-lg font-semibold">Sophia Chen</p>
              <p className="text-slate-600 text-sm font-normal">
                Joined September 1, 2023
              </p>
            </div>
          </div>
          <div className="flex w-full justify-end items-center gap-6">
            <div className="max-w-[384px] w-full bg-slate-100 rounded-full p-3 flex  items-center gap-3">
              <img src={search} alt="" />
              <input
                className="bg-transparent w-full"
                type="search"
                placeholder="Search people"
              />
            </div>
            <button onClick={() => setShowModal(false)}>
              <img src={close} alt="" />
            </button>
          </div>
        </div>
        <div className="flex h-full">
          <div className="p-6 h-full flex-shrink-0">
            <CompanySidebar setStep={setStep} step={step} />
          </div>
          <div className="p-6 w-full border-l overflow-y-auto no_scrollbar">
            {step === 0 && <TeamMembers />}
            {step === 1 && <PlanBilling />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
