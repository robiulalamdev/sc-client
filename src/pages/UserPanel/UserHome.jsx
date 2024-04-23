import { CaretRight } from "@phosphor-icons/react";
import Loading from "../../Shared/Loading";
import GetStarted from "../../components/UserPanel/Home/GetStarted";
import InProgressVideo from "../../components/UserPanel/Home/InProgressVideo";
import RecentVideos from "../../components/UserPanel/Home/RecentVideos";
import { useGetUserProjectsQuery } from "../../features/project/projectApi";
import { useGetUserAllFilesQuery } from "../../features/videos/videoApi";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { data, isLoading } = useGetUserAllFilesQuery();
  const { data: projects, isLoading: getingProjects } =
    useGetUserProjectsQuery("status=Pending");
  console.log(projects, "projects");
  return (
    <div>
      {data?.length > 0 && <div className="flex items-center gap-3 mb-6">
        <p className=" text-xl font-bold">Recent Projects</p>
        <Link
          to="/user/projects"
          className="flex items-center gap-1 text-indigo-600"
        >
          <span className=" text-base  font-semibold">All Projects</span>
          <CaretRight size={20} weight="bold" />
        </Link>
      </div>}
      {isLoading || getingProjects ? (
        <Loading />
      ) : (
        data?.length>0 && <>
          <InProgressVideo data={projects} />
          <RecentVideos data={data} />
        </>
      )}

      <GetStarted />
    </div>
  );
};

export default UserHome;
