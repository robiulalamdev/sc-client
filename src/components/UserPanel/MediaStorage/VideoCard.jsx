import { DotsThreeOutline, DownloadSimple, Trash } from "@phosphor-icons/react";
import mp4 from "../../../assets/mp4.svg";
import { formatFileSize, truncateFilename } from "../../../utils/converter";
import { useState } from "react";
import Deleting from "../../../Modal/Deleting";

const VideoCard = ({ video, setClickedItem, clickedItem }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [title, setTitle] = useState(null);
  console.log("video", video);
  const handleClick = (e, id) => {
    e.stopPropagation();
    if (clickedItem === id) {
      setClickedItem(null);
    } else {
      setClickedItem(id);
    }
  };

  const handleDownload = () => {
    const videoLink = video.file;
    const anchor = document.createElement("a");
    anchor.href = videoLink;
    anchor.download = video.name;

    anchor.click();
  };
  return (
    <div>
      <div className="text-center relative">
        <button
          className="absolute -top-6 -right-6"
          onClick={(e) => handleClick(e, video._id)}
        >
          <DotsThreeOutline
            className="text-slate-500"
            size={20}
            weight="fill"
          />
        </button>
        {clickedItem === video?._id && (
          <div
            className="absolute top-0 -right-40 z-40 bg-white w-[196px]  shadow-xl  rounded-xl "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDownload}
              className="text-sm font-medium flex items-center gap-3 px-4 py-3 border-b w-full"
            >
              <DownloadSimple size={16} weight="bold" /> Download
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModal(true);
                setTitle(video.title);
              }}
              className="text-sm font-medium flex items-center gap-3 px-4 py-3 w-full"
            >
              <Trash size={16} weight="bold" /> Delete
            </button>
          </div>
        )}
        <img className="m-auto mb-2" src={mp4} alt="" />
        <p className="text-base font-bold mb-2">
          {truncateFilename(video.title)}
        </p>
        <p className="text-slate-400 text-xs">
          {formatFileSize(video.fileSize)}
        </p>
      </div>
      {deleteModal && (
        <Deleting
          setDeleteModal={setDeleteModal}
          folderTitle={title}
          clickedItem={clickedItem}
          setClickedItem={setClickedItem}
          file={video}
        />
      )}
    </div>
  );
};

export default VideoCard;
