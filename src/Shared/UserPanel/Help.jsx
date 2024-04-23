import help from "../../assets/help.svg";
import close from "../../assets/close.svg";
import { useState } from "react";
import HelpOptions from "./HelpOptions";
import GettingStarted from "./GettingStarted";
import ChangeEmail from "./ChangeEmail";

const Help = ({ setShowHelp, helpRef }) => {
  const [step, setStep] = useState(1);

  return (
    <div
      ref={helpRef}
      className="fixed z-[9999] top-[84px] right-[210px]  w-full max-h-[85vh] overflow-y-auto no_scrollbar  bg-white rounded-2xl shadow-2xl  max-w-[448px]"
    >
      <div className="p-6 border-b flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <img src={help} alt="" />
          <div>
            <p className="text-xl font-bold mb-1">Help</p>
            <p className="text-slate-500 text-sm font-medium">5 Collections</p>
          </div>
        </div>
        <button onClick={() => setShowHelp(false)}>
          <img src={close} alt="" />
        </button>
      </div>
      <div className="p-8">
        {step === 1 && <HelpOptions setStep={setStep} />}
        {step === 2 && <GettingStarted setStep={setStep} />}
        {step === 3 && <ChangeEmail setStep={setStep} />}
      </div>
    </div>
  );
};

export default Help;
