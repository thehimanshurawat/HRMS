import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getEmployeeNotification, markAllNotificationsAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/all", isAuthenticated, getEmployeeNotification);

router.patch("/mark-as-read", isAuthenticated, markAllNotificationsAsRead);

export default router;