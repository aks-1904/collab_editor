import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const { state } = useLocation();
  const [isLogin, setIsLogin] = useState(state?.isLogin ? true : false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async () => {
    setLoading(true);

    console.log(isLogin ? "Login" : "Register", formData);
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8 relative overflow-hidden">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-400">
                {isLogin
                  ? "Sign in to your account to continue"
                  : "Join us and start your journey today"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Name field - only for register */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isLogin
                      ? "max-h-0 opacity-0 overflow-hidden"
                      : "max-h-20 opacity-100"
                  }`}
                >
                  {!isLogin && (
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange("name")}
                      icon={User}
                      required={!isLogin}
                    />
                  )}
                </div>

                {/* Email field */}
                <div className="transition-all duration-300">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    icon={Mail}
                    required
                  />
                </div>

                {/* Password field */}
                <div className="transition-all duration-300">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    icon={Lock}
                    showPasswordToggle
                    required
                  />
                </div>

                {/* Confirm Password field - only for register */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isLogin
                      ? "max-h-0 opacity-0 overflow-hidden"
                      : "max-h-20 opacity-100"
                  }`}
                >
                  {!isLogin && (
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange("confirmPassword")}
                      icon={Lock}
                      showPasswordToggle
                      required={!isLogin}
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full"
                loading={loading}
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            {/* Toggle Mode */}
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={toggleMode}
                className="w-full"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
