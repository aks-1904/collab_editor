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
import { useState } from "react";
import AddMember, { type UserCard } from "../components/dialog/AddMembers";
import FileTree from "../components/FileTree";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import type { Project } from "../store/slices/projectSlice";
import { getTimeSinceCreated } from "../utils/time";
import { countFiles, getTotalSize } from "../utils/helpers";
import MembersCard from "../components/MembersCard";
import UpdateProject from "../components/dialog/UpdateProject";

const ProjectDetails = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [updateProjectDialog, setUpdateProjectDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.user);
  const isAllowedToEdit = false;

  const [members] = useState<UserCard[]>([
    {
      id: "1",
      name: "Alex Thompson",
      email: "alex@example.com",
      avatar: "AT",
    },
    {
      id: "2",
      name: "Maria Garcia",
      email: "maria@example.com",
      avatar: "MG",
    },
    {
      id: "3",
      name: "David Kim",
      email: "david@example.com",
      avatar: "DK",
    },
    {
      id: "4",
      name: "Lisa Wang",
      email: "lisa@example.com",
      avatar: "LW",
    },
  ]);

  const project: Project = {
    _id: "project_id",
    name: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.",
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
    stars: 24,
    owner: "",
    members: [],
    __v: 1,
    isPublic: true,
  };

  // Mock file structure following the MongoDB schema
  const fileStructure = [
    {
      id: "src-folder",
      name: "src",
      type: "folder",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-03-01T14:20:00Z",
      children: [
        {
          id: "components-folder",
          name: "components",
          type: "folder",
          createdAt: "2024-01-15T10:35:00Z",
          updatedAt: "2024-02-28T16:45:00Z",
          children: [
            {
              id: "header-jsx",
              name: "Header.jsx",
              type: "file",
              language: "jsx",
              content:
                'import React from "react";\n\nconst Header = () => {\n  return (\n    <header className="header">\n      <h1>E-commerce</h1>\n    </header>\n  );\n};\n\nexport default Header;',
              createdAt: "2024-01-15T10:40:00Z",
              updatedAt: "2024-02-20T09:15:00Z",
            },
            {
              id: "footer-jsx",
              name: "Footer.jsx",
              type: "file",
              language: "jsx",
              content:
                'import React from "react";\n\nconst Footer = () => {\n  return (\n    <footer className="footer">\n      <p>&copy; 2024 E-commerce Platform</p>\n    </footer>\n  );\n};\n\nexport default Footer;',
              createdAt: "2024-01-15T10:42:00Z",
              updatedAt: "2024-02-18T11:30:00Z",
            },
            {
              id: "product-card-jsx",
              name: "ProductCard.jsx",
              type: "file",
              language: "jsx",
              content:
                'import React from "react";\n\nconst ProductCard = ({ product }) => {\n  return (\n    <div className="product-card">\n      <img src={product.image} alt={product.name} />\n      <h3>{product.name}</h3>\n      <p>${product.price}</p>\n    </div>\n  );\n};\n\nexport default ProductCard;',
              createdAt: "2024-01-16T14:20:00Z",
              updatedAt: "2024-02-25T13:45:00Z",
            },
          ],
        },
        {
          id: "pages-folder",
          name: "pages",
          type: "folder",
          createdAt: "2024-01-15T10:45:00Z",
          updatedAt: "2024-02-29T10:20:00Z",
          children: [
            {
              id: "home-jsx",
              name: "Home.jsx",
              type: "file",
              language: "jsx",
              content:
                'import React from "react";\nimport ProductGrid from "../components/ProductGrid";\n\nconst Home = () => {\n  return (\n    <div className="home">\n      <h1>Welcome to our Store</h1>\n      <ProductGrid />\n    </div>\n  );\n};\n\nexport default Home;',
              createdAt: "2024-01-16T09:30:00Z",
              updatedAt: "2024-02-22T15:10:00Z",
            },
          ],
        },
        {
          id: "app-jsx",
          name: "App.jsx",
          type: "file",
          language: "jsx",
          content:
            'import React from "react";\nimport { BrowserRouter as Router, Routes, Route } from "react-router-dom";\nimport Header from "./components/Header";\nimport Footer from "./components/Footer";\nimport Home from "./pages/Home";\nimport "./App.css";\n\nfunction App() {\n  return (\n    <Router>\n      <div className="App">\n        <Header />\n        <main className="main-content">\n          <Routes>\n            <Route path="/" element={<Home />} />\n          </Routes>\n        </main>\n        <Footer />\n      </div>\n    </Router>\n  );\n}\n\nexport default App;',
          createdAt: "2024-01-15T10:32:00Z",
          updatedAt: "2024-03-01T14:20:00Z",
        },
      ],
    },
    {
      id: "public-folder",
      name: "public",
      type: "folder",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T12:00:00Z",
      children: [
        {
          id: "index-html",
          name: "index.html",
          type: "file",
          language: "html",
          content:
            '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>E-commerce Platform</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>',
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-20T12:00:00Z",
        },
      ],
    },
    {
      id: "package-json",
      name: "package.json",
      type: "file",
      language: "json",
      content:
        '{\n  "name": "ecommerce-platform",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-router-dom": "^6.8.0"\n  },\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build"\n  }\n}',
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-02-15T16:30:00Z",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
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
              onClick={() => console.log("Button Clicked")}
              className="flex items-center px-6 py-3shadow-lg hover:shadow-purple-500/25 font-medium"
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
                {project.techs &&
                  project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-lg border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {project.stars}
                  </p>
                  <p className="text-gray-400 text-sm">Stars</p>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <File className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {countFiles(fileStructure)}
                  </p>
                  <p className="text-gray-400 text-sm">Files</p>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <Code className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {isNaN(getTotalSize(fileStructure) as unknown as number)
                      ? "0 MB"
                      : getTotalSize(fileStructure)}
                  </p>
                  <p className="text-gray-400 text-sm">Size</p>
                </div>
              </div>
            </div>

            {/* File Structure Preview */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">File Structure</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">
                    Last updated {getTimeSinceCreated(project.updatedAt)}
                  </span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-4 max-h-80 overflow-y-auto">
                <FileTree nodes={fileStructure} />
              </div>
            </div>
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
                <button
                  onClick={() => setShowAddMember(true)}
                  className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all duration-200"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {members.map((member) => (
                  <MembersCard
                    isOwner={member?.id === user?.id}
                    member={member}
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
                <button
                  onClick={() => setUpdateProjectDialog(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 text-gray-300 hover:text-white transition-all duration-200"
                >
                  <Pen className="w-4 h-4" />
                  <span className="text-sm">Update Project Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddMember
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
      />

      <UpdateProject
        isOpen={updateProjectDialog}
        onClose={() => setUpdateProjectDialog(false)}
      />
    </div>
  );
};

export default ProjectDetails;
