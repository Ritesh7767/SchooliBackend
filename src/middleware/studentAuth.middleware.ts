import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from "mongoose";
import ApiError from "../utils/apiError";
import Student from "../models/student.model";

export const studentAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken
        const userData = jwt.verify(token, `${process.env.ACCESS_SECRET}`) as JwtPayload
        
        const student = await Student.findById(userData._id)
        req._id = student?._id as unknown as mongoose.Schema.Types.ObjectId
        req.status = student?.status as string
        next()
    } catch (error) {
        throw new ApiError(400, "Invalid Access Token")
    }
}