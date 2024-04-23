import React from "react";
import InsightsCard from "../../EditorPanel/EditorDashboard/InsightsCard";
import aveter from "../../../assets/aveter1.svg";
import { DotsThreeVertical } from "@phosphor-icons/react";

const TeamMembers = () => {
  return (
    <div>
      <div className="insights_wrapper pb-10">
        <div className="seciton_heading pb-6">
          <h3 className="text-2xl font-bold text-slate-900">Insights</h3>
        </div>
        <InsightsCard />
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold">
            <th className="text-start px-2 py-4">Member</th>
            <th className="text-start">Date Added</th>
            <th className="text-start">Role</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <tr key={index}>
              <td className="px-4 py-4 border-t border-[#e5e5e5b3] text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8">
                    <img
                      className="w-full h-full rounded-full"
                      src={aveter}
                      alt="img"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-slate-900 whitespace-no-wrap cursor-pointer mb-1">
                      James Daher
                    </p>
                    <p className="text-slate-500 text-xs font-normal">
                      {" "}
                      James Daher@gmail.com
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-sm font-normal border-t">
                September 12, 2023
              </td>
              <td className="text-sm font-normal border-t">Delivery Head</td>
              <td className="border-t">
                <button>
                  <DotsThreeVertical size={24} weight="bold" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembers;
