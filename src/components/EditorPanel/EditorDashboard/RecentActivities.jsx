import { Link } from "react-router-dom";
import Loading from "../../../Shared/Loading";
import { RecentActivites } from "../../../utils/data";

const RecentActivities = () => {
  const repeatedData = Array.from({ length: 5 }, () => RecentActivites).flat();
  return (
    <div className="recent_activities_wrapper border border-slate-200 rounded-2xl h-[650px] overflow-y-scroll no_scrollbar">
      {repeatedData.length > 0 ? (
        repeatedData.map((activityItem, index) => (
          <div
            className="activity_card flex gap-2 border-b border-b-slate-200 p-[22px]"
            key={index}
          >
            <div className="left_activity_card">
              <img src={activityItem.img} alt="activity_img" />
            </div>
            <div className="right_activity_card">
              <h3 className="text-base font-semibold text-slate-900 pb-3">
                {activityItem.name}
                <span
                  className={`${
                    activityItem.type === "Editor"
                      ? "bg-blue-500 text-xs font-bold text-white py-2 px-2 rounded ml-[6px]"
                      : "bg-[#4F16A5] text-xs font-bold text-white py-2 px-2 rounded ml-[6px]"
                  }`}
                >
                  {activityItem.type}
                </span>
              </h3>
              <p className="text-sm font-normal text-slate-700 pb-2">
                Accepted the job for the{" "}
                <span className="font-bold">
                  Sales Strategies Video Series by
                </span>
                <Link to={"#"} className="text-amber-600 ml-1">
                  {activityItem?.mentionName}
                </Link>
              </p>
              <p className="text-slate-500 text-xs font-medium">
                {activityItem.dateTime}
              </p>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default RecentActivities;
