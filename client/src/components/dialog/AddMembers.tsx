import { Search, X } from "lucide-react";
import { useState } from "react";
import type { User } from "../../store/slices/userSlice";
import Button from "../Button";
import { useProject } from "../../hooks/useProject";

export interface UserCard extends User {
  avatar: string;
  isAdded?: boolean;
}

const AddMember = ({ isOpen, onClose, projectId }: any) => {
  const [email, setEmail] = useState("");
  const [searchResults] = useState<UserCard[]>([]);
  const { addMember, addMemberLoading } = useProject();

  const handleAddMember = async () => {
    if (email.trim() === "") return;
    const res = await addMember({ projectId, email });
    if (res) setEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 w-96 max-w-sm mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Add Team Member</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-xl transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            placeholder="Search by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none transition-all duration-200"
          />
        </div>

        {addMemberLoading && (
          <div className="text-center py-4">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {user.name}
                    </p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg hover:bg-blue-500/30 border border-blue-500/30 transition-all duration-200">
                  Add
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <Button
            onClick={handleAddMember}
            disabled={email.trim() === ""}
            className={`${addMemberLoading && "hidden"}`}
          >
            Add Member
          </Button>
          <Button className="my-2" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
