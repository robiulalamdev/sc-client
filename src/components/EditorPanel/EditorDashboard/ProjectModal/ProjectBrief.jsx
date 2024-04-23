import { CaretDown, CaretUp, DownloadSimple } from "@phosphor-icons/react";
import React, { useState } from "react";
import landscape from "../../../../assets/landscape.svg";
import pdf from "../../../../assets/pdf.svg";
import aveter from "../../../../assets/aveter1.svg";
import { formatFileSize } from "../../../../utils/converter";
import SingleSupportingMaterial from "./SingleSupportingMaterial";

const ProjectBrief = ({ selectedProject }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const maxWords = 110;
  const text = selectedProject?.description;

  const truncateText = (text, maxWords) => {
    const words = text?.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const tabs = ["Supporting Materials", "Add-Ons"];

  return (
    <div>
      <div>
        <p className="text-slate-500 font-normal text-sm mb-2">Project Name</p>
        <p className="text-2xl font-bold mb-6">
          {selectedProject?.projectTitle}
        </p>
        <div className="flex items-center gap-4 justify-between mb-8">
          <div className="flex items-center gap-6">
            <p className="text-sm text-slate-500 font-normal">Video Type</p>
            <p className="text-sm font-medium">{selectedProject?.videoType}</p>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-sm text-slate-500 font-normal">Presenter </p>
            <div className="flex items-center gap-2">
              <img className="w-6 h-6 rounded-full" src={aveter} alt="" />
              <p className="text-sm font-medium">
                {selectedProject?.presenter}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-sm text-slate-500 font-normal">Aspect Ratio</p>
            <div className="flex items-center gap-2">
              {/* <img src={landscape} alt="" /> */}
              <p className="text-sm font-medium">
                {selectedProject?.aspectRatio}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-3xl mb-10">
        <div className="p-6 border-b">
          <p
            className="text-slate-800 font-normal text-sm"
            dangerouslySetInnerHTML={{
              __html: showFullText ? text : truncateText(text, maxWords),
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

      <div>
        <div className="flex items-center border-b mb-4">
          {tabs.map((data, index) => (
            <div
              onClick={() => setActiveTab(index)}
              className={`${
                activeTab === index
                  ? " border-indigo-600"
                  : "border-transparent text-slate-500"
              } border-b-2 px-4 py-2 text-sm font-medium cursor-pointer`}
              key={index}
            >
              <p>{data}</p>
            </div>
          ))}
        </div>
        {activeTab === 0 ? (
          <div className="border rounded-2xl">
            <table className="w-full text-sm font-medium">
              <thead>
                <tr className="border-b">
                  <td className="px-4 py-2">Name</td>
                  <td className="py-2">Size</td>
                  <td className="py-2"></td>
                </tr>
              </thead>
              <tbody>
                {selectedProject?.supportiveMaterials.length > 0 &&
                  selectedProject?.supportiveMaterials?.map((data, index) => (
                    <SingleSupportingMaterial data={data} index={index}   />
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border rounded-2xl">
            <table className="w-full text-sm font-medium">
              <thead>
                <tr className="border-b ">
                  <td className="px-4 py-2">Name</td>
                  <td>Description</td>
                  <td className="px-4 py-2 ">Credits</td>
                </tr>
              </thead>
              <tbody>
                {selectedProject?.addOns.length > 0 &&
                  selectedProject?.addOns.map((data, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="px-4 py-2 flex items-center gap-3">
                        <img width={18} src={pdf} alt="" /> {data.name}
                      </td>
                      <td>{data.description}</td>
                      <td className="px-4 py-2">{data.credit} credits</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectBrief;
