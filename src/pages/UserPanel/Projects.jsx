import React, { useState } from "react";
import ProjectsHeader from "../../components/UserPanel/Projects/ProjectsHeader";
import Loading from "../../Shared/Loading";
import { useGetUserAllFilesQuery } from "../../features/videos/videoApi";
import AllVideo from "../../components/UserPanel/AllVideos/AllVideo";
import AllVideoFileLayout from "../../components/UserPanel/AllVideos/AllVideoFileLayout";
import AllProjects from "../../components/UserPanel/Projects/AllProjects";
import AllProjectFileLayout from "../../components/UserPanel/Projects/AllProjectFileLayout";
import { useGetUserProjectsQuery } from "../../features/project/projectApi";

const Projects = () => {
  const [selectedComponent, setSelectedComponent] = useState("folder");

  const { data, isLoading } = useGetUserProjectsQuery("");
  const handleComponentChange = (filter) => {
    setSelectedComponent(filter);
  };
  return (
    <div className="h-full">
      <ProjectsHeader
        handleComponentChange={handleComponentChange}
        selectedComponent={selectedComponent}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {selectedComponent === "folder" ? (
            // <AllVideo filteredVideos={data} />
            <AllProjects data={data} />
          ) : (
            // <AllVideoFileLayout filteredVideos={filteredVideos} />
            <AllProjectFileLayout data={data} />
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
