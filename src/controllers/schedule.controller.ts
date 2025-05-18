import Schedule from "../models/Schedule.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import scheduleValidation from "../zod/schedule.zod";

export const getSchedule = asyncHandler(async (req, res) => {

    const schedule = await Schedule.findOne({owner: req._id})
    res.status(200).json(new ApiResponse(200, schedule ? schedule.schedule : [], "Schedules"))
})

export const addSchedule = asyncHandler(async (req, res) => {

    if(!scheduleValidation.safeParse(req.body).success) throw new ApiError(400, "Invalid data provided")

    const user = await Schedule.findOne({owner: req._id})
    if (!user) throw new ApiError(404, "User not found in database")
    
    user.schedule.push({title: req.body.title, start: req.body.start})
    user.save({validateBeforeSave: false})

    res.status(200).json(new ApiResponse(200, user.schedule, "Schedule updated"))
})