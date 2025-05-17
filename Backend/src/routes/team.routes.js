import express from "express";
import { getTeamById, getTeamMembers } from "../controllers/team.controller.js";
import { isAuthenticated, isCEO } from "../middlewares/auth.js";

const router = express.Router();


router.get("/all", getTeamMembers);
router.get("/:id",isAuthenticated, getTeamById);


export default router