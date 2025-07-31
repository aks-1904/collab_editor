import axios from "axios";
import { useToast } from "./useToast";
import { setUser, setUserLoading } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setMyProjects } from "../store/slices/projectSlice";
import { useState } from "react";

const USER_API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;

export function useUser() {
  const showToast = useToast();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((store) => store.user);
  const [userProjectsLoading, setUserProjectsLoading] = useState(false);

  const getUserProfile = async () => {
    dispatch(setUserLoading(true));
    try {
      const res = await axios.get(`${USER_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      if (res.data?.success) {
        dispatch(setUser(res?.data?.user));
        showToast({
          type: "info",
          title: "Welcome",
          message: `Welcome Back ${res?.data?.user?.name}`,
          duration: 2000,
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Error!",
        message: "Unable to get your profile data",
        duration: 1000,
      });
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  const getUserProjects = async () => {
    setUserProjectsLoading(true);
    try {
      const res = await axios.get(`${USER_API_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      if (res.data?.success) {
        dispatch(setMyProjects(res.data?.projects));
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Projects",
        message: "Couldn't get your projects",
        duration: 4000,
      });
    } finally {
      setUserProjectsLoading(false);
    }
  };

  return { getUserProfile, loading, getUserProjects, userProjectsLoading };
}
