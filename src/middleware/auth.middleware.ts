import {Request, Response, NextFunction} from 'express'
import ApiError from '../utils/apiError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import Teacher from '../models/teacher.model'
import Student from '../models/student.model'
import mongoose from 'mongoose'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("auth")
        const token = (req.headers.authorization as string)?.split(" ")[1]
        if (!token) throw new ApiError(400, "Bad Request")

        const userData = jwt.verify(token, `${process.env.ACCESS_SECRET}`) as JwtPayload
        const user = await Teacher.findById(userData._id) || await Student.findById(userData._id)

        if (!user) return next(new ApiError(404, "User does not exist"))
            
        req._id = user._id as unknown as mongoose.Schema.Types.ObjectId
        req.status = user.status
        next()
    } catch (error) {
        next(error)
    }
}