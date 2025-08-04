import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  addMember,
  createProject,
  getProjectDetails,
} from "../controllers/project.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createProject);
router.route("/:id").get(isAuthenticated, getProjectDetails);
router.route("/add-member").post(isAuthenticated, addMember);

export default router;
