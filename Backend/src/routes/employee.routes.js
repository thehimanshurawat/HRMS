import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { addNewEmployee, deleteEmployee, getAllEmployees, getEmployee, getLoggedInEmployee, updateEmployee } from "../controllers/employee.controller.js";
import {upload} from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", isAuthenticated, upload.single("profileImg"), addNewEmployee);

router.get("/all",isAuthenticated, getAllEmployees);

router.get("/current-user", isAuthenticated, getLoggedInEmployee);

router.route("/:id")
    .get(isAuthenticated, isAuthorized("get"), getEmployee)
    .put(isAuthenticated, isAuthorized("update"), upload.single("profileImg"),updateEmployee)
    .delete(isAuthenticated, isAuthorized("delete"), deleteEmployee)


export default router;