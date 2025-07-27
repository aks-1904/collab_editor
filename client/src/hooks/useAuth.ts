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
  setUser,
  setUserLoading,
} from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

// Typescript interface
interface CreateAccountCredential {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AUTH_API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`; // Backend authentication api url

export const useAuth = () => {
  const showToast = useToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const navigate = useNavigate();

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

  return { register, loading };
};
