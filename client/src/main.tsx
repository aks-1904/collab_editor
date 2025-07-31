import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastProvider } from "./components/ToastProvider.tsx";
import Loading from "./pages/Loading.tsx";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ToastProvider>
  </StrictMode>
);
