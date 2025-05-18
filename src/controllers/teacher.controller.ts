import Schedule from "../models/Schedule.model";
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import uploadImage from "../utils/uploader";
import {standardValidation, teacherInfoValidation, teacherLoginValidation, teacherValidation} from "../zod/teacher.zod";

export const teacherRegister = asyncHandler(async (req, res) => {
    console.log("called")
    const detailsValidation = teacherInfoValidation.safeParse(req.body)
    console.log(req.body)
    console.log(detailsValidation.error)
    if (!detailsValidation.success) throw new ApiError(401, "Invalid details provided")
    
    const existingTeacher = await Teacher.findOne({username: req.body.username})
    if (existingTeacher) throw new ApiError(400, "Teacher already exist with this username")
    
    let profile = ""
    if (req.file){
        profile = await uploadImage(req.file.path)
    }

    const obj = {...req.body}
    console.log(obj)
    const teacher = await Teacher.create({
        ...obj,
        profile
    })

    const teacherCreated = await Teacher.findById(teacher._id)
    if (!teacherCreated) throw new ApiError(500, "Something went wrong while registration, please try again")

    await Schedule.create({owner: teacherCreated._id})

    res.status(200).json(new ApiResponse(200, teacherCreated, "Teacher registered successfully"))
})

export const teacherLogin = asyncHandler(async (req, res) => {

    console.log("teacher login")
    const {username, password} = req.body
    if(!teacherLoginValidation.safeParse(req.body)) throw new ApiError(401, "Invalid details provided")
    
    const user = await Teacher.findOne({username}) || await Student.findOne({username})
    if (!user) throw new ApiError(404, "User not found with the provided credentials")

    if (user.password != password) throw new ApiError(400, "Password is incorrect")
    
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    res.status(201).json(new ApiResponse(201, {...user, accessToken, refreshToken}, "User logged in successfully"))
})

export const toggleAdmin = asyncHandler(async (req, res) => {
    const {_id} = req.params

    if (!_id) throw new ApiError(401, "Invalid details provided")
    
    const teacher = await Teacher.findById(_id).select("-username -teacherName -isAdmin")
    if (!teacher) throw new ApiError(404, "Invaild Request")
    
    teacher.status = teacher.status == "Teacher" ? "Admin": "Teacher"
    teacher.save({validateBeforeSave: false})

    res.status(200).json(new ApiResponse(200, teacher, "Teacher admin status updated"))
})

export const getTeacher = asyncHandler(async (req, res) => {

    const {_id} = req.params
    console.log(_id)
    if(!_id) throw new ApiError(401, "Please provide id of teacher")
    
    const teacher = await Teacher.findById(_id)
    if (!teacher) throw new ApiError(404, "Teacher does not exist")

    res.status(201).json(new ApiResponse(201, teacher, "Teacher details"))
})

export const getAllTeachers = asyncHandler(async (_, res) => {
    const teachers = await Teacher.find()
    res.status(201).json(new ApiResponse(201, teachers, "All teacher details"))
})

export const updateTeacher = asyncHandler(async (req, res) => {
    
    if (req._id != req.body._id) throw new ApiError(401, "Unauthorization Request")
    if (!teacherInfoValidation.safeParse(req.body).success) throw new ApiError(401, "Invalid details provided")
    
    let profile = ""

    if (req.file){
        profile = await uploadImage(req.file.path)
    }
    
    const updateData = {
        ...req.body
    };

    if (profile){
        updateData.profile = profile
    }
    
    console.log(req._id)
    const teacher = await Teacher.findByIdAndUpdate(
        req._id, 
        updateData,
        {new: true, runValidators: true}
    )

    console.log(teacher)

    if (!teacher) throw new ApiError(404, "Invalid credentials")

    res.status(200).json(new ApiResponse(200, teacher, "Teacher information updated"))
})

export const updateClass = asyncHandler(async (req, res) => {
    const {_id, classOf} = req.body
    console.log(_id, classOf, typeof classOf)
    if (!_id || !classOf) throw new ApiError(401, "Invalid data provided")
    
    const teacher = await Teacher.findByIdAndUpdate(_id, {classOf}, {new: true, runValidators: true})
    if (!teacher) throw new ApiError(404, "Invalid credentials provided")
    
    res.status(201).json(new ApiResponse(201, teacher, "Teacher standard updated"))
})

export const deleteTeacher = asyncHandler(async (req, res) => {
    const {_id} = req.body
    
    if (!_id) throw new ApiError(401, "Invalid details provided")
    
    const teacher = await Teacher.findByIdAndDelete(_id).select("-username -teacherName -std -isAdmin")
    if (!teacher) throw new ApiError(404, "Invalid request")
    
    res.status(201).json(new ApiResponse(201, teacher, "Teacher deleted successfully"))
})
