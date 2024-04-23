import React, { useState } from "react";
import { useGetAllProjectsQuery } from "../../features/project/projectApi";
import Loading from "../../Shared/Loading";
import EditroSectionTitle from "../../components/EditorPanel/EditorSectionTitle/EditroSectionTitle";
import MyWorkTable from "../../components/EditorPanel/EditorDashboard/MyWorkTable";
import { useSelector } from "react-redux";

const EditorProjects = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAllProjectsQuery(`editor=${user?._id}`);

  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Last Modified");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSort = (a, b) => {
    if (sortBy === "Alphabetical") {
      return a.projectTitle.localeCompare(b.projectTitle);
    } else {
      return b?.createdAt - a?.createdAt;
    }
  };

  const handleFilter = (item) => {
    if (filter === "Active") {
      return item.status === "In Progress";
    } else if (filter === "Completed") {
      return item.status === "Exported";
    } else {
      return true;
    }
  };

  const sortedData = data && data.length > 0 ? [...data].sort(handleSort) : [];

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <EditroSectionTitle
        filter={filter}
        handleFilterChange={handleFilterChange}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />

      <MyWorkTable filteredData={sortedData.filter(handleFilter)} />
    </>
  );
};

export default EditorProjects;
