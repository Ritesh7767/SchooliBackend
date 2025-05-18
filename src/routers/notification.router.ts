import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { deleteNotice, getNotification, makeNotification, updateNotice } from "../controllers/notification.controller";
import { isTeacher } from "../middleware/isTeacher.middleware";
const router = Router()

router.route("/").get(auth, getNotification).post(auth, isTeacher, makeNotification).patch(auth, isTeacher, updateNotice).delete(auth, isTeacher, deleteNotice)