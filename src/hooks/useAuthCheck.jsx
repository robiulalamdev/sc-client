import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";
import Cookies from "js-cookie";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const cookieAuth = Cookies.get("soCreativeAuth");

    if (cookieAuth) {
      const auth = JSON.parse(cookieAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
};

export default useAuthCheck;
