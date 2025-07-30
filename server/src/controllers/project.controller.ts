import { Response } from "express";
import { AuthenticationRequest } from "../middlewares/isAuthenticated.js";
import { mysqlPool } from "../config/index.js";
import { isValidName } from "../utils/validators.js";
import { Project } from "../models/project.model.js";

export const createProject = async (
  req: AuthenticationRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, description, isPublic } = req.body;
    if (!name) {
      res.status(400).json({
        success: false,
        message: "Name is required",
      });
      return;
    }

    if (!isValidName(name)) {
      res.status(400).json({
        success: false,
        message: "Invalid project name",
      });
      return;
    }

    const userId = req.id;

    // 🔍 Check if the user already has a project with the same name
    const existingProject = await Project.findOne({
      owner: userId,
      name: { $regex: new RegExp(`^${name}$`, "i") }, // to make search case-insensitive
    });

    if (existingProject) {
      res.status(409).json({
        success: false,
        message: "You already have a project with this name",
      });
      return;
    }

    let project;

    // ✅ Create new project
    if (description) {
      project = await Project.create({
        name,
        description,
        owner: userId,
        isPublic: !!isPublic,
      });
    } else {
      project = await Project.create({
        name,
        owner: userId,
        isPublic: !!isPublic,
      });
    }

    // Link project to user in SQL
    await mysqlPool.execute(
      `INSERT INTO user_projects (user_id, project_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE project_id = project_id`,
      [userId, project._id]
    );

    res.status(200).json({
      success: true,
      project,
    });
    return;
  } catch (error) {
    console.error("Project creation error:", error);
    res.status(500).json({
      success: false,
      message: "Cannot create project, try again later",
    });
    return;
  }
};
