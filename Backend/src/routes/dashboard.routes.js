import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getDashboardData ,getUserDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", isAuthenticated, getDashboardData);
router.get("/user-dashboard", isAuthenticated, getUserDashboard);

export default router;