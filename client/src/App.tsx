import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useAppSelector } from "./store/store";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { useEffect } from "react";
import { useUser } from "./hooks/useUser";

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
]);

const App = () => {
  const token = localStorage.getItem("token");
  const { user } = useAppSelector((store) => store.user);
  const { getUserProfile } = useUser();

  useEffect(() => {
    if (token && !user) {
      getUserProfile();
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
