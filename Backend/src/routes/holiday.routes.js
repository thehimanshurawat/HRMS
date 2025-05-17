import express from "express";
import { isAuthenticated} from "../middlewares/auth.js";
import { addHoliday, getAllHolidays, deleteHoliday } from "../controllers/holiday.controller.js";

const router = express.Router();

router.post("/add",isAuthenticated, addHoliday);

router.get("/all",isAuthenticated, getAllHolidays);

router.delete("/:id",isAuthenticated, deleteHoliday);


export default router;