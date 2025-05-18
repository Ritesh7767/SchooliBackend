import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { isTeacher } from "../middleware/isTeacher.middleware";
import { addSchedule, getSchedule } from "../controllers/schedule.controller";

const router = Router()

router.route("/").get(auth, isTeacher, getSchedule).post(auth, isTeacher, addSchedule)

export default router