import React, { useState } from "react";
import FromLabel from "./FromLabel";
import { useDropzone } from "react-dropzone";
import { formatFileSize } from "../../../utils/converter";
import pdfIcon from "../../../assets/pdf.svg";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setActiveBrif } from "../../../features/project/projectSlice";

const SupportingMaterial = ({
  save,
  isLoading,
  projectData,
  editing,
  setEditing,
}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ["image/png", "image/jpeg", "application/pdf"],
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setFiles([...files, ...acceptedFiles]);
      }
    },
  });

  const handleContinue = async (activeBrif) => {
    try {
      const formData = new FormData();

      files.forEach((i) => formData.append("supportive", i));
      formData.append("projectId", projectData?._id);
      const res = await save(formData);

      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        // push("/dashboard");

        !editing && activeBrif && dispatch(setActiveBrif(activeBrif));
        setEditing(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  return (
    <div className="border rounded-xl p-6 mb-6">
      <FromLabel
        title="Supporting Materials"
        subtitle="Any planning templates, scripts, storyboards and any other documentation that may support the creative process."
      />

      <div
        {...getRootProps()}
        className="border border-dashed rounded-xl p-12 w-full mb-5 text-center"
      >
        <input {...getInputProps()} />

        <div>
          <p className="text-lg font-semibold mb-1">
            Upload a File or <span className="text-indigo-600">Browse</span>
          </p>
          <p className="text-sm font-medium text-slate-500">
            Click to browse or drag & drop a file here
          </p>
        </div>
      </div>

      {files?.length > 0 && (
        <div className="flex flex-wrap gap-3 my-5">
          {files.map((i, idx) => (
            <div
              key={idx}
              className="flex items-center gap-[13px] bg-[#F8FAFC] px-[16px] py-[8px] rounded-[12px] border border-[#E2E8F0]"
            >
              {i?.type.includes("pdf") ? (
                <div>
                  <img src={pdfIcon} alt="" />
                </div>
              ) : (
                <div className="w-[40px] h-[40px] rounded-full">
                  <img
                    src={URL.createObjectURL(i)}
                    alt=""
                    className="w-full h-full rounded-full object-contain"
                  />
                </div>
              )}
              <div>
                <p className="text-[14px] text-[#0F172A] font-[500]">
                  {i.name}
                </p>
                <span className="text-[12px] text-[#64748B] font-[400]">
                  {formatFileSize(i.size)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        // disabled={files.length === 0 || isLoading}
        disabled={isLoading}
        className="primary_btn disabled:bg-indigo-300"
        onClick={() => handleContinue("brandKit")}
      >
        {isLoading ? "Loading..." : "Continue"}
      </button>
    </div>
  );
};

export default SupportingMaterial;
