import { X, Zap } from "lucide-react";

const LogoutDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: any;
  onConfirm: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 w-96 max-w-sm mx-4 shadow-2xl transform animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <Zap className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Confirm Logout</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-xl transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-300 mb-8 leading-relaxed">
          Are you sure you want to logout? You'll need to sign in again to
          access your projects and dashboard.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/25"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
