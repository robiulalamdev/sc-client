import { useState } from "react";
import AllVideo from "../../components/UserPanel/AllVideos/AllVideo";
import AllVideoHeader from "../../components/UserPanel/AllVideos/AllVideoHeader";
import AllVideoFileLayout from "../../components/UserPanel/AllVideos/AllVideoFileLayout";
import { videos } from "../../utils/data";
import useLoading from "../../hooks/useLoading";
import Loading from "../../Shared/Loading";
import { useGetUserAllFilesQuery } from "../../features/videos/videoApi";

const AllVideos = () => {
  const [sortBy, setSortBy] = useState("Last Modified");
  const [selectedComponent, setSelectedComponent] = useState("folder");

  const { data, isLoading } = useGetUserAllFilesQuery();

  const handleSort = (a, b) => {
    if (sortBy === "Alphabetical") {
      return a.title.localeCompare(b.title);
    } else {
      return b?.createdAt - a?.createdAt;
    }
  };

  const sortedData = data && data.length > 0 ? [...data].sort(handleSort) : [];

  const handleComponentChange = (filter) => {
    setSelectedComponent(filter);
  };
  return (
    <div className="h-full">
      <AllVideoHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleComponentChange={handleComponentChange}
        selectedComponent={selectedComponent}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {selectedComponent === "folder" ? (
            <AllVideo filteredVideos={sortedData} />
          ) : (
            <AllVideoFileLayout filteredVideos={sortedData} />
          )}
        </>
      )}
    </div>
  );
};

export default AllVideos;
