import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { isLoggedIn, navigate } = useAuth();
  return !isLoggedIn ? children : <Navigate to={navigate} />;
};

export default PublicRoute;
