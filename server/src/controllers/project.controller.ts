import { Response } from "express";
import { AuthenticationRequest } from "../middlewares/isAuthenticated.js";
import { mysqlPool } from "../config/index.js";
import { isValidEmail, isValidName } from "../utils/validators.js";
import { Project } from "../models/project.model.js";
import mongoose from "mongoose";
import { IUser } from "./auth.controller.js";

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
      [userId, (project._id as mongoose.Schema.Types.ObjectId).toString()]
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

export const getProjectDetails = async (
  req: AuthenticationRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.id;

    if (!id) {
      res.status(402).json({
        message: "Cannot get project data",
        isAllowedToSee: false,
      });
      return;
    }

    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
        isAllowedToSee: false,
      });
      return;
    }

    const ownerId = project.owner.toString();
    const memberIds = project.members.map((m: any) => m.toString());

    // Prepare SQL placeholders and parameters
    const userIdsToFetch = [ownerId, ...memberIds];
    const placeholders = userIdsToFetch.map(() => "?").join(",");

    // Fetch users from SQL
    const [rows]: any = await mysqlPool.execute(
      `SELECT id, name, email FROM users WHERE id IN (${placeholders})`,
      userIdsToFetch
    );

    // Separate owner and members
    const owner = rows.find((u: any) => u.id === ownerId);
    const members = rows.filter((u: any) => memberIds.includes(u.id));

    // Construct project object with detailed owner and members
    const projectWithUserData = {
      ...project.toObject(),
      owner,
      members,
    };

    const isOwner = ownerId === userId?.toString();
    const isMember = memberIds.includes(userId?.toString());

    // Public access
    if (project.isPublic) {
      res.status(200).json({
        project: projectWithUserData,
        isAllowedToSee: true,
      });
      return;
    }

    // Owner or member access
    if (userId && (isOwner || isMember)) {
      res.status(200).json({
        project: projectWithUserData,
        isAllowedToSee: true,
      });
      return;
    }

    // Unauthorized
    res.status(401).json({
      isAllowedToSee: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot get project details",
      isAllowedToSee: false,
    });
  }
};

export const addMember = async (req: AuthenticationRequest, res: Response) => {
  try {
    // getting logged in user data
    const loggedInUserEmail = req.email;
    const loggedInUserId = req.id;

    const { email, projectId } = req.body; // Data required to add members

    // Validate input
    if (!email || !projectId || !isValidEmail(email)) {
      res.status(404).json({
        success: false,
        message: "Email or projectId missing",
      });
      return;
    }

    // Checking project exists
    const [project] = await mysqlPool.execute(
      "SELECT user_id from user_projects where project_id = ?",
      [projectId]
    );
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    // Checking if request from the owner or not
    if ((project as any[])[0].user_id.toString() !== loggedInUserId) {
      res.status(401).json({
        success: false,
        message: "Only owner can add members",
      });
      return;
    }

    // Owner cannot add himself
    if (email.toString() === loggedInUserEmail?.toString()) {
      res.status(403).json({
        success: false,
        message: "You cannot add yourself",
      });
      return;
    }

    // Checking the given email is related to any valid user ornot
    const [user] = await mysqlPool.execute(
      "SELECT id, name, email from users where email = ?",
      [email]
    );
    if ((user as IUser[]).length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Adding member to mongoose
    const projectData = await Project.findById(projectId);
    if (!projectData?.members.includes((user as IUser[])[0].id.toString())) {
      projectData?.members.push((user as IUser[])[0].id.toString());
      await projectData?.save();
    }

    res.status(200).json({
      success: true,
      message: "Member added",
      user: { // User data which has been added
        id: (user as IUser[])[0].id,
        email: (user as IUser[])[0].email,
        name: (user as IUser[])[0].name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot add member",
    });
    return;
  }
};
