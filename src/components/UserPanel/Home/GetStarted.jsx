import { useDispatch } from "react-redux";
import { setShowCreateModal } from "../../../features/project/projectSlice";
import { details } from "../../../utils/data";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (item) => {
    console.log(item);
    if (item === "New Projects") {
      dispatch(setShowCreateModal(true));
    }
    if (item === "Edit Video") {
      Swal.fire({
        icon: "info",
        title: "Comming Soon!",
        customClass: {
          confirmButton: "custom-confirm-button-class",
        },
      });
    }
    if (item === "Upload Brand") {
      navigate("/user/brand-kit");
    }
    if (item === "Access Files") {
      navigate("/user/media-storage");
    }
  };
  return (
    <div>
      <p className=" text-xl font-semibold mb-5">Get Started</p>
      <div className="grid grid-cols-4 gap-6">
        {details.length > 0 ? (
          details.map((data, index) => (
            <div key={index}>
              <div
                className={`${data.bgColor} w-full h-[178px] rounded-xl flex items-center justify-center p-4 mb-4`}
              >
                <button
                  onClick={() => handleClick(data.name)}
                  className={`${data.buttonBg} flex text-white font-bold text-base items-center gap-3 py-2 pl-2 pr-4 rounded-[72px]`}
                >
                  {data.icon}
                  {data.name}
                </button>
              </div>
              <p className=" font-bold text-base">{data.title}</p>
            </div>
          ))
        ) : (
          <p>There is no data</p>
        )}
      </div>
    </div>
  );
};

export default GetStarted;
