import express from "express";
import { getAllComplaints, getEmployeeComplaints, submitComplaint } from "../controllers/complaint.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {upload} from "../middlewares/multer.js";

const router = express.Router();
// Submit new complaint
router.post("/submit", isAuthenticated, upload.array("documents", 5), submitComplaint);

// Get all Complaints
router.get("/all", isAuthenticated, getAllComplaints);

// get employee complaints
router.get("/:id", isAuthenticated, getEmployeeComplaints);

export default router;