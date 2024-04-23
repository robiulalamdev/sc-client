import { useState } from "react";
import AllFiles from "../../components/UserPanel/MediaStorage/AllFiles";
import MediaHeader from "../../components/UserPanel/MediaStorage/MediaHeader";
import MediaTable from "../../components/UserPanel/MediaStorage/MediaTable";
import Loading from "../../Shared/Loading";
import CreateFolderModal from "../../Modal/CreateFolderModal";
import { useGetUserDriveQuery } from "../../features/videos/videoApi";
import UploadVideoModal from "../../Modal/UploadVideoModal";

const MediaStorage = () => {
  const [selectedComponent, setSelectedComponent] = useState("folder");

  const handleComponentChange = (filter) => {
    setSelectedComponent(filter);
  };
  const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
  const [openUploadVideo, setOpedUploadVideoModal] = useState(false);

  const { data, isLoading: getingDrive } = useGetUserDriveQuery();

  return (
    <div className="h-full">
      <MediaHeader
        selectedComponent={selectedComponent}
        handleComponentChange={handleComponentChange}
        setOpenCreateFolderModal={setOpenCreateFolderModal}
        setOpedUploadVideoModal={setOpedUploadVideoModal}
      />
      {openCreateFolderModal && (
        <CreateFolderModal
          setOpenCreateFolderModal={setOpenCreateFolderModal}
          folderTitle={null}
          clickedItem={null}
          setClickedItem={null}
        />
      )}
      {openUploadVideo && (
        <UploadVideoModal setOpedUploadVideoModal={setOpedUploadVideoModal} />
      )}

      {getingDrive ? (
        <Loading />
      ) : (
        <>
          {selectedComponent === "folder" ? (
            <AllFiles data={data} />
          ) : (
            <MediaTable data={data} />
          )}
        </>
      )}
    </div>
  );
};

export default MediaStorage;
