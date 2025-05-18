import cloudinaryConfig from './lib/cloudinary';
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
cloudinaryConfig()
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.get("/", (_, res) => {
    res.send("health check server")
})

import studentRouter from './routers/student.router'
app.use("/student", studentRouter)

import teacherRouter from './routers/teacher.router'
app.use("/teacher", teacherRouter)

import holidayRouter from './routers/holiday.router'
app.use("/holidays", holidayRouter)

import scheduleRouter from './routers/schedule.route'
app.use("/schedule", scheduleRouter)

import generalScheduleRouter from './routers/GeneralSchedules.router'
app.use("/generalSchedule", generalScheduleRouter)

import ApiError from './utils/apiError'
import { Request, Response, NextFunction } from 'express'

app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    if(err instanceof ApiError){
        res.status(err.statusCode).json({
            status: err.statusCode,
            success : false,
            message : err.message,
            errors : err.stack,
            data : err.data
        })
    }
    else {
        res.status(500).json({
            status: 500,
            success : false,
            message : "Internal Server Error",
            errors : [],
            data : null
        })
    }
})


export default app


