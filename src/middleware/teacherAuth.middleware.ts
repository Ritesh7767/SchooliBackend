import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import Teacher, { teacherInterface } from "../models/teacher.model";
import mongoose from "mongoose";
import ApiError from "../utils/apiError";

export const teacherAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken
        const userData = jwt.verify(token, `${process.env.ACCESS_SECRET}`) as JwtPayload
        
        const teacher = await Teacher.findById(userData._id)
        req._id = teacher?._id as unknown as mongoose.Schema.Types.ObjectId
        req.status = teacher?.status as string
        next()
    } catch (error) {
        throw new ApiError(400, "Invalid Access Token")
    }
}