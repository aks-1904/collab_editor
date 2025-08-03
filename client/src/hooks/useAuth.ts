import axios from "axios";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../utils/validators";
import { useToast } from "./useToast";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  loginFailure,
  logoutUser,
  setUser,
  setUserLoading,
} from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setCollabProjects, setMyProjects } from "../store/slices/projectSlice";

// Typescript interface
interface CreateAccountCredential {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginCredential {
  email: string;
  password: string;
}

const AUTH_API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`; // Backend authentication api url

export const useAuth = () => {
  const showToast = useToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const navigate = useNavigate();

  const login = async ({ email, password }: LoginCredential) => {
    dispatch(setUserLoading(true));

    try {
      showToast({
        type: "info",
        title: "Please Wait...",
        message: "Be patient, It won't take long",
        duration: 1000,
      });

      // Checking for valid data
      if (!isValidEmail(email)) throw new Error("Invalid email");
      if (!isValidPassword(password)) throw new Error("Invalid credentials");

      // Login api call
      const res = await axios.post(
        `${AUTH_API_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.success) {
        localStorage.setItem("token", res?.data?.token);
        dispatch(setUser(res?.data?.user));
        showToast({
          type: "success",
          title: "Success!",
          message: res?.data?.message || "Login successfully",
          duration: 2000,
        });
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error: any) {
      dispatch(loginFailure()); // State setting to initial
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Internal server error, try again later";
      showToast({
        type: "error",
        title: "Registration Failed",
        message: errorMsg,
        duration: 5000,
      });
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  const register = async ({
    name,
    email,
    password,
    confirmPassword,
  }: CreateAccountCredential) => {
    dispatch(setUserLoading(true));

    try {
      showToast({
        type: "info",
        title: "Please Wait...",
        message: "Be patient, It won't take long",
        duration: 1000,
      });

      // Checking for valid data
      if (!isValidName(name)) throw new Error("Invalid name");
      if (!isValidEmail(email)) throw new Error("Invalid email");
      if (!isValidPassword(password))
        throw new Error(
          "password must atleast contain 1 uppercase, 1 lowercase, 1 number and 1 special character"
        );
      if (password !== confirmPassword)
        throw new Error("Passwords do not match");

      // Register API call
      const res = await axios.post(
        `${AUTH_API_URL}/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res?.data?.success) {
        localStorage.setItem("token", res?.data?.token);
        dispatch(setUser(res?.data?.user));
        showToast({
          type: "success",
          title: "Success!",
          message: res?.data?.message || "Registered successfully",
          duration: 2000,
        });
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error: any) {
      dispatch(loginFailure()); // State setting to initial
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Internal server error, try again later";
      showToast({
        type: "error",
        title: "Registration Failed",
        message: errorMsg,
        duration: 5000,
      });
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    dispatch(setMyProjects([]));
    dispatch(setCollabProjects([]));
    localStorage.removeItem("token");
    sessionStorage.removeItem("hasFetchedUserProjects");
    showToast({
      type: "success",
      title: "Logout",
      message: "Logged out successfully",
      duration: 3000,
    });
    navigate("/auth", {
      replace: true,
      state: {
        isLogin: true,
      },
    });
  };

  return { register, loading, login, logout };
};
