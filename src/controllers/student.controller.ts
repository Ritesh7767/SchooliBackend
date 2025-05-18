import Student from "../models/student.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import uploadImage from "../utils/uploader";
import express from 'express'
import { studentInfoValidation, studentLoginValidation, studentValidation } from "../zod/student.zod";

interface customRequest extends express.Request {
    files?: {
        [key: string]: Express.Multer.File[]
    }
}

export const studentRegister = asyncHandler(async (req, res) => {
    
    console.log(req.body)
    if (!studentInfoValidation.safeParse(req.body).success) throw new ApiError(401, "Invalid details provided")
    const existingStudent = await Student.findOne({username: req.body.username})
    console.log(existingStudent)
    if (existingStudent) throw new ApiError(401, "Student already exist with this username")
    
    let documents: any = {}
    if (req?.files){
        for (const field in req.files){
            documents[field] = await uploadImage(req.files[field][0].path)
        }
    }

    const student = await Student.create({
        ...req.body,
        ...documents
    })

    const createdStudent = await Student.findById(student._id)
    if (!createdStudent) throw new ApiError(500, "Something went wrong while registering student, please try again")
    
    res.status(200).json(new ApiResponse(200, createdStudent, "Student registered"))
})

export const studentLogin = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    if (!studentLoginValidation.safeParse(req.body).success) throw new ApiError(401, "Invalid details provided")
    
    const student = await Student.findOne({username})
    if (!student) throw new ApiError(404, "Student does not exist")
    
    if (student.password != password) throw new ApiError(401, "Incorrect Password")

    const accessToken = student.generateAccessToken()
    const refreshToken = student.generateRefreshToken()

    res.status(200).json(new ApiResponse(201, {...student, accessToken, refreshToken}, "Student logged in successfully"))
})

export const updateStudent = asyncHandler(async (req: customRequest, res) => {
    try {
        console.log("called")
        // const formData = {...req.body}
        // console.log("request body", req.body)
        console.log("request files", req.files)

        // const parsedBody = {
            
        // }

        console.log(req.body)

        if (!studentInfoValidation.safeParse(req.body).success) throw new ApiError(401, "Invalid details provided")
    
        let documents: any = {}
        console.log(req?.files)
        if (req.files){
            for (const field in req.files){
                documents[field] = await uploadImage(req.files[field][0].path)
            }
        }

        console.log(documents)

        const updatedStudents = await Student.findByIdAndUpdate(req.body._id, {
            ...req.body,
            ...documents,
        },
        {new: true, runValidators: true}
        )

        if (!updatedStudents) throw new ApiError(402, "Invalid Request")
        
        res.status(201).json(new ApiResponse(201, updatedStudents, "Student information has been updated"))
        
    } catch (error) {
        console.error(error)
        throw new ApiError(500, "Something went wrong while updating, please try again")
    }
})

export const getStudent = asyncHandler(async (req, res) => {
    const {_id} = req.params
    
    if (!_id) throw new ApiError(401, "Please provide id")
    
    const student = await Student.findById(_id).select("-password")
    if (!student) throw new ApiError(404, "Student does not exist")

    res.status(201).json(new ApiResponse(201, student, "Student details"))
})

export const getAllStudents = asyncHandler(async (req, res) => {
    console.log("getAllStudents")
    const students = await Student.find()
    res.status(200).json(new ApiResponse(201, students, "Students details"))
})

export const deleteStudent = asyncHandler(async (req, res) => {
        
        const {_id} = req.params
        
        const student = await Student.findByIdAndDelete(_id)
        if (!student) throw new ApiError(401, "Invalid request")
    
        res.status(201).json(new ApiResponse(201, student, "Student has been deleted"))
})