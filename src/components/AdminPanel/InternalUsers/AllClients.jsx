import React, { useState } from "react";
import EditorPagination from "../../EditorPanel/EditorDashboard/EditorPagination";
import { CaretRight } from "@phosphor-icons/react";
import TableHead from "../../Shared/TableComponent/TableHead/TableHead";
import { clientTableHeading } from "../../../utils/data";
import { useGetAllClientsQuery } from "../../../features/project/projectApi";
import CompanyModal from "../../../Modal/CompanyModal";
import defaultImage from "../../../assets/userprofile.png"
import moment from 'moment';


const AllClients = ({ filteredData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const { data, isLoading } = useGetAllProjectsQuery(`editor=${user?._id}`);
  // const { data, isLoading } = useGetAllClientsQuery(`clientType=EDITOR`);
  const { data, isLoading } = useGetAllClientsQuery(`clientType=USER`);

  console.log("filteredData:", data)
  console.log("isLoading state: ", isLoading)

  return (
    <div className="flex flex-col h-[90%] justify-between">
      <table className="w-full leading-normal myworktable">
        <TableHead tableHeading={clientTableHeading} />

        <tbody>
          {data?.map((tableDataInfo, index) => (
            <tr
              key={index}
              className="hover:bg-indigo-100 hover:cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8">
                    <img
                      className="w-full h-full rounded-full"
                      src={tableDataInfo.image ? tableDataInfo.image : defaultImage}
                      alt="img"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-slate-900 whitespace-no-wrap cursor-pointer">
                      {tableDataInfo.name}
                    </p>
                  </div>
                </div>
              </td>

              {/* <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                <p className="text-sm font-normal text-slate-900 whitespace-no-wrap">
                  {tableDataInfo.projectCount}
                </p>
              </td> */}

              <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                <p className="text-sm font-normal text-slate-900 whitespace-no-wrap">
                  {moment(tableDataInfo.updatedAt).format('MMMM Do YYYY')} days
                </p>
              </td>

              {/* <td className={"px-4 py-4 border-b border-[#e5e5e5b3] text-sm"}>
                <p
                  className={`${
                    tableDataInfo.status === "In Progress" &&
                    "text-sm font-normal text-white bg-orange-500 inline p-1 px-3 rounded-full whitespace-no-wrap"
                  } ${
                    tableDataInfo.status === "Approved" &&
                    "text-sm font-normal text-white bg-green-500 inline p-1 px-3 rounded-full whitespace-no-wrap"
                  } ${
                    tableDataInfo.status === "New Project" &&
                    "text-sm font-normal text-white bg-red-500 inline p-1 px-3 rounded-full whitespace-no-wrap"
                  }`}
                >
                  {tableDataInfo.updatedAt}
                </p>
              </td> */}

              <td className="px-4 py-4 border-b border-[#e5e5e5b3]  text-sm">
                <p className="text-sm font-normal text-slate-900 whitespace-no-wrap flex gap-2">
                  {tableDataInfo.updatedAt }{" "}
                  <CaretRight size={20} weight="bold" />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditorPagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        filteredData={filteredData}
        itemsPerPage={itemsPerPage}
        endIndex={endIndex}
      />

      {showModal && <CompanyModal setShowModal={setShowModal} />}
    </div>
  );
};

export default AllClients;
