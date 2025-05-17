import express from "express";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.js";
import { getAllEmployeesAttendance, getOneEmployeeAttendance, submitDailyTask } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/submit-task/:id", isAuthenticated, submitDailyTask);

router.get("/all", isAuthenticated, getAllEmployeesAttendance);

router.get("/:id", isAuthenticated, isAuthorized("get"), getOneEmployeeAttendance);

export default router;