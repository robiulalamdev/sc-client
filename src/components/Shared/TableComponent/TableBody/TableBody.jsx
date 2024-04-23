/* eslint-disable react/prop-types */
import { CaretRight } from "@phosphor-icons/react";
import { DateConverter } from "../../../../utils/converter";

import userProfile from "../../../../assets/userprofile.png";

const TableBody = ({ tableDataInfo, index, handlePopup }) => {
  console.log(tableDataInfo, "tajfkajkfl");
  return (
    <tr
      key={index}
      className="hover:bg-indigo-100 hover:cursor-pointer"
      onClick={handlePopup}
    >
      <td className="px-4 py-4 border-b  border-[#e5e5e5b3] text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8">
            <img
              className="w-full h-full rounded-full object-cover"
              src={
                tableDataInfo.creator?.image
                  ? tableDataInfo.creator?.image
                  : userProfile
              }
              alt="img"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-slate-900 whitespace-no-wrap">
              {tableDataInfo?.creator?.name}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap">
          {tableDataInfo?.projectTitle}
        </p>
      </td>
      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap">
          {tableDataInfo?.status}
        </p>
      </td>

      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap flex gap-2">
          {DateConverter(tableDataInfo?.createdAt)}{" "}
          <CaretRight size={20} weight="bold" />
        </p>
      </td>
    </tr>
  );
};

export default TableBody;
