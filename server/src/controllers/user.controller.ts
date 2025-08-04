import { Response } from "express";
import { AuthenticationRequest } from "../middlewares/isAuthenticated.js";
import { mysqlPool } from "../config/index.js";
import { IUser } from "./auth.controller.js";
import { Project } from "../models/project.model.js";
import { isValidEmail } from "../utils/validators.js";

export const getUserProfile = async (
  req: AuthenticationRequest,
  res: Response
): Promise<any> => {
  try {
    const userId = req.id;
    const [user] = await mysqlPool.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const [userData] = user as IUser[];

    res.status(200).json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        createdAt: userData.created_at,
      },
    });

    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot get your profile data",
    });
    return;
  }
};

export const getUserProjects = async (
  req: AuthenticationRequest,
  res: Response
) => {
  try {
    const userId = req.id;

    const [projects] = await mysqlPool.execute(
      "SELECT project_id FROM user_projects WHERE user_id = ?",
      [userId]
    );

    let projectIds: string[] = [];

    (projects as { project_id: string }[]).forEach((e) => {
      projectIds.push(e.project_id);
    });

    let projectData = [];
    for (let i = 0; i < projectIds.length; ++i) {
      const data = await Project.findById(projectIds[i]).select(
        "name description techs members isPublic createdAt _id"
      ); // Getting only specific data to show in frontend
      if (data) {
        projectData.push(data);
      }
    }

    res.status(200).json({
      success: true,
      projects: projectData,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot get your projects data",
    });
    return;
  }
};
