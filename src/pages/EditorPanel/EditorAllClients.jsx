import { useEffect, useState } from "react";
import Loading from "../../Shared/Loading";
import MyWorkTable from "../../components/EditorPanel/EditorDashboard/MyWorkTable";
import EditroSectionTitle from "../../components/EditorPanel/EditorSectionTitle/EditroSectionTitle";
import useLoading from "../../hooks/useLoading";
import { MyWorkTableData } from "../../utils/data";
import { useGetAllProjectsQuery } from "../../features/project/projectApi";
import { useSelector } from "react-redux";

const EditorAllClients = () => {
  const [filter, setFilter] = useState("All");
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
                                   
    // const setFilter = newFilter data
  };

  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAllProjectsQuery(`editor=${user?._id}`);

  const result =
    data &&
    data.reduce((acc, project) => {
      const lastProject = data.filter(
        (i) => i?.creator?._id === project?.creator?._id
      );
      const existingProject = acc.find(
        (item) => item?.id === project?.creator?._id
      );
      if (existingProject) {
        existingProject.projectCount++;
      } else {
        acc.push({
          name: project.creator.name,
          id: project?.creator?._id,
          projectCount: 1,
          lastProject: lastProject[0],
          image: project?.creator?.image,
        });
      }
      return acc;
    }, []);

  console.log(result, "result");


  useEffect(() => {
    console.log("data", data)
  }, [data])


  // const filteredData = repeatedData.filter((item) =>
  //   filter === "All"
  //     ? true
  //     : filter === "Active"
  //     ? item.status === "In Progress" || item.status === "New Project"
  //     : filter === "Completed"
  //     ? item.status === "Approved"
  //     : true
  // );
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

          <MyWorkTable filteredData={result} />
        </>
      )}
    </>
  );
};

export default EditorAllClients;
