import { Router } from "express";
import { deleteTeacher, getAllTeachers, getTeacher, toggleAdmin, teacherLogin, teacherRegister, updateClass, updateTeacher } from "../controllers/teacher.controller";
import { auth } from "../middleware/auth.middleware";
import isAdmin from "../middleware/isAdmin.middleware";
import { isTeacher } from "../middleware/isTeacher.middleware";
import { upload } from "../lib/multer";
const router = Router()

router.route("/").get(auth, getAllTeachers).post(auth, isAdmin, upload.single("profile"), teacherRegister).patch(auth, isTeacher, upload.single("profile"), updateTeacher)
router.route("/login").post(teacherLogin)
router.route("/:_id").get(auth, isTeacher, getTeacher).post(auth, isAdmin, toggleAdmin).delete(auth, isAdmin, deleteTeacher)
router.route("/classOf").post(auth, isAdmin, updateClass)

export default router