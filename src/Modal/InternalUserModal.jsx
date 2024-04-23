import InsightsCard from "../components/EditorPanel/EditorDashboard/InsightsCard";
import close from "../assets/close.svg";
import aveter from "../assets/aveter1.svg";
import RecentWorks from "../components/AdminPanel/InternalUsers/RecentWorks";

const InternalUserModal = ({ setUserModal }) => {
  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-full bg-[#00000080] backdrop-blur-xl flex items-center justify-center">
      <div className="max-w-[1152px] max-h-[90vh] overflow-y-auto no_scrollbar w-full bg-white text-black rounded-2xl relative">
        <div className="flex justify-between gap-4 p-6 border-b">
          <div className="flex items-center gap-3">
            <img className="h-10 w-10 rounded-full" src={aveter} alt="" />
            <div>
              <p className="text-lg font-semibold">Brooklyn Simmons</p>
              <p className="text-slate-600 text-sm font-normal">
                Joined September 1, 2023
              </p>
            </div>
          </div>

          <button onClick={() => setUserModal(false)}>
            <img src={close} alt="" />
          </button>
        </div>
        <div className="p-10">
          <div className="insights_wrapper pb-10">
            <div className="seciton_heading pb-6">
              <h3 className="text-2xl font-bold text-slate-900">Insights</h3>
            </div>
            <InsightsCard />
          </div>

          <div className="seciton_heading pb-6">
            <h3 className="text-2xl font-bold text-slate-900">Recent Works</h3>
          </div>
          <RecentWorks />
        </div>
      </div>
    </div>
  );
};

export default InternalUserModal;
