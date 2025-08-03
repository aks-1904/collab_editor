import axios from "axios";
import { isValidProjectName } from "../utils/validators";
import { useToast } from "./useToast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMyProject, setSelectedProject } from "../store/slices/projectSlice";
import { useState } from "react";

interface ProjectCredential {
  name: string;
  description: string;
  isPublic: boolean;
}

const PROJECT_API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/project`; // Backend project api url

export function useProject() {
  const showToast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const createProject = async ({
    name,
    description,
    isPublic,
  }: ProjectCredential) => {
    setLoading(true);
    try {
      // Checking for valid data
      if (!name) throw new Error("Project Name is required");
      if (name.length < 3 || name.length > 50)
        throw new Error("Project name should be between 3 to 50 characters");
      if (!isValidProjectName(name))
        throw new Error(
          "Invalid Project name, (letters, numbers, dashes, underscores, and spaces) allowed"
        );

      // Create project api call
      const res = await axios.post(
        `${PROJECT_API_URL}`,
        {
          name,
          description,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(addMyProject(res.data?.project)); // adding project data to redux store
        showToast({
          type: "success",
          title: "Project Created",
          message: `Project (${res.data?.project?.name}) Created successfully`,
          duration: 4000,
        });
        navigate(`/project/${res.data?.project?._id}`);
      }
      return true;
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Internal server error, try again later";
      showToast({
        type: "error",
        title: "Failed",
        message: errorMsg,
        duration: 2000,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getProjectDetails = async (id: string) => {
    try {
      setLoading(true);
      if (!id) return;

      const res = await axios.get(`${PROJECT_API_URL}/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data?.isAllowedToSee) {
        dispatch(setSelectedProject(res.data?.project));
      } else if (!res.data?.isAllowedToSee) {
        navigate("/dashboard", {
          replace: true,
        });
        throw new Error("You are not allowed to see the project details");
      }
    } catch (error: any) {
      navigate("/dashboard", {
        replace: true,
      });
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Internal server error, try again later";

      showToast({
        type: "error",
        title: "Failed",
        message: errorMsg,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return { createProject, loading, getProjectDetails };
}
