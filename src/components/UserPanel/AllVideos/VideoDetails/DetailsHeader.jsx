import { CaretRight } from "@phosphor-icons/react";
import aveter1 from "../../.././../assets/aveter1.svg";
import aveter2 from "../../.././../assets/aveter2.svg";

const DetailsHeader = ({ setShowExperienceModal, data, isLoading }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-10">
      <div className="flex items-center gap-1 text-xl font-bold">
        <p className="text-indigo-600">Projects</p>
        <CaretRight size={20} weight="bold" />
        <p>{data?.projectTitle}</p>
      </div>
      <div className="flex items-center gap-3.5">
        {/* <div className="flex items-center">
          <img className="h-10 w-10 rounded-full" src={aveter1} alt="" />
          <img className="-ml-3 h-10 w-10 rounded-full" src={aveter2} alt="" />
          <button className="bg-slate-900 rounded-full w-10 h-10 border-2 border-white -ml-3 text-white text-base font-semibold">
            +2
          </button>
        </div> */}
        <button className="bg-indigo-600 text-white py-2.5 px-[30px]  rounded-full text-sm font-semibold ">
          Share
        </button>
        {data?.status !== "Exported" && data?.exportedUrl && (
          <button
            button
            onClick={() => setShowExperienceModal(true)}
            // onClick={handleApprove}
            disabled={isLoading || !data?.exportedUrl}
            className="bg-green-500 text-white py-2.5 px-[30px]  rounded-full text-sm font-semibold "
          >
            {isLoading ? "Approving..." : "Approve"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailsHeader;
