import { Link } from "react-router-dom";
import Loading from "../../../Shared/Loading";
// import { RecentActivites } from "../../../utils/data";
import { useMyActivitiesQuery } from "../../../features/activities/activitiesApi";
import { useMemo, useState } from "react";

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const { data, isLoading } = useMyActivitiesQuery(null);

  useMemo(() => {
    if (data?.data?.length > 0) {
      setActivities(data?.data);
    }
  }, [data?.data]);

  // console.log("My Activities: ", activities);
  // const repeatedData = Array.from({ length: 5 }, () => RecentActivites).flat();
  return (
    <div className="recent_activities_wrapper border border-slate-200 rounded-2xl h-[650px] overflow-y-scroll no_scrollbar">
      {activities.length > 0 &&
        !isLoading &&
        activities.map((activityItem, index) => (
          <div
            className="activity_card flex gap-2 border-b border-b-slate-200 p-[22px]"
            key={index}
          >
            <div className="left_activity_card">
              {activityItem.user?.image ? (
                <img src={activityItem.user?.image} alt="activity_img" />
              ) : (
                <button className="text-white uppercase text-sm font-semibold h-12 w-12 cursor-pointer bg-[#4F16A5] rounded-full p-3">
                  {activityItem?.user.name.slice(0, 2)}
                </button>
              )}
            </div>
            <div className="right_activity_card">
              <h3 className="text-base font-semibold text-slate-900 pb-3">
                {activityItem.user?.name}
                <span
                  className={`${
                    activityItem.user?.role === "Editor"
                      ? "bg-blue-500 text-xs font-bold text-white py-2 px-2 rounded ml-[6px]"
                      : "bg-[#4F16A5] text-xs font-bold text-white py-2 px-2 rounded ml-[6px]"
                  }`}
                >
                  {activityItem.user?.role}
                </span>
              </h3>
              <p className="text-sm font-normal text-slate-700 pb-2">
                {activityItem?.type} by{" "}
                <span className="font-bold">{activityItem?.detailes}</span>
                <Link to={"#"} className="text-amber-600 ml-1">
                  @{activityItem?.user?.name}
                </Link>
              </p>
              <p className="text-slate-500 text-xs font-medium">
                {new Date(activityItem.createdAt).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        ))}

      {isLoading && <Loading />}
    </div>
  );
};

export default RecentActivities;
