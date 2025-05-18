import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

export const isTeacher = async (req: Request, res: Response, next: NextFunction) => {
    console.log("isTeacher")
    if(req.status == "Student") next(new ApiError(403, "Unauthorized Request"))
    next()
}
