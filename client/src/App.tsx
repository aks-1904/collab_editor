import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useAppSelector } from "./store/store";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { useEffect } from "react";
import { useUser } from "./hooks/useUser";
import Loading from "./pages/Loading";
import ProjectDetails from "./pages/ProjectDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/project/:id",
    element: <ProjectDetails />,
  },
]);

const App = () => {
  const token = localStorage.getItem("token");
  const { user } = useAppSelector((store) => store.user);
  const { getUserProfile, loading } = useUser();

  useEffect(() => {
    if (token && !user) {
      getUserProfile();
    }
  }, []);

  return loading ? <Loading /> : <RouterProvider router={router} />;
};

export default App;
