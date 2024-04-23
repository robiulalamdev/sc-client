import { Outlet, useLocation } from "react-router-dom";
import Header from "../Shared/UserPanel/Header";
import Sidebar from "../Shared/UserPanel/Sidebar";
import ChatBot from "../Shared/UserPanel/ChatBot";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  return (
    <div className="h-screen">
      <Header user={user} />
      <div style={{ height: "calc(100vh - 97px )" }}>
        <div className="flex h-full">
          {location.pathname !== "/user/purchase-credit" && (
            <Sidebar user={user} />
          )}
          <div className="mr-8 mb-8 ml-8 p-10 bg-white rounded-3xl w-full overflow-y-auto no_scrollbar">
            <Outlet />
            {user?.role === "USER" && <ChatBot />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
