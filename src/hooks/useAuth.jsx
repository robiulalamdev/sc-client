import { useSelector } from "react-redux";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken && auth?.user.role === "EDITOR") {
    return { isLoggedIn: true, navigate: "/editor" };
  } else if (auth?.accessToken && auth?.user.role === "USER") {
    return { isLoggedIn: true, navigate: "/user" };
  } else if (auth?.accessToken && auth?.user.role === "ADMIN") {
    return { isLoggedIn: true, navigate: "/admin" };
  } else {
    return false;
  }
};
