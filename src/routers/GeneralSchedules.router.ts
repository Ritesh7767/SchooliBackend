import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { addGeneralSchedule, deleteGeneralSchedule, getGeneralSchedule, updateGeneralSchedule } from "../controllers/GeneralSchedule.controller";
import { isTeacher } from "../middleware/isTeacher.middleware";

const router = Router()

router.route("/").get(auth, getGeneralSchedule).post(auth, isTeacher, addGeneralSchedule)
router.route("/:_id").patch(auth, isTeacher, updateGeneralSchedule).delete(auth, isTeacher, deleteGeneralSchedule)

export default router