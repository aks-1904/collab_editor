import {
  ArrowRight,
  GitBranch,
  Play,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    "Real-time collaboration",
    "Inline commenting",
    "File management",
    "Live cursors",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((store) => store.user);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-300">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Enjoy Coding !</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Code Together,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Create Forever
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of collaborative coding with{" "}
              <span className="text-blue-400 font-semibold transition-all duration-500">
                {features[currentFeature]}
              </span>
              <br />
              Build amazing projects with your team in real-time.
            </p>
          </div>

          <div
            onClick={() => {
              isAuthenticated
                ? navigate("/dashboard")
                : navigate("/auth", {
                    replace: true,
                  });
            }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Start Coding Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Collab</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="h-4 w-4 text-green-400" />
              <span>Build</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span>Debug</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating code snippets */}
      <div className="absolute top-20 left-10 opacity-20 transform rotate-12 animate-float">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-xs font-mono text-green-400">
          const collab = new Editor()
        </div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 transform -rotate-12 animate-float-delayed">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-xs font-mono text-blue-400">
          git push origin feature
        </div>
      </div>
    </div>
  );
};

export default Hero;
