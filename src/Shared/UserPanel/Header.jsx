import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import search from "../../assets/search.svg";
import message from "../../assets/message-question.svg";
import help from "../../assets/help-black.svg";
import notification from "../../assets/notification.svg";
import notificationActive from "../../assets/notification-active.svg";
import { useRef, useState } from "react";
import Notification from "./Notification";
import Credit from "./Credit";
import Help from "./Help";
import ProfileActive from "./ProfileActive";
import ProfileDropdown from "./ProfileDropdown";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useSelector } from "react-redux";

const Header = ({ user }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showCredit, setShowCredit] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef(null);
  const creditRef = useRef(null);
  const helpRef = useRef(null);
  const profileRef = useRef(null);

  useOutsideClick(notificationRef, () => setShowNotification(false));
  useOutsideClick(creditRef, () => setShowCredit(false));
  useOutsideClick(helpRef, () => setShowHelp(false));
  useOutsideClick(profileRef, () => setShowProfile(false));

  return (
    <div>
      <div className="flex items-center justify-between gap-4 p-6">
        <div className="w-full flex items-center gap-6">
          <Link to="/">
            <img className="max-w-60 h-10" src={logo} alt="" />
          </Link>
          {/* <div className="flex items-center gap-5 rounded-full bg-white p-3 w-full max-w-xl">
            <img src={search} alt="" />
            <input
              className="w-full"
              type="search"
              placeholder="Search videos"
            />
          </div> */}
        </div>

        <div className="w-full flex justify-end items-center gap-4">
          {user?.role === "USER" && (
            <button
              onClick={() => setShowCredit(!showCredit)}
              className="bg-gradient-to-r from-purple-500 to-indigo-900 text-transparent bg-clip-text whitespace-nowrap hover:text-indigo-600 hover:border-indigo-600 transition-all duration-300 ease-in gradient_text text-sm font-semibold py-3 px-5 rounded-full border border-[#C67CFF]"
            >
              {user?.credit} Credits Remaining
            </button>
          )}

          {user?.role === "USER" && (
            <button
              onClick={() => setShowHelp(!showHelp)}
              className={`${
                showHelp ? "bg-slate-900" : "bg-white"
              }  rounded-full p-3`}
            >
              <img src={showHelp ? message : help} alt="" />
            </button>
          )}
          <div
            // ref={notifyButtonref}
            onClick={() => setShowNotification(!showNotification)}
            className="relative"
          >
            <button className="absolute -top-1 -right-1 border-2 border-slate-50 bg-red-600 px-[5px] rounded-full text-white text-sm font-semibold">
              8
            </button>

            <button
              className={`${
                showNotification ? "bg-slate-900" : "bg-white"
              }  rounded-full p-3`}
            >
              <img
                src={showNotification ? notificationActive : notification}
                alt=""
              />
            </button>
          </div>
          <div onClick={() => setShowProfile(!showProfile)}>
            <ProfileActive user={user} />
          </div>
        </div>
      </div>
      {showNotification && (
        <Notification
          setShowNotification={setShowNotification}
          notificationRef={notificationRef}
        />
      )}
      {showCredit && (
        <Credit setShowCredit={setShowCredit} creditRef={creditRef} />
      )}
      {showHelp && <Help setShowHelp={setShowHelp} helpRef={helpRef} />}
      {showProfile && (
        <ProfileDropdown
          setShowProfile={setShowProfile}
          profileRef={profileRef}
          user={user}
        />
      )}
    </div>
  );
};

export default Header;
