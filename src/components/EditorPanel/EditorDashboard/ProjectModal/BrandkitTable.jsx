import React, { useState } from "react";
import pdf from "../../../../assets/pdf.svg";
import { CaretDown, DownloadSimple } from "@phosphor-icons/react";

const BrandkitTable = ({ name, fileName, items = [] }) => {
  const [displayCount, setDisplayCount] = useState(3);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  // console.log("items: ", name, ":=> ", items);
  return (
    <>
      {items?.length > 0 && (
        <div>
          <div className="flex items-center gap-4 justify-between mb-4">
            <p className="text-xl font-bold">{name}</p>
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
                {items?.slice(0, displayCount).map((data, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img width={18} src={pdf} alt="" />
                      {fileName} {index + 1}
                      {/* Subtitles and SRT Files */}
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
                displayCount >= items?.length ? "hidden" : "flex"
              } px-6 py-4 text-sm font-semibold  items-center gap-2 w-full justify-center border-t`}
            >
              Show More <CaretDown size={20} weight="bold" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandkitTable;
