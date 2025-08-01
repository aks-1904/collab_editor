import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  getUserProfile,
  getUserProjects,
  searchUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/projects").get(isAuthenticated, getUserProjects);
router.route("/search").get(isAuthenticated, searchUser);

export default router;
