import { useState } from "react";
import Loading from "../../Shared/Loading";
import MyWorkTable from "../../components/EditorPanel/EditorDashboard/MyWorkTable";
import EditroSectionTitle from "../../components/EditorPanel/EditorSectionTitle/EditroSectionTitle";
import useLoading from "../../hooks/useLoading";
import { MyWorkTableData } from "../../utils/data";
import { useGetAllProjectsQuery } from "../../features/project/projectApi";

const EditorAllProjects = () => {
  const [sortBy, setSortBy] = useState("Last Modified");
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const { data, isLoading } = useGetAllProjectsQuery(
    "editor=none&status=Pending"
  );

  const handleSort = (a, b) => {
    if (sortBy === "Alphabetical") {
      return a.projectTitle.localeCompare(b.projectTitle);
    } else {
      return b?.createdAt - a?.createdAt;
    }
  };

  const sortedData = data && data.length > 0 ? [...data].sort(handleSort) : [];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <EditroSectionTitle
            filter={filter}
            handleFilterChange={handleFilterChange}
            setSortBy={setSortBy}
            sortBy={sortBy}
          />

          <MyWorkTable filteredData={sortedData} />
        </>
      )}
    </>
  );
};

export default EditorAllProjects;
