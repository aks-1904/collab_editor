import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createProject } from "../controllers/project.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createProject);

export default router;
