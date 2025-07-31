import { useState } from "react";
import { X, Zap } from "lucide-react";
import { useProject } from "../../hooks/useProject";
import Button from "../Button";

const CreateProject = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false); // false = private
  const { loading, createProject } = useProject();

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!name.trim()) return;
    setName("");
    setIsPublic(false);
    const res = await createProject({ name, description, isPublic });
    if (res) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 w-96 max-w-sm mx-4 shadow-2xl transform animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Fill the details</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-xl transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          Fill the following details and your project will be ready within
          seconds.
        </p>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            placeholder="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-20 max-h-64 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            value={isPublic ? "public" : "private"}
            onChange={(e) => setIsPublic(e.target.value === "public")}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <Button onClick={handleConfirm} className="flex-1" loading={loading}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
