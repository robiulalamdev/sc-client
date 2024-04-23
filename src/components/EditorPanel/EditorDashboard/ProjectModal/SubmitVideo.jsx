import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import uploadVideo from "../../../../assets/editor_panel/upload_video.svg";
import mp4 from "../../../../assets/mp4.svg";
import { DownloadSimple } from "@phosphor-icons/react";
import { formatFileSize, truncateFilename } from "../../../../utils/converter";

const SubmitVideo = ({ selectedProject, file, setFile }) => {
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
  return (
    <div>
      {selectedProject?.status !== "Exported" && (
        <div className="submit_video outline-1 outline-dashed outline-slate-200  rounded-3xl mb-6">
          <div
            {...getRootProps()}
            onClick={handleUploadClick}
            className="upoload_video py-12 px-6 flex justify-center items-center flex-col cursor-pointer"
          >
            <div>
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="thumbnail"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                  }}
                />
              ) : (
                <img src={uploadVideo} alt="icon" />
              )}
              <input
                id="fileInput"
                type="file"
                {...getInputProps()}
                // style={{ display: "none" }}
              />
            </div>
            {file ? (
              <div>
                <p className="text-sm font-semibold text-slate-900 pb-1">
                  {file.name}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900 pb-1">
                  Upload a File or{" "}
                  <Link to="#" className="text-indigo-600 ml-1">
                    Paste URL
                  </Link>
                </p>
                <p className="text-sm text-normal text-slate-500">
                  Click to browse or drag & drop a file here
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedProject?.previousVersion &&
        selectedProject?.previousVersion.length > 0 && (
          <div>
            <p className="text-base font-semibold mb-4">Previous Versions</p>
            <div className="border rounded-2xl">
              <table className="w-full text-sm font-medium">
                <thead>
                  <tr className="border-b">
                    <td className="px-4 py-2">Name</td>
                    <td>Size</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {selectedProject?.previousVersion.map((data, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img width={24} src={mp4} alt="" />
                        {truncateFilename(data.fileData.title)}
                      </td>
                      <td className="px-4 py-3">
                        {formatFileSize(data.fileData.fileSize)}
                      </td>
                      <td className="px-4 py-3">
                        {" "}
                        <button>
                          <DownloadSimple size={20} weight="bold" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
};

export default SubmitVideo;
