import { useState } from "react";
import arrow from "../../../assets/down-arrow.svg";
import { CalendarBlank, CaretDown, TextAa } from "@phosphor-icons/react";

const AllVideoHeader = ({
  handleComponentChange,
  selectedComponent,
  setSortBy,
  sortBy,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("Videos");
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="mb-6 flex justify-between items-center gap-4">
      <p className="text-xl font-bold">All Videos</p>
      <div className="flex items-center gap-3">
        <div className="bg-slate-100 border rounded-full p-1">
          <button
            onClick={() => handleComponentChange("folder")}
            className={`${
              selectedComponent === "folder" ? "bg-white" : "bg-transparent"
            }  rounded-full p-1.5 text-xs font-medium`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.5 3.5V6.5C7.5 6.76522 7.39464 7.01957 7.20711 7.20711C7.01957 7.39464 6.76522 7.5 6.5 7.5H3.5C3.23478 7.5 2.98043 7.39464 2.79289 7.20711C2.60536 7.01957 2.5 6.76522 2.5 6.5V3.5C2.5 3.23478 2.60536 2.98043 2.79289 2.79289C2.98043 2.60536 3.23478 2.5 3.5 2.5H6.5C6.76522 2.5 7.01957 2.60536 7.20711 2.79289C7.39464 2.98043 7.5 3.23478 7.5 3.5ZM12.5 2.5H9.5C9.23478 2.5 8.98043 2.60536 8.79289 2.79289C8.60536 2.98043 8.5 3.23478 8.5 3.5V6.5C8.5 6.76522 8.60536 7.01957 8.79289 7.20711C8.98043 7.39464 9.23478 7.5 9.5 7.5H12.5C12.7652 7.5 13.0196 7.39464 13.2071 7.20711C13.3946 7.01957 13.5 6.76522 13.5 6.5V3.5C13.5 3.23478 13.3946 2.98043 13.2071 2.79289C13.0196 2.60536 12.7652 2.5 12.5 2.5ZM6.5 8.5H3.5C3.23478 8.5 2.98043 8.60536 2.79289 8.79289C2.60536 8.98043 2.5 9.23478 2.5 9.5V12.5C2.5 12.7652 2.60536 13.0196 2.79289 13.2071C2.98043 13.3946 3.23478 13.5 3.5 13.5H6.5C6.76522 13.5 7.01957 13.3946 7.20711 13.2071C7.39464 13.0196 7.5 12.7652 7.5 12.5V9.5C7.5 9.23478 7.39464 8.98043 7.20711 8.79289C7.01957 8.60536 6.76522 8.5 6.5 8.5ZM12.5 8.5H9.5C9.23478 8.5 8.98043 8.60536 8.79289 8.79289C8.60536 8.98043 8.5 9.23478 8.5 9.5V12.5C8.5 12.7652 8.60536 13.0196 8.79289 13.2071C8.98043 13.3946 9.23478 13.5 9.5 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3946 13.0196 13.5 12.7652 13.5 12.5V9.5C13.5 9.23478 13.3946 8.98043 13.2071 8.79289C13.0196 8.60536 12.7652 8.5 12.5 8.5Z"
                fill="#0F172A"
              />
            </svg>
          </button>
          <button
            onClick={() => handleComponentChange("file")}
            className={`${
              selectedComponent === "file" ? "bg-white" : "bg-transparent"
            }  rounded-full p-1.5 text-xs font-medium`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14 3.5V4.5C14 4.63261 13.9473 4.75979 13.8536 4.85355C13.7598 4.94732 13.6326 5 13.5 5H6C5.86739 5 5.74021 4.94732 5.64645 4.85355C5.55268 4.75979 5.5 4.63261 5.5 4.5V3.5C5.5 3.36739 5.55268 3.24021 5.64645 3.14645C5.74021 3.05268 5.86739 3 6 3H13.5C13.6326 3 13.7598 3.05268 13.8536 3.14645C13.9473 3.24021 14 3.36739 14 3.5ZM3.5 3H2.5C2.36739 3 2.24021 3.05268 2.14645 3.14645C2.05268 3.24021 2 3.36739 2 3.5V4.5C2 4.63261 2.05268 4.75979 2.14645 4.85355C2.24021 4.94732 2.36739 5 2.5 5H3.5C3.63261 5 3.75979 4.94732 3.85355 4.85355C3.94732 4.75979 4 4.63261 4 4.5V3.5C4 3.36739 3.94732 3.24021 3.85355 3.14645C3.75979 3.05268 3.63261 3 3.5 3ZM13.5 7H6C5.86739 7 5.74021 7.05268 5.64645 7.14645C5.55268 7.24021 5.5 7.36739 5.5 7.5V8.5C5.5 8.63261 5.55268 8.75979 5.64645 8.85355C5.74021 8.94732 5.86739 9 6 9H13.5C13.6326 9 13.7598 8.94732 13.8536 8.85355C13.9473 8.75979 14 8.63261 14 8.5V7.5C14 7.36739 13.9473 7.24021 13.8536 7.14645C13.7598 7.05268 13.6326 7 13.5 7ZM3.5 7H2.5C2.36739 7 2.24021 7.05268 2.14645 7.14645C2.05268 7.24021 2 7.36739 2 7.5V8.5C2 8.63261 2.05268 8.75979 2.14645 8.85355C2.24021 8.94732 2.36739 9 2.5 9H3.5C3.63261 9 3.75979 8.94732 3.85355 8.85355C3.94732 8.75979 4 8.63261 4 8.5V7.5C4 7.36739 3.94732 7.24021 3.85355 7.14645C3.75979 7.05268 3.63261 7 3.5 7ZM13.5 11H6C5.86739 11 5.74021 11.0527 5.64645 11.1464C5.55268 11.2402 5.5 11.3674 5.5 11.5V12.5C5.5 12.6326 5.55268 12.7598 5.64645 12.8536C5.74021 12.9473 5.86739 13 6 13H13.5C13.6326 13 13.7598 12.9473 13.8536 12.8536C13.9473 12.7598 14 12.6326 14 12.5V11.5C14 11.3674 13.9473 11.2402 13.8536 11.1464C13.7598 11.0527 13.6326 11 13.5 11ZM3.5 11H2.5C2.36739 11 2.24021 11.0527 2.14645 11.1464C2.05268 11.2402 2 11.3674 2 11.5V12.5C2 12.6326 2.05268 12.7598 2.14645 12.8536C2.24021 12.9473 2.36739 13 2.5 13H3.5C3.63261 13 3.75979 12.9473 3.85355 12.8536C3.94732 12.7598 4 12.6326 4 12.5V11.5C4 11.3674 3.94732 11.2402 3.85355 11.1464C3.75979 11.0527 3.63261 11 3.5 11Z"
                fill="#475569"
              />
            </svg>
          </button>
        </div>
        <div className="relative  ">
          <div
            onClick={() => setShowSort(!showSort)}
            className="bg-slate-100 border rounded-full p-1"
          >
            <button className="bg-white rounded-full p-1.5 text-xs font-medium flex items-center gap-1">
              Sort by: {sortBy} <CaretDown size={12} weight="fill" />
            </button>
          </div>
          {showSort && (
            <div className="bg-white min-w-[165px] shadow-xl rounded-xl absolute right-0 z-50 mt-1">
              <button
                className={`text-sm font-medium flex items-center gap-3 px-4 py-2 ${
                  sortBy === "Last Modified" && "bg-slate-200"
                } w-full`}
                onClick={() => setSortBy("Last Modified")}
              >
                <CalendarBlank size={16} weight="bold" /> Last Modified
              </button>
              <button
                className={`text-sm font-medium flex items-center gap-3 px-4 py-2 ${
                  sortBy === "Alphabetical" && "bg-slate-200"
                } w-full`}
                onClick={() => setSortBy("Alphabetical")}
              >
                <TextAa size={16} weight="bold" /> Alphabetical
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllVideoHeader;
