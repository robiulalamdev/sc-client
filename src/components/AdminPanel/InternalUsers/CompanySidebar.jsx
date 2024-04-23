import React from "react";
import { companyMenu } from "../../../utils/data";

const CompanySidebar = ({ step, setStep }) => {
  return (
    <>
      {companyMenu.length > 0 &&
        companyMenu.map((data, index) => (
          <div
            onClick={() => setStep(index)}
            className={`${
              step === index
                ? "text-indigo-600 bg-indigo-50"
                : "text-slate-600 bg-transparent"
            } px-4 py-3 rounded-xl flex items-center gap-3.5 mb-2  text-base font-medium hover:bg-indigo-50 cursor-pointer`}
            key={index}
          >
            {data.icon} <p>{data.title}</p>
          </div>
        ))}
    </>
  );
};

export default CompanySidebar;
