import { useEffect, useState } from "react";
import { Plus, Bell } from "lucide-react";
import Navbar from "../components/Navbar";
import UserProjectCard from "../components/dashboard/UserProjectCard";
import CollaborativeProjectCard from "../components/dashboard/CollaborativeProjectCard";
import OpenSourceProjectCard from "../components/dashboard/OpenSourceProjectCard";
import Button from "../components/Button";
import NotificationPanel from "../components/dashboard/NotificationPanel";
import CreateProject from "../components/dialog/CreateProject";
import { useUser } from "../hooks/useUser";
import { useAppSelector } from "../store/store";

const Dashboard = () => {
  // Mock data for demonstration

  const userProjects = useAppSelector((store) => store.project.my_projects);

  const [collaborativeProjects] = useState([
    {
      id: 3,
      name: "Open Learning Platform",
      description:
        "Educational platform for online courses with interactive content",
      owner: "Sarah Chen",
      role: "Frontend Developer",
      members: 8,
      lastUpdated: "5 hours ago",
    },
    {
      id: 4,
      name: "Weather Forecast API",
      description:
        "RESTful API for weather data aggregation with ML predictions",
      owner: "Mike Johnson",
      role: "Backend Developer",
      members: 3,
      lastUpdated: "3 days ago",
    },
  ]);

  const [joinRequests] = useState([
    {
      id: 1,
      projectName: "Social Media Dashboard",
      requester: "Alex Rodriguez",
      message:
        "I'd like to contribute to the frontend development with React expertise",
      timeAgo: "2 hours ago",
      avatar: "AR",
    },
    {
      id: 2,
      projectName: "Mobile Game Engine",
      requester: "Emma Wilson",
      message:
        "Experienced in Unity and C#, would love to help with core engine development",
      timeAgo: "1 day ago",
      avatar: "EW",
    },
  ]);

  const [openSourceProjects] = useState([
    {
      id: 1,
      name: "React Component Library",
      description: "Modern, accessible React components for web applications",
      stars: 1247,
      forks: 234,
      language: "TypeScript",
      contributors: 23,
      lastCommit: "2 days ago",
      trending: true,
    },
    {
      id: 2,
      name: "Machine Learning Toolkit",
      description: "Python toolkit for common ML operations and model training",
      stars: 892,
      forks: 156,
      language: "Python",
      contributors: 12,
      lastCommit: "1 week ago",
      trending: false,
    },
    {
      id: 3,
      name: "CSS Animation Framework",
      description: "Lightweight CSS animations and micro-interactions",
      stars: 654,
      forks: 89,
      language: "CSS",
      contributors: 8,
      lastCommit: "4 days ago",
      trending: true,
    },
  ]);

  const [openNotificationPanel, setOpenNotificationPanel] = useState(false);
  const [showCreateProjectDialog, setShowCreateProjectDialog] = useState(false);

  const { getUserProjects } = useUser();

  useEffect(() => {
    const hasFetched = sessionStorage.getItem("hasFetchedUserProjects");

    if (!hasFetched) {
      getUserProjects();
      sessionStorage.setItem("hasFetchedUserProjects", "true");
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
          {/* Main Content */}
          <div className="col-span-4 space-y-12">
            {/* My Projects */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex-1">
                  {userProjects.length !== 0 ? (
                    <div className="flex items-center space-x-3">
                      <h2 className="text-2xl font-bold text-white">
                        My Projects
                      </h2>
                      <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                        {userProjects.length} active
                      </div>
                    </div>
                  ) : (
                    <h2 className="text-3xl font-extrabold">Welcome</h2>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowCreateProjectDialog(true)}
                    className="flex items-center px-6 py-3 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-medium"
                  >
                    <Plus size={18} className="mr-2" />
                    New Project
                  </Button>
                  <button
                    className="hover:text-purple-500 transition-colors duration-200 relative"
                    onClick={() => setOpenNotificationPanel(true)}
                  >
                    <Bell />
                    <span className="absolute top-0 -right-2 bg-gradient-to-r rounded-full text-sm px-1 from-blue-500 to-purple-500 text-white aspect-square">
                      6
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProjects.map((project) => (
                  <UserProjectCard key={project._id} projectData={project} />
                ))}
              </div>
            </section>

            {/* Collaborative Projects */}
            <section>
              <div className="flex items-center space-x-3 mb-8">
                <h2 className="text-2xl font-bold text-white">
                  Collaborative Projects
                </h2>
                <div className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30">
                  {collaborativeProjects.length} joined
                </div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden">
                {collaborativeProjects.map((project, index) => (
                  <CollaborativeProjectCard key={index} projectData={project} />
                ))}
              </div>
            </section>

            {/* Open Source Projects */}
            <section>
              <div className="flex items-center space-x-3 mb-8">
                <h2 className="text-2xl font-bold text-white">
                  Open Source Projects
                </h2>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
                  Discover
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {openSourceProjects.map((project) => (
                  <OpenSourceProjectCard
                    projectData={project}
                    key={project.id}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <NotificationPanel
        open={openNotificationPanel}
        setOpen={setOpenNotificationPanel}
        projectData={joinRequests}
      />
      <CreateProject
        isOpen={showCreateProjectDialog}
        onClose={() => setShowCreateProjectDialog(false)}
      />
    </div>
  );
};

export default Dashboard;
