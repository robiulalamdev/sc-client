import { Headset, SignOut, User } from "@phosphor-icons/react";
import ProfileActive from "./ProfileActive";
import { useRef, useState } from "react";
import AccountModal from "../../Modal/AccountModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
import Cookies from "js-cookie";
import useOutsideClick from "../../hooks/useOutsideClick";

const ProfileDropdown = ({ setShowProfile }) => {
  const [showAccount, setShowAccount] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const modalRef = useRef();
  useOutsideClick(modalRef, () => setShowProfile(false));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openAccountModal = () => {
    setShowAccount(true);
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    Cookies.remove("soCreativeAuth");
    navigate("/");
  };
  const items = [
    {
      icon: <User className="text-state-700" size={24} weight="bold" />,
      title: "Account Settings ",
      event: openAccountModal,
    },
    ...(user.role !== "ADMIN"
      ? [
          {
            icon: (
              <Headset className="text-state-700" size={24} weight="bold" />
            ),
            title: "Support",
          },
        ]
      : []),
    {
      icon: <SignOut className="text-state-700" size={24} weight="bold" />,
      title: "Logout ",
      event: handleLogout,
    },
  ];

  return (
    <div>
      <div
        ref={modalRef}
        className="fixed z-[9999] top-[84px] right-6  w-full max-h-[85vh] overflow-y-auto no_scrollbar  bg-white rounded-2xl shadow-2xl  max-w-[320px]"
      >
        <div className="flex items-center gap-3.5 p-5 border-b">
          <ProfileActive user={user} />
          <div>
            <p className="text-base font-bold mb-1">{user.name}</p>
            <p className="text-state-500 text-sm font-normal ">{user.email}</p>
          </div>
        </div>
        <div className="py-5 px-6 flex flex-col  gap-6">
          {items.length > 0 ? (
            items.map((data, index) => (
              <div
                onClick={
                  data?.event
                  // setShowProfile(false);
                  // setShowAccount(true);
                }
                className="flex items-center gap-3.5 cursor-pointer"
                key={index}
              >
                {data.icon}
                <p className="text-base font-medium">{data.title}</p>
              </div>
            ))
          ) : (
            <p>There is no data</p>
          )}
        </div>
      </div>

      {showAccount && <AccountModal setShowAccount={setShowAccount} />}
    </div>
  );
};

export default ProfileDropdown;
