import React, { useState } from "react";
import Loading from "../../Shared/Loading";
import EditroSectionTitle from "../../components/EditorPanel/EditorSectionTitle/EditroSectionTitle";
import useLoading from "../../hooks/useLoading";
import { MyWorkTableData } from "../../utils/data";
import AllClients from "../../components/AdminPanel/InternalUsers/AllClients";

const Companies = () => {
  const { isLoading } = useLoading();
  const [filter, setFilter] = useState("All");
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const repeatedData = Array.from({ length: 5 }, () => MyWorkTableData).flat();

  const filteredData = repeatedData.filter((item) =>
    filter === "All"
      ? true
      : filter === "Active"
      ? item.status === "In Progress" || item.status === "New Project"
      : filter === "Completed"
      ? item.status === "Approved"
      : true
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <EditroSectionTitle
            filter={filter}
            handleFilterChange={handleFilterChange}
          />

          <AllClients filteredData={filteredData} repeatedData={repeatedData} />
        </>
      )}
    </>
  );
};

export default Companies;
