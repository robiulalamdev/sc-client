import React from "react";
import { videos } from "../../../utils/data";
import { truncateFilename } from "../../../utils/converter";
import { useNavigate } from "react-router-dom";

const InProgressVideo = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-4 gap-6 mb-10">
      {data?.length > 0 &&
        data.slice(0, 3).map((d, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 flex gap-4 items-center cursor-pointer"
            onClick={() => navigate(`/user/project-details/${d._id}`)}
          >
            <div className="relative">
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/1*vbVPr3brcmImEQh0cckBOw.jpeg"
                alt=""
                className="w-[151px] h-[84px] rounded"
              />
              <button className="absolute top-1 right-1 bg-orange-500 text-[10.5px] text-white py-[1.75px] px-[5.25px] rounded-md ">
                {d.status}
              </button>
            </div>
            <div>
              <p className="text-base font-bold mb-2">
                {truncateFilename(d.projectTitle)}
              </p>
              <p className="text-xs text-slate-500 font-normal mb-1">
                Remaining Delivery Time
              </p>
              <p className="text-sm font-semibold">16h: 52m: 36s</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default InProgressVideo;
