import { Plus } from "@phosphor-icons/react";
import playIcon from "../../../assets/created.svg";
import Swal from "sweetalert2";
import { setActiveBrif } from "../../../features/project/projectSlice";
import { useDispatch } from "react-redux";

const SelectBrand = ({ save, isLoading, projectData, editing, setEditing }) => {
  const dispatch = useDispatch();
  const handleContinue = async (activeBrif) => {
    try {
      const res = await save({
        projectId: projectData?._id,
        brandKit: "So Creative",
      });

      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        // push("/dashboard");

        !editing && activeBrif && dispatch(setActiveBrif(activeBrif));
        setEditing(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };
  return (
    <div className="border rounded-xl p-6 mb-6">
      <p className="text-lg font-semibold mb-6">Select Brand Kit</p>
      <div className="flex items-center gap-6 mb-6">
        <label className="border-indigo-600 border text-center rounded-xl p-2 w-[120px] h-[124px] text-sm font-semibold">
          <div className="text-end">
            <input type="radio" name="ratio" checked />
          </div>

          <div className="w-[48px] h-[48px] rounded-full mx-auto">
            <img
              className="w-full h-full rounded-full object-contain"
              src={playIcon}
              alt=""
            />
          </div>
          <p>SoCreative</p>
        </label>
        <div className="border border-dashed rounded-xl w-[120px] h-[120px] flex flex-col items-center justify-center">
          <Plus className="text-indigo-600 mb-2" size={24} weight="bold" />
          <p className="text-slate-500 text-xs font-semibold">Add New</p>
        </div>
      </div>
      <button
        disabled={isLoading}
        className="primary_btn disabled:bg-indigo-300"
        onClick={() => handleContinue("ratio")}
      >
        {isLoading ? "Loading..." : "Continue"}
      </button>
    </div>
  );
};

export default SelectBrand;
