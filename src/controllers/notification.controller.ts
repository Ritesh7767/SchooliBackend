import { Notification } from "../models/Notification.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import notificationValidation from "../zod/notification.zod";
import { Request } from "express";

export const makeNotification = asyncHandler(async (req, res) => {
    try {
        const {notice} = req.body
        if (!notificationValidation.safeParse(req.body)) throw new ApiError(401, "Invalid details provided")
        
        const createNotice = await Notification.create({message: notice})
        res.status(200).json(new ApiResponse(200, createNotice, "Notice created"))
        
    } catch (error) {
        console.error(error)
        throw new ApiError(500, "Something went wrong, please try again")
    }
})

export const getNotification = asyncHandler(async (req, res) => {
    const notices = await Notification.find()
    res.status(200).json(new ApiResponse(200, notices, "All Notification"))
})

export const updateNotice = asyncHandler(async (req: Request, res) => {
    const {message, _id} = req.body
    
    if (!notificationValidation.safeParse({message})) throw new ApiError(401, "Invalid details provided")
    
    const updatedNotice = await Notification.findByIdAndUpdate(_id, {message})
    if (!updatedNotice) throw new ApiError(404, "Invalid Request")

    res.status(201).json(new ApiResponse(201, updatedNotice, "Notification successfully updated"))
})

export const deleteNotice = asyncHandler(async (req, res) => {
    const id = req.params.id
    
    const deleteNotice = await Notification.findByIdAndDelete(id)
    if (!deleteNotice) throw new ApiError(404, "Invalid Request")

    res.status(201).json(new ApiResponse(201, deleteNotice, "Notice deleted successfully"))
})


