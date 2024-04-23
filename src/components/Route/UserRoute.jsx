import { Navigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";

const UserRoute = ({ children }) => {
  const isUserLoggedIn = useAuthUser();
  return isUserLoggedIn ? children : <Navigate to="/" />;
};

export default UserRoute;
