import { Code2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((store) => store.user);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Code2 className="h-8 w-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Collab-Editor
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-300 cursor-default hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-800/50 rounded-lg">
                    Create Project
                  </span>
                  <span className="text-red-500 cursor-default hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-800/50 rounded-lg">
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <span
                    onClick={() =>
                      navigate("/auth", {
                        state: {
                          isLogin: true,
                        },
                      })
                    }
                    className="text-gray-300 cursor-default hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-800/50 rounded-lg"
                  >
                    Login
                  </span>{" "}
                  <span
                    onClick={() =>
                      navigate("/auth", {
                        state: {
                          isLogin: false,
                        },
                      })
                    }
                    className="text-gray-300 cursor-default hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-800/50 rounded-lg"
                  >
                    Create Account
                  </span>
                </>
              )}

              <button
                onClick={() => {
                  isAuthenticated
                    ? navigate("/dashboard")
                    : navigate("/auth", {
                        state: {
                          isLogin: true,
                        },
                      });
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-gray-900/95 backdrop-blur-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {!isAuthenticated
            ? ["Create Project", "Logout"].map((item) => (
                <span
                  key={item}
                  className={`text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-gray-800/50 rounded-lg ${
                    item === "Logout" && "text-red-500 hover:text-red-600"
                  }`}
                >
                  {item}
                </span>
              ))
            : ["Login", "Create Account"].map((item) => (
                <span
                  key={item}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-gray-800/50 rounded-lg"
                >
                  {item}
                </span>
              ))}
          <button
            onClick={() => {
              isAuthenticated
                ? navigate("/dashboard")
                : navigate("/auth", {
                    state: {
                      isLogin: true,
                    },
                  });
            }}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
