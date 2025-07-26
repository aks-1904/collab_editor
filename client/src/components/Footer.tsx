import { ArrowRight, Code2, Heart, Play } from "lucide-react";
import { useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated } = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1ap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Collab-Editor
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The future of collaborative coding. Build amazing projects
              together with your team in real-time.
            </p>
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
                <span>Create Project</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Collab-Editor. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a className="text-gray-400 hover:text-white transition-colors text-sm flex gap-2 items-center justify-center">
              <span>Made with</span>
              <Heart size={20} className="text-red-600" />
              <span>by Akshay Sharma</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
