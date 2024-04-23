import React, { useState } from "react";
import { useAddFileMutation } from "../../../features/videos/videoApi";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../config/config";
import * as tus from "tus-js-client";

const SelectedVideo = ({ selectedVideo, setOpedUploadVideoModal }) => {
  const [addFile, { isLoading }] = useAddFileMutation();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const handleUploadFile = async () => {
    setLoading(true);
    try {
      const vimeoRes = await fetch(
        `${BASE_API_URL}/v1/vimeo/create-video-instant`,
        {
          method: "POST",
          body: JSON.stringify({ size: selectedVideo.size }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await vimeoRes.json();
      const { upload_link } = result.data;

      const tusUpload = new tus.Upload(selectedVideo, {
        endpoint: upload_link,
        uploadUrl: upload_link,
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        },

        onError: (error) => {
          console.error("Failed to upload", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error?.message}`,
          });
        },

        onSuccess: async () => {
          const formData = id
            ? {
                title: selectedVideo.name,
                path: result.data.player_embed_url,
                size: selectedVideo.size,
                parentFolderId: id,
              }
            : {
                title: selectedVideo.name,
                path: result.data.player_embed_url,
                size: selectedVideo.size,
              };

          const uploadRes = await addFile(formData);
          if (uploadRes?.error?.error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${res?.error?.error}`,
            });
          }
          if (uploadRes?.error?.data?.message) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${uploadRes?.error?.data?.message}`,
            });
          }
          if (uploadRes?.data?.success) {
            setLoading(false);
            setOpedUploadVideoModal(false);
          }
        },
      });

      tusUpload.start();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
      setLoading(false);
    }
  };

  return (
    <div className="text-center border-t border-dashed p-6">
      <div>
        <video className="rounded-xl mb-4 h-[500px] w-full" controls>
          <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm font-medium">{selectedVideo.name}</p>
        <p className="text-slate-500 font-normal text-xs">
          {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
        </p>

        <button
          className="py-2 px-5 rounded-full bg-indigo-600 text-white text-sm mt-3"
          onClick={handleUploadFile}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default SelectedVideo;
