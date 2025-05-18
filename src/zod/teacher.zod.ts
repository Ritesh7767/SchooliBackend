import * as zod from 'zod'

export const teacherValidation = zod.object({
    username: zod.string().min(4, "Username should be of atleast 4 characters"),
    password: zod.string().min(5, "Password cannot be empty"),
    firstname: zod.string().min(1, "Teacher name cannot be empty"),
    middlename: zod.string().min(1, "Middlename cannot be empty").optional(),
    lastname: zod.string().min(1, "Lastname cannot be empty"),
    classOf: zod.string(),
    gender: zod.enum(["male", "female", "others"]),
    status: zod.string().catch("Teacher"),
    subject: zod.string(),
    DOB: zod.string().date().optional(),
    address: zod.string().min(8, "Address is too short").optional(),
    email: zod.string().email().optional(),
    contact: zod.string().length(10, "Invalid contact number").optional(),
    qualification: zod.string().optional()
})

export const teacherInfoValidation = teacherValidation.pick({
    username: true,
    password: true,
    firstname: true,
    lastname: true,
    classOf: true,
    gender: true,
    status: true,
    subject: true
})

export const standardValidation = teacherValidation.pick({
    classOf: true
})

export const teacherLoginValidation = teacherValidation.pick({
    username: true,
    password: true
})
