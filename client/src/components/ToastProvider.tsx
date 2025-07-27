import { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";
import type { Toast as ToastType } from "./Toast";
import { v4 as uuid } from "uuid";

type ToastContextType = {
  showToast: (toast: Omit<ToastType, "id">) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = useCallback((toast: Omit<ToastType, "id">) => {
    const newToast = { ...toast, id: uuid() };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-[320px] max-w-full">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
