import React from "react";
import { formatFileSize } from "../../../../utils/converter";
import pdfIcon from "../../../../assets/pdf.svg";

const SupportiveMaterials = ({ data, setEditing }) => {
  return (
    <div className="border rounded-xl p-6 mb-6">
      <div className="mb-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold mb-1">Supporting Materials </p>{" "}
          <button
            onClick={() => setEditing(true)}
            className="py-1.5 px-4 border border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-50 transition-all duration-300 ease-in"
          >
            Change
          </button>
        </div>

        {data?.length > 0 && (
          <div className="flex flex-wrap gap-3 my-5">
            {data.map((i, idx) => (
              <div
                key={idx}
                className="flex items-center gap-[13px] bg-[#F8FAFC] px-[16px] py-[8px] rounded-[12px] border border-[#E2E8F0]"
              >
                {i?.fileType.includes("pdf") ? (
                  <div>
                    <img src={pdfIcon} alt="" />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] rounded-full">
                    <img
                      src={
                        "https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png"
                      }
                      alt=""
                      className="w-full h-full rounded-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <p className="text-[14px] text-[#0F172A] font-[500]">
                    {i.name}
                  </p>
                  <span className="text-[12px] text-[#64748B] font-[400]">
                    {formatFileSize(i.size)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportiveMaterials;
