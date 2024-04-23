import { useState } from "react";
import AllFiles from "../../components/UserPanel/MediaStorage/AllFiles";
import MediaTable from "../../components/UserPanel/MediaStorage/MediaTable";
import Loading from "../../Shared/Loading";
import {
  useGetFolderFileQuery,
  useGetUserDriveQuery,
} from "../../features/videos/videoApi";
import UploadVideoModal from "../../Modal/UploadVideoModal";
import FolderHeader from "../../components/UserPanel/MediaStorage/MeadiaFolder/FolderHeader";
import { useParams } from "react-router";

const Folder = () => {
  const [selectedComponent, setSelectedComponent] = useState("folder");

  const handleComponentChange = (filter) => {
    setSelectedComponent(filter);
  };

  const [openUploadVideo, setOpedUploadVideoModal] = useState(false);
  const { id } = useParams();
  const { data, isLoading } = useGetFolderFileQuery(id);

  return (
    <div className="h-full">
      <FolderHeader
        selectedComponent={selectedComponent}
        handleComponentChange={handleComponentChange}
        setOpedUploadVideoModal={setOpedUploadVideoModal}
        title={data?.title}
      />

      {openUploadVideo && (
        <UploadVideoModal setOpedUploadVideoModal={setOpedUploadVideoModal} />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {selectedComponent === "folder" ? (
            <AllFiles data={data.files} />
          ) : (
            <MediaTable data={data.files} />
          )}
        </>
      )}
    </div>
  );
};

export default Folder;
