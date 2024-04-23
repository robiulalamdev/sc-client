import { useState } from "react";
import { useDropzone } from "react-dropzone";
import mp4 from "../../../assets/mp4.svg";
import SelectedVideo from "./SelectedVideo";

const UploadVideo = ({ setOpedUploadVideoModal }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles?.length > 0) {
        setSelectedVideo(acceptedFiles[0]);
      }
    },
    multiple: false,
  });

  return (
    <div className="border border-dashed rounded-xl text-center mt-5">
      {!selectedVideo && (
        <div {...getRootProps()} className="p-12">
          <input {...getInputProps()} />
          <img className="m-auto mb-5" src={mp4} alt="" />
          <p className="text-lg font-semibold mb-1">Upload a File or</p>
          <p className="text-sm text-slate-500 font-medium">
            Click to browse or drag & drop video files here
          </p>
        </div>
      )}
      {selectedVideo && (
        <SelectedVideo
          selectedVideo={selectedVideo}
          setOpedUploadVideoModal={setOpedUploadVideoModal}
        />
      )}
    </div>
  );
};

export default UploadVideo;
