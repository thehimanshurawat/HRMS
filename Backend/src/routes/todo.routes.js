import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getTodo, setTodo } from "../controllers/todo.controller.js";


const router = express.Router();
router.post("/todo",isAuthenticated,setTodo)
router.get("/todo",isAuthenticated,getTodo)


export default router;