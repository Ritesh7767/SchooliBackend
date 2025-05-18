import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import {Request, Response} from 'express'
import uploadImage from "../utils/uploader";
import Event from "../models/Event.model";
import ApiResponse from "../utils/apiResponse";

export const addEvent = asyncHandler(async (req: Request, res: Response) => {
    const filepath = req.files as Express.Multer.File[]
    if (!filepath) throw new ApiError(401, "No picture provided")

    const imageUrl = []
    for (const file of filepath){
        const result = await uploadImage(file.path)
        imageUrl.push(result)
    }

    for (const image in imageUrl){
        await Event.create({image})
    }

    res.status(201).json(new ApiResponse(201, imageUrl, "Image uploaded successfully"))
})

export const addLike = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const image = await Event.findById(id)
    if (!image) throw new ApiError(404, "Image not found")
    
    image.like += 1
    image.save({validateBeforeSave: false})

    res.status(201).json(new ApiResponse(201, image, "Like added"))
})

export const subLike = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const image = await Event.findById(id)
    if (!image) throw new ApiError(404, 'Image not found')

    image.like -= 1
    image.save({validateBeforeSave: false})

    res.status(201).json(new ApiResponse(201, image, "Like subtracted"))
})

