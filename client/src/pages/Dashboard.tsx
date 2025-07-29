import { useState } from "react";
import {
  X,
  Plus,
  UserPlus,
  Check,
} from "lucide-react";
import Navbar from "../components/Navbar";
import UserProjectCard from "../components/dashboard/UserProjectCard";
import CollaborativeProjectCard from "../components/dashboard/CollaborativeProjectCard";
import OpenSourceProjectCard from "../components/dashboard/OpenSourceProjectCard";
const Dashboard = () => {
  // Mock data for demonstration
  const [userProjects] = useState([
    {
      id: 1,
      name: "E-commerce Platform",
      description:
        "Full-stack React and Node.js e-commerce solution with advanced analytics",
      members: 4,
      status: "Active",
      lastUpdated: "2 hours ago",
      tech: ["React", "Node.js", "MongoDB"],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: "Task Management App",
      description:
        "Collaborative task management with real-time updates and AI insights",
      members: 2,
      status: "In Progress",
      lastUpdated: "1 day ago",
      tech: ["Vue.js", "Firebase"],
      gradient: "from-green-500 to-teal-600",
    },
  ]);

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
          <div className="lg:col-span-3 space-y-12">
            {/* My Projects */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-white">My Projects</h2>
                  <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                    {userProjects.length} active
                  </div>
                </div>
                <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-medium">
                  <Plus size={18} className="mr-2" />
                  New Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProjects.map((project) => (
                  <UserProjectCard key={project.id} projectData={project} />
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <UserPlus className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-lg">Join Requests</h3>
              </div>

              {joinRequests.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-sm">No pending requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {joinRequests.map((request) => (
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
