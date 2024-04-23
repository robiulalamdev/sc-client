/* eslint-disable react/prop-types */
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const EditorPagination = ({
  handlePageChange,
  currentPage,
  filteredData,
  itemsPerPage,
  endIndex,
}) => {


  console.log("filteredData from editor portal:", filteredData)

  return (
    <div className="container mx-auto mt-10 px-4">
      <nav
        className="flex gap-4 flex-row flex-nowrap justify-between md:justify-center items-center"
        aria-label="Pagination"
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage > 1
              ? "flex items-center text-base font-medium border border-indigo-600 px-3 py-1 rounded-full gap-2"
              : "flex items-center text-base font-medium border border-slate-200 px-3 py-1 rounded-full gap-2"
          }`}
          title="Previous"
        >
          <CaretLeft
            className={`${
              currentPage > 1 ? "text-indigo-600" : "text-slate-200"
            }`}
            size={16}
            weight="bold"
          />
          <span
            className={`${
              currentPage > 1 ? "text-indigo-600" : "text-slate-200"
            }`}
          >
            Previous
          </span>
        </button>

        <div className="flex gap-4">
          {Array?.from(
            {
              length: Math.min(
                Math.ceil(filteredData?.length / itemsPerPage),
                10
              ),
            },
            (_, index) => (
              <Link
                key={index}
                to="#"
                onClick={() => handlePageChange(index + 1)}
                className={`block cursor-pointer border px-3 py-1 rounded-full text-base font-medium ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "text-[#64748B] border-transparent"
                }`}
              >
                {index + 1}
              </Link>
            )
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= filteredData?.length}
          className={`${
            endIndex >= filteredData?.length
              ? "flex items-center text-base font-medium border border-slate-200 px-3 py-1 rounded-full gap-2"
              : "flex items-center text-base font-medium border border-indigo-600 px-3 py-1 rounded-full gap-2"
          }`}
          title="Next"
        >
          <span
            className={`${
              endIndex >= filteredData?.length
                ? "text-slate-200"
                : "text-indigo-600"
            }`}
          >
            Next
          </span>
          <CaretRight
            className={`${
              endIndex >= filteredData?.length
                ? "text-slate-200"
                : "text-indigo-600"
            }`}
            size={16}
            weight="bold"
          />
        </button>
      </nav>
    </div>
  );
};

export default EditorPagination;
