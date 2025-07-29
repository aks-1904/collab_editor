import { Check, UserPlus, X } from "lucide-react";

interface JoinRequest {
  id: number;
  projectName: string;
  requester: string;
  message: string;
  timeAgo: string;
  avatar: string;
}

interface Props {
  projectData: JoinRequest[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationPanel = ({ projectData, open, setOpen }: Props) => {
  return (
    <div
      className={`fixed top-0 right-0 h-screen z-[999] transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      } w-full md:w-[400px]`}
    >
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-none md:rounded-2xl p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <UserPlus className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-bold text-white text-lg">Join Requests</h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 space-y-4">
          {projectData.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 text-sm">No pending requests</p>
            </div>
          ) : (
            projectData.map((request) => (
              <div
                key={request.id}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-sm font-bold">
                    {request.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm mb-1">
                      {request.requester}
                    </p>
                    <p className="text-gray-400 text-xs mb-2">
                      wants to join{" "}
                      <span className="text-blue-400">
                        {request.projectName}
                      </span>
                    </p>
                    <p className="text-gray-300 text-xs mb-4 leading-relaxed bg-gray-900/50 p-2 rounded-lg border border-gray-700/30">
                      "{request.message}"
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">
                        {request.timeAgo}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-green-400 hover:text-white hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 rounded-lg transition-all duration-200">
                          <Check size={14} />
                        </button>
                        <button className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all duration-200">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
