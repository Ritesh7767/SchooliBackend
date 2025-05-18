import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.status != "Admin") throw next(new ApiError(403, "Unauthorized Request"))
    next()
}

export default isAdmin