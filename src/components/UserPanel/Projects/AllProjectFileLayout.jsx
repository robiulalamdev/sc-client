import React from "react";
import { timeAgo } from "../../../utils/converter";
import NoData from "../../../Shared/NoData";

const AllProjectFileLayout = ({ data }) => {
  return (
    <div>
      <div>
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: "24px",
          }}
          className="w-full"
        >
          <thead>
            <tr className="text-slate-500 font-medium text-base">
              <th className="text-start ">Name</th>
              <th className="text-start">Status</th>
              <th className="text-start">Date Modified</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex gap-4 items-center">
                      <img
                        className="w-[113px] h-[64px] rounded-xl"
                        src="https://miro.medium.com/v2/resize:fit:1400/1*vbVPr3brcmImEQh0cckBOw.jpeg"
                        alt=""
                      />
                      <p className="font-bold">{item.projectTitle}</p>
                    </div>
                  </td>
                  <td>
                    <button
                      className={` ${
                        item.status === "Draft"
                          ? "bg-[#1E293B]"
                          : item.status === "Exported"
                          ? "bg-[#22C55E]"
                          : item.status === "Pending"
                          ? "bg-[#831843]"
                          : "bg-orange-500"
                      } text-white font-semibold text-sm px-[6px] rounded-md`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="text-base font-semibold">
                    {timeAgo(item?.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <NoData/>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProjectFileLayout;
