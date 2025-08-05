import {
  ArrowLeft,
  Clock,
  Code,
  Download,
  File,
  Pen,
  Play,
  Plus,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import AddMember from "../components/dialog/AddMembers";
import FileTree from "../components/FileTree";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { getTimeSinceCreated } from "../utils/time";
import { countFiles, getTotalSize } from "../utils/helpers";
import MembersCard from "../components/MembersCard";
import UpdateProject from "../components/dialog/UpdateProject";
import { useProject } from "../hooks/useProject";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { setSelectedProject } from "../store/slices/projectSlice";

const ProjectDetails = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [updateProjectDialog, setUpdateProjectDialog] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { getProjectDetails, loading } = useProject();
  const project = useAppSelector((store) => store.project.selected_project);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();

  // Redirect if id is not found
  useEffect(() => {
    if (!id) {
      navigate("/dashboard", { replace: true });
    }
  }, [id]);

  // Fetch project if it's not already loaded or mismatched
  useEffect(() => {
    if (id && (!project || project._id !== id)) {
      getProjectDetails(id);
    }
    if (project) {
      dispatch(setSelectedProject(project));
    }
  }, [id, project]);

  if (!id || !project) {
    return <Loading />;
  }

  const fileStructure = project.fileStructure;
  const members = project.members || [];

  const isOwner = project.owner?.id === user?.id;
  const isMember = members.some((member: any) => member.id === user?.id);
  const isAllowedToEdit = isOwner || isMember;
  const fileCount = countFiles(
    project?.fileStructure?.type === "folder"
      ? project.fileStructure.children
      : []
  );
  const fileSize = getTotalSize(
    project?.fileStructure?.type === "folder"
      ? project.fileStructure.children
      : []
  );

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            className="p-2 hover:bg-gray-800/50 rounded-xl transition-all duration-200"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {project.name}
            </h1>
            <p className="text-gray-400 mt-1">
              Created on {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
          {isAllowedToEdit && (
            <Button
              onClick={() => console.log("Start Working")}
              className="flex items-center px-6 py-3 shadow-lg hover:shadow-purple-500/25 font-medium"
            >
              <Play size={18} className="mr-2" />
              Start Working
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Info */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                About this project
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techs?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-lg border border-gray-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <StatsCard
                  icon={<Star className="text-yellow-400" />}
                  label="Stars"
                  value={project.stars}
                />
                <StatsCard
                  icon={<File className="text-green-400" />}
                  label="Files"
                  value={fileCount || "0"}
                />
                <StatsCard
                  icon={<Code className="text-purple-400" />}
                  label="Size"
                  value={fileSize || "0 MB"}
                />
              </div>
            </div>

            {/* File Structure */}
            {fileStructure && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">
                    File Structure
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">
                      Last updated {getTimeSinceCreated(project?.updatedAt)}
                    </span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-4 max-h-80 overflow-y-auto">
                  <FileTree nodes={fileStructure} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-white">Team Members</h3>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                    {members.length}
                  </span>
                </div>
                {isOwner && (
                  <button
                    onClick={() => setShowAddMember(true)}
                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all duration-200"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {project.owner && (
                  <MembersCard
                    key={project.owner.id}
                    isOwner={true}
                    member={project.owner}
                  />
                )}
                {members.map((member) => (
                  <MembersCard
                    key={member.id}
                    member={member}
                    isOwner={false}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 text-gray-300 hover:text-white transition-all duration-200">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Project</span>
                </button>
                {isAllowedToEdit && (
                  <button
                    onClick={() => setUpdateProjectDialog(true)}
                    className="w-full flex items-center space-x-3 p-3 text-left bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <Pen className="w-4 h-4" />
                    <span className="text-sm">Update Project Details</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddMember
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        projectId={id}
      />
      <UpdateProject
        isOpen={updateProjectDialog}
        onClose={() => setUpdateProjectDialog(false)}
      />
    </div>
  );
};

export default ProjectDetails;

// Utility Component for Stats
const StatsCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
    <div className="w-6 h-6 mx-auto mb-2">{icon}</div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);
