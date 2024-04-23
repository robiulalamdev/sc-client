import React, { useState } from "react";
import pdf from "../../../../assets/pdf.svg";
import { CaretDown, DownloadSimple } from "@phosphor-icons/react";

const BrandkitTable = () => {
  const [displayCount, setDisplayCount] = useState(3);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };
  return (
    <div>
      <div className="flex items-center gap-4 justify-between mb-4">
        <p className="text-xl font-bold">Brand Guidelines</p>
        <button className="text-base font-semibold text-indigo-600">
          Download All
        </button>
      </div>

      <div className="border rounded-2xl">
        <table className="w-full text-sm font-medium">
          <thead>
            <tr className="border-b">
              <td className="px-4 py-2">Name</td>
              <td className="px-4 py-2">Description</td>
              <td className="px-4 py-2 "></td>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].slice(0, displayCount).map((data, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img width={18} src={pdf} alt="" />
                  Subtitles and SRT Files
                </td>
                <td className="px-4 py-3">
                  Spoken English videos only. Allow up to 24-48 hours.
                </td>
                <td className="px-4 py-3">
                  {" "}
                  <button>
                    <DownloadSimple size={20} weight="bold" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleShowMore}
          className={`${
            displayCount >= 6 ? "hidden" : "flex"
          } px-6 py-4 text-sm font-semibold  items-center gap-2 w-full justify-center border-t`}
        >
          Show More <CaretDown size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
};

export default BrandkitTable;
