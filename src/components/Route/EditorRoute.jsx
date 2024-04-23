import { Navigate } from "react-router-dom";
import { useAuthEditor } from "../../hooks/useAuthEditor";

const EditorRoute = ({ children }) => {
  const isEditorLoggedIn = useAuthEditor();
  return isEditorLoggedIn ? children : <Navigate to="/" />;
};

export default EditorRoute;
