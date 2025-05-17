import express from "express";
import { isAuthenticated, isAuthorized, isCEO } from "../middlewares/auth.js";
import { createPayroll, deletePayroll, getAllpayroll, getPayroll, updatePayroll } from "../controllers/payroll.controller.js";


const router = express.Router();

// Get specific payrolls

// Add new payroll
router.post("/new",isAuthenticated,isCEO,createPayroll)

// Get all payrolls
router.get("/all",isAuthenticated,isCEO,getAllpayroll)

router.route("/:id")
    .get(isAuthenticated, isAuthorized("get"), getPayroll)
    .put(isAuthenticated, isCEO, updatePayroll)
    .delete(isAuthenticated, isCEO, deletePayroll)

export default router