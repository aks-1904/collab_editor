import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

const Toast: React.FC<Toast & { onClose: (id: string) => void }> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles =
      "relative flex items-start gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ease-out";

    const typeStyles = {
      success: "bg-emerald-900/90 border-emerald-700/50 text-emerald-100",
      error: "bg-red-900/90 border-red-700/50 text-red-100",
      warning: "bg-amber-900/90 border-amber-700/50 text-amber-100",
      info: "bg-blue-900/90 border-blue-700/50 text-blue-100",
    };

    const animationClasses =
      isVisible && !isExiting
        ? "translate-x-0 opacity-100 scale-100"
        : isExiting
        ? "translate-x-full opacity-0 scale-95"
        : "translate-x-full opacity-0 scale-95";

    return `${baseStyles} ${typeStyles[type]} ${animationClasses}`;
  };

  const getIcon = () => {
    const iconProps = { size: 20, className: "flex-shrink-0 mt-0.5" };

    switch (type) {
      case "success":
        return (
          <CheckCircle
            {...iconProps}
            className={`${iconProps.className} text-emerald-400`}
          />
        );
      case "error":
        return (
          <AlertCircle
            {...iconProps}
            className={`${iconProps.className} text-red-400`}
          />
        );
      case "warning":
        return (
          <AlertTriangle
            {...iconProps}
            className={`${iconProps.className} text-amber-400`}
          />
        );
      case "info":
        return (
          <Info
            {...iconProps}
            className={`${iconProps.className} text-blue-400`}
          />
        );
    }
  };

  const getProgressBarColor = () => {
    const colors = {
      success: "bg-emerald-400",
      error: "bg-red-400",
      warning: "bg-amber-400",
      info: "bg-blue-400",
    };
    return colors[type];
  };

  return (
    <div className={getToastStyles()}>
      <div className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-b-xl w-full overflow-hidden">
        <div
          className={`h-full ${getProgressBarColor()}`}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      {getIcon()}

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        {message && (
          <p className="text-xs opacity-90 leading-relaxed">{message}</p>
        )}
      </div>

      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
        aria-label="Close notification"
      >
        <X
          size={16}
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        />
      </button>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
