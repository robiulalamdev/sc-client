import { useSelector } from "react-redux";

export const useAuthEditor = () => {
  const auth = useSelector((state) => state.auth);
  if (auth?.accessToken && auth?.user.role === "EDITOR") {
    return true;
  } else {
    return false;
  }
};
