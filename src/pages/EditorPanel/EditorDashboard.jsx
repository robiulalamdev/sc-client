import { User } from "@phosphor-icons/react";
import Loading from "../../Shared/Loading";
import InsightsCard from "../../components/EditorPanel/EditorDashboard/InsightsCard";
import MyWorkTable from "../../components/EditorPanel/EditorDashboard/MyWorkTable";
import RecentActivities from "../../components/EditorPanel/EditorDashboard/RecentActivities";
import { useGetAllProjectsQuery } from "../../features/project/projectApi";
import useLoading from "../../hooks/useLoading";
import { useSelector } from "react-redux";

const EditorDashboard = () => {
  // const { isLoading } = useLoading();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAllProjectsQuery("");

  const myTasks =
    data && data?.length > 0
      ? data.filter((i) => i?.editor?._id === user._id)
      : [];
  const newTasks =
    data && data?.length > 0 ? data.filter((i) => i?.status === "Pending") : [];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="editordashboard">
          <div className="grid grid-cols-12 gap-10">
            {/* Insights start */}
            <div className="col-span-8">
              <div className="insights_wrapper pb-10">
                <div className="seciton_heading pb-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Insights
                  </h3>
                </div>
                <InsightsCard
                  data={myTasks}
                  myTasks={
                    myTasks.length
                  }
                  newTasks={newTasks.length}
                />
              </div>

              <div className="seciton_heading pb-6">
                <h3 className="text-2xl font-bold text-slate-900">My Work</h3>
              </div>

              <MyWorkTable filteredData={myTasks.slice(0, 5)} />
            </div>
            {/* Insights -/end */}

            {/* Recent Activities start */}
            <div className="col-span-4">
              <div className="recent_activites">
                <div className="seciton_heading pb-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Recent Activities
                  </h3>
                </div>
                <RecentActivities />
              </div>
            </div>
            {/* Recent Activities -/end */}
          </div>
        </section>
      )}
    </>
  );
};

export default EditorDashboard;
