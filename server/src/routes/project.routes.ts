import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createProject,
  getProjectDetails,
} from "../controllers/project.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createProject);
router.route("/:id").get(isAuthenticated, getProjectDetails);

export default router;
