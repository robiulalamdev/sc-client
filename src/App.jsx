import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/Routes";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authChecked = useAuthCheck();
  return authChecked ? <RouterProvider router={router} /> : <div></div>;
}

export default App;
