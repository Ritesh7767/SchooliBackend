import { Router } from "express";
import { getHolidays } from "../controllers/holiday.controller";
const router = Router()

router.route("/").get(getHolidays)

export default router