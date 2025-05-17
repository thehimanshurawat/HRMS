import express from "express";
import { applyLeave, getAllLeaves, getEmployeeLeaves, updateLeaveStatus } from "../controllers/leave.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/apply", isAuthenticated, applyLeave);

// router.get("/all", isAuthenticated, getAllLeaves);

router.put("/:id", isAuthenticated, updateLeaveStatus);

router.get("/:id", isAuthenticated, getEmployeeLeaves);

export default router;