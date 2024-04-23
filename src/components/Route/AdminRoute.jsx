import { Navigate } from "react-router-dom";
import { useAuthAdmin } from "../../hooks/useAuthAdmin";

const AdminRoute = ({ children }) => {
  const isAdminLoggedIn = useAuthAdmin();
  return isAdminLoggedIn ? children : <Navigate to="/" />;
};

export default AdminRoute;
