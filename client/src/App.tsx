import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./pages/Loading";
import { ToastProvider } from "./components/ToastProvider";
import Dashboard from "./pages/Dashboard";

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
    element: <Dashboard />,
  },
]);

const App = () => {
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

export default App;
