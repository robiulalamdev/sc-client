import { useState } from "react";

import { internalUserData } from "../../utils/data";
import InternalSectionTitle from "../../components/AdminPanel/InternalUsers/InternalSectionTitle";
import InternalTable from "../../components/AdminPanel/InternalUsers/InternalTable";

const InternalUsers = () => {
  const [filter, setFilter] = useState("All");
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const filteredData = internalUserData.filter((item) => {
    switch (filter) {
      case "All":
        return true;
      case "Admin":
        return item.role === "Admin";
      case "Account Manager":
        return item.role === "Account Manager";
      case "Editor":
        return item.role === "Editor";
      default:
        return false;
    }
  });

  return (
    <>
      <InternalSectionTitle
        handleFilterChange={handleFilterChange}
        filter={filter}
      />
      <InternalTable filteredData={filteredData} />
    </>
  );
};

export default InternalUsers;
