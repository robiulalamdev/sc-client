import { useSelector } from "react-redux";

export const useAuthUser = () => {
  const auth = useSelector((state) => state.auth);
  if (auth?.accessToken && auth?.user.role === "USER") {
    return true;
  } else {
    return false;
  }
};
