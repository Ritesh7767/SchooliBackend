import GeneralSchedule from "../models/GeneralSchedule.model";
import Schedule from "../models/Schedule.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import scheduleValidation from "../zod/schedule.zod";
import { Request, Response } from "express";

export const addGeneralSchedule = asyncHandler(async (req, res) => {

    try {
        if (!scheduleValidation.safeParse(req.body).success) throw new ApiError(400, "Invalid details provided")
        
        const createdSchedule = await GeneralSchedule.create(req.body)
        // res.status(200).json(new ApiResponse(200, createdSchedule, "Schedule has been created"))
        getGeneralSchedule(req, res)
    } catch (error) {
        throw new ApiError(500, "Failed to create schedule, please try again later")
    }
})

export const getGeneralSchedule = async (req: Request, res: Response) => {

    let schedules = await GeneralSchedule.find()
    
    res.status(201).json(new ApiResponse(201, schedules, "Schedules"))
}

export const deleteGeneralSchedule = asyncHandler(async (req, res) => {
        const {_id} = req.params
        console.log(_id)
    
        const deletedSchedule = await GeneralSchedule.findByIdAndDelete(_id)

        if (!deletedSchedule) throw new ApiError(404, "Schedule not found")

        getGeneralSchedule(req, res)
        
        // res.status(200).json(new ApiResponse(200, deletedSchedule, "Schedule has been deleted"))
        
})

export const updateGeneralSchedule = asyncHandler(async (req, res) => {

        const {_id} = req.params
        console.log("patch")
        const updatedSchedule = await GeneralSchedule.findByIdAndUpdate(_id, req.body)
        
        if (!updatedSchedule) throw new ApiError(404, "Schedule not found")
        
        // const schedules = await GeneralSchedule.find()
        // res.status(201).json(new ApiResponse(201, schedules, "Schedules"))

        getGeneralSchedule(req, res)
        // const schedules = await Schedule.find()

        // res.status(200).json(new ApiResponse(200, schedules, "Schedule has been updated"))
})