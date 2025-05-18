import * as zod from 'zod'

export const studentValidation = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
    fatherName: zod.string(),
    motherName: zod.string().optional(),
    DOB: zod.string().date(),
    gender: zod.enum(["male", "female", "others"]),
    std: zod.enum(["5", "6", "7", "8", "9", "10"]),
    aadharNumber: zod.string().optional(),
    fatherContactNumber: zod.string().optional(),
    motherContactNumber: zod.string().optional(),
    email: zod.string().email().optional(),
    address: zod.string().optional(),
    religion: zod.string().optional(),
    birthPlace: zod.string().optional(),
    state: zod.string().optional(),
    nationality: zod.string().optional(),
    aadharImage: zod.string().optional(),
    birthCertificate: zod.string().optional(),
    leavingCertificate: zod.string().optional(),
})
export const studentInfoValidation = studentValidation.pick({
    username: true,
    password: true,
    firstname: true,
    lastname: true,
    fatherName: true,
    DOB: true,
    gender: true,
    std: true
})

export const documentValidation = studentValidation.pick({
    // aadharImage: true,
    // motherAadhar: true,
    // fatherAadhar: true,
    // birthCertificate: true,
    // leavingCertificate: true
})

export const studentLoginValidation = studentValidation.pick({
    username: true,
    password: true
})
