import { Router } from "express";
import { deleteStudent, getAllStudents, getStudent, studentLogin, studentRegister, updateStudent } from "../controllers/student.controller";
import { auth } from "../middleware/auth.middleware";
import isAdmin from "../middleware/isAdmin.middleware";
import { isTeacher } from "../middleware/isTeacher.middleware";
import { upload } from "../lib/multer";
const router = Router()

router.route("/")
    .get(auth, isTeacher, getAllStudents)
    .post(auth, isAdmin,
        upload.fields([
            {name: "profile", maxCount: 1}, 
            {name: "aadharImage", maxCount: 1}, 
            {name: "birthCertificate", maxCount: 1}, 
            {name: "leavingCertificate", maxCount: 1}]),
        studentRegister)
    .patch(auth, upload.fields([
        {name: "profile", maxCount: 1}, 
        {name: "aadharImage", maxCount: 1}, 
        {name: "birthCertificate", maxCount: 1}, 
        {name: "leavingCertificate", maxCount: 1}]), 
        updateStudent
    )

router.route("/:_id").get(auth, isTeacher, getStudent).delete(auth, isAdmin, deleteStudent)
router.route("/login").post(studentLogin)

export default router