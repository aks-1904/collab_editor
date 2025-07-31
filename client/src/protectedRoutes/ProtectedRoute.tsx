import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((store) => store.user);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/auth"} replace />;
};

export default ProtectedRoute;
