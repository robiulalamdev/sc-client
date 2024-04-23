import React from "react";
import { timeAgo } from "../../../utils/converter";
import { useDispatch } from "react-redux";
import {
  setDraftStep,
  setSelectedProject,
  setShowDraftModal,
} from "../../../features/project/projectSlice";
import { useNavigate } from "react-router-dom";
import NoData from "../../../Shared/NoData";

const AllProjects = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    if (item.status === "Draft") {
      dispatch(setShowDraftModal(true));
      dispatch(setDraftStep(2));
      dispatch(setSelectedProject(item));
    } else {
      navigate(`/user/project-details/${item._id}`);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-6 mb-10">
      {data &&
        data?.length > 0 ?
        data.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleNavigate(item)}
            className="border rounded-2xl p-4 flex gap-4 items-center cursor-pointer"
          >
            <div className="relative">
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/1*vbVPr3brcmImEQh0cckBOw.jpeg"
                alt=""
                className="w-[151px] h-[84px] rounded"
              />
              <button
                className={`absolute top-1 right-1 ${
                  item.status === "Draft"
                    ? "bg-[#1E293B]"
                    : item.status === "Exported"
                    ? "bg-[#22C55E]"
                    : item.status === "Pending"
                    ? "bg-[#831843]"
                    : "bg-orange-500"
                }  text-[10.5px] text-white py-[1.75px] px-[5.25px] font-[600] rounded-md`}
              >
                {item?.status}
              </button>
            </div>
            <div>
              <p className="text-base font-bold mb-2">{item?.projectTitle}</p>
              <p className="text-xs text-slate-500 font-normal mb-1">
                Remaining Delivery Time
              </p>
              <p className="text-sm font-semibold">
                {" "}
                {timeAgo(item?.createdAt)}
              </p>
            </div>
          </div>
        )) : (
          <NoData/>
        )}
    </div>
  );
};

export default AllProjects;
