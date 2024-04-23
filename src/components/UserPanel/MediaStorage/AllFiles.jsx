import { useState } from "react";
import FolderCard from "./FolderCard";
import VideoCard from "./VideoCard";
import { mediaStorage } from "../../../utils/data";

const AllFiles = ({ data }) => {
  const folders = data?.folders;
  const videos = data?.files;
  const combinedItems = data?.folders ? folders.concat(videos) : data;

  const [clickedItem, setClickedItem] = useState(null);

  return (
    <div className="grid grid-cols-5 gap-6">
      {combinedItems?.length > 0 ? (
        combinedItems.map((item, index) => (
          <div
            key={index}
            className="border p-10 rounded-xl  hover:bg-slate-50 transition-all duration-300 ease-in"
          >
            {item.folderData && (
              <FolderCard
                folder={item.folderData}
                setClickedItem={setClickedItem}
                clickedItem={clickedItem}
              />
            )}
            {item.fileData && (
              <VideoCard
                video={item.fileData}
                setClickedItem={setClickedItem}
                clickedItem={clickedItem}
              />
            )}
            {!item.fileData && !item.folderData && (
              <VideoCard
                video={item}
                setClickedItem={setClickedItem}
                clickedItem={clickedItem}
              />
            )}
          </div>
        ))
      ) : (
        <p>There is no data</p>
      )}
    </div>
  );
};

export default AllFiles;
