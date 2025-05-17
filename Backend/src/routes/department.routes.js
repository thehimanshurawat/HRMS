import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getDepartmentOfEmployee } from "../controllers/department.controller.js";

const router = express.Router();

router.get("/department",isAuthenticated, getDepartmentOfEmployee);

export default router;