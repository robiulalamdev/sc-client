import { CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useLocation } from "react-router-dom";
import {
  MyWorkTableData,
  clientTableHeading,
  tableHeading,
  tableHeadingTwo,
} from "../../../utils/data";
import EditorProjectPopUp from "../EditorProjectPopUp/EditorProjectPopUp";
import EditorPagination from "./EditorPagination";
import TableHead from "../../Shared/TableComponent/TableHead/TableHead";
import TableBody from "../../Shared/TableComponent/TableBody/TableBody";

import demoImage from "../../../assets/userprofile.png";

import ProjectBriefModal from "../../../Modal/ProjectBriefModal";

import { DateConverter } from "../../../utils/converter";
import SubmitProjectModal from "../../../Modal/SubmitProjectModal";
import AccepteJobModal from "../../../Modal/AccepteJobModal";

const MyWorkTable = ({ filteredData }) => {
  const route = useLocation();

  const [modalPopup, setModalPopup] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  // console.log(selectedProject, "selectedProject");
  // console.log(filteredData, "filteredData");
  const [jobAction, setJobAction] = useState(false);

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
      "video/mov": [".mov"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        if (acceptedFiles[0].type.startsWith("image/")) {
          setThumbnail(URL.createObjectURL(acceptedFiles[0]));
        } else {
          setThumbnail(null);
        }
      }
    },
  });
  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };
  const handlePopup = (item) => {
    setModalPopup(true);
    setSelectedProject(item);
  };
  const handeJobAction = () => {
    setJobAction(!jobAction);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // console.log("paginatedData", paginatedData);

  return (
    <>
      {route.pathname === "/editor" && (
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
          <div className="inline-block min-w-full border border-slate-200 rounded-2xl overflow-hidden">
            <table className="min-w-full leading-normal myworktable">
              <TableHead tableHeading={tableHeading} />
              <tbody>
                {paginatedData?.slice(0, 5).map((tableDataInfo, index) => (
                  <TableBody
                    tableDataInfo={tableDataInfo}
                    key={index}
                    handlePopup={() => handlePopup(tableDataInfo)}
                  />
                ))}
                <tr>
                  <td className="px-4 py-4 border-b border-[#e5e5e5b3] bg-white text-sm"></td>

                  <td className="px-4 py-4 border-b border-[#e5e5e5b3] bg-white text-sm">
                    <Link
                      to={"/editor/my-projects"}
                      className="text-sm font-semibold text-indigo-600 flex justify-center items-center gap-3"
                    >
                      All Projects <CaretRight size={20} weight="bold" />
                    </Link>
                  </td>

                  <td className="px-4 py-4 border-b border-[#e5e5e5b3] bg-white text-sm"></td>
                </tr>
              </tbody>
            </table>

            {modalPopup === true && (
              <ProjectBriefModal
                handlePopup={handlePopup}
                setModalPopup={setModalPopup}
                setSelectedProject={setSelectedProject}
                selectedProject={selectedProject}
              />
            )}
          </div>
        </div>
      )}
      {route.pathname === "/editor/my-projects" && (
        <>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full border border-slate-200 rounded-2xl overflow-hidden">
              <table className="min-w-full leading-normal myworktable">
                <TableHead tableHeading={tableHeading} />
                <tbody>
                  {paginatedData?.map((tableDataInfo, index) => (
                    <TableBody
                      tableDataInfo={tableDataInfo}
                      key={index}
                      handlePopup={() => handlePopup(tableDataInfo)}
                    />
                  ))}
                </tbody>
              </table>

              {modalPopup === true && (
                <ProjectBriefModal
                  handlePopup={handlePopup}
                  setModalPopup={setModalPopup}
                  setSelectedProject={setSelectedProject}
                  selectedProject={selectedProject}
                />
              )}
              {/* {showSubmitModal && (
                <SubmitProjectModal
                  setModalPopup={setShowSubmitModal}
                  setSelectedProject={setSelectedProject}
                  selectedProject={selectedProject}
                />
              )} */}
            </div>
          </div>
          {filteredData?.length > 10 && (
            <EditorPagination
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              filteredData={filteredData}
              itemsPerPage={itemsPerPage}
              endIndex={endIndex}
            />
          )}
        </>
      )}

      {route.pathname === "/editor/all-projects" && (
        <>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full border border-slate-200 rounded-2xl overflow-hidden">
              <table className="min-w-full leading-normal myworktable">
                <TableHead tableHeading={tableHeadingTwo} />
                <tbody>
                  {paginatedData?.map((tableDataInfo, index) => (
                    <tr
                      key={index}
                      className="hover:bg-indigo-100 hover:cursor-pointer"
                      onClick={() => handlePopup(tableDataInfo)}
                    >
                      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8">
                            <img
                              className="w-full h-full rounded-full object-cover"
                              src={
                                tableDataInfo.creator?.image
                                  ? tableDataInfo.creator?.image
                                  : demoImage
                              }
                              alt="img"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-semibold text-slate-900 whitespace-no-wrap cursor-pointer">
                              {tableDataInfo.creator.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap">
                          {tableDataInfo.projectTitle}
                        </p>
                      </td>

                      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap">
                          {tableDataInfo?.editor?.name
                            ? tableDataInfo?.editor?.name
                            : "N/A"}
                        </p>
                      </td>

                      <td
                        className={
                          "px-4 py-4 border-b border-[#e5e5e5b3] text-sm"
                        }
                      >
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
                          {tableDataInfo.status}
                        </p>
                      </td>

                      {/* <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap">
                          4 days
                        </p>
                      </td> */}

                      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap flex gap-2">
                          {DateConverter(tableDataInfo.updatedAt)}{" "}
                          <CaretRight size={20} weight="bold" />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* <EditorProjectPopUp
                  jobAction={jobAction}
                  handlePopup={handlePopup}
                  setModalPopup={setModalPopup}
                  handeJobAction={handeJobAction}
                  handleUploadClick={handleUploadClick}
                  thumbnail={thumbnail}
                  getInputProps={getInputProps}
                  getRootProps={getRootProps}
                  file={file}
                /> */}

              {modalPopup === true && (
                // <EditorProjectPopUp
                //   jobAction={jobAction}
                //   handlePopup={handlePopup}
                //   setModalPopup={setModalPopup}
                //   handeJobAction={handeJobAction}
                //   handleUploadClick={handleUploadClick}
                //   thumbnail={thumbnail}
                //   getInputProps={getInputProps}
                //   getRootProps={getRootProps}
                //   file={file}
                // />
                <ProjectBriefModal
                  handlePopup={handlePopup}
                  setModalPopup={setModalPopup}
                  setSelectedProject={setSelectedProject}
                  selectedProject={selectedProject}
                />
              )}

              {/* {modalPopup === true && (
                <AccepteJobModal
                  setModalPopup={setModalPopup}
                  setSelectedProject={setSelectedProject}
                  selectedProject={selectedProject}
                />
              )} */}
            </div>
          </div>

          {filteredData?.length > 10 && (
            <EditorPagination
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              filteredData={filteredData}
              itemsPerPage={itemsPerPage}
              endIndex={endIndex}
            />
          )}
        </>
      )}

      {route.pathname === "/editor/clients" && (
        <>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full border border-slate-200 rounded-2xl overflow-hidden">
              <table className="min-w-full leading-normal myworktable">
                <TableHead tableHeading={clientTableHeading} />

                <tbody>
                  {paginatedData?.map((tableDataInfo, index) => (
                    <tr
                      key={index}
                      className="hover:bg-indigo-100 hover:cursor-pointer"
                    >
                      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8">
                            <img
                              className="w-full h-full rounded-full"
                              src={tableDataInfo.image}
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

                      <td className="px-4 py-4 border-b border-[#e5e5e5b3] text-sm">
                        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap">
                          {tableDataInfo.projectCount}
                        </p>
                      </td>

                      <td
                        className={
                          "px-4 py-4 border-b border-[#e5e5e5b3] text-sm"
                        }
                      >
                        <p
                          className={`${
                            tableDataInfo.lastProject.status ===
                              "In Progress" &&
                            "text-sm font-normal text-white bg-orange-500 inline p-1 px-3 rounded-full whitespace-no-wrap"
                          } ${
                            tableDataInfo.lastProject.status === "Exported" &&
                            "text-sm font-normal text-white bg-green-500 inline p-1 px-3 rounded-full whitespace-no-wrap"
                          } ${
                            tableDataInfo.lastProject.status === "Pending" &&
                            "text-sm font-normal text-white bg-red-500 inline p-1 px-3 rounded-full whitespace-no-wrap"
                          }`}
                        >
                          {tableDataInfo.lastProject.status}
                        </p>
                      </td>

                      <td className="px-4 py-4 border-b border-[#e5e5e5b3]  text-sm">
                        <p className="text-sm font-normal text-slate-900 whitespace-no-wrap flex gap-2">
                          {DateConverter(tableDataInfo.lastProject.createdAt)}{" "}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {modalPopup === true && (
                <EditorProjectPopUp
                  jobAction={jobAction}
                  handlePopup={handlePopup}
                  setModalPopup={setModalPopup}
                  handeJobAction={handeJobAction}
                  handleUploadClick={handleUploadClick}
                  thumbnail={thumbnail}
                  getInputProps={getInputProps}
                  getRootProps={getRootProps}
                  file={file}
                />
              )}
            </div>
          </div>

          {filteredData?.length > 10 && (
            <EditorPagination
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              filteredData={filteredData}
              itemsPerPage={itemsPerPage}
              endIndex={endIndex}
            />
          )}
        </>
      )}
    </>
  );
};

export default MyWorkTable;
