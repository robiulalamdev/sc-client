import { useSelector } from "react-redux";
import active from "../../assets/active.svg";

const ProfileActive = () => {
  const { user } = useSelector((state) => state.auth);
  const firstLetter = user.name.slice(0, 2);

  return (
    <div className="relative">
      {user?.image ? (
        <div className="h-12 w-12 rounded-full cursor-pointer ">
          <img
            src={user.image}
            alt=""
            className="h-full w-full object-cover rounded-full"
          />
        </div>
      ) : (
        <button className="text-white uppercase text-sm font-semibold h-12 w-12 cursor-pointer bg-[#4F16A5] rounded-full p-3">
          {firstLetter}
        </button>
      )}
      <img className="absolute bottom-0 -right-1" src={active} alt="" />
    </div>
  );
};

export default ProfileActive;
