import express from "express";
import { forgotPassword, login, logout, resetpassword } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.put("/resetpassword",resetpassword );



export default router;