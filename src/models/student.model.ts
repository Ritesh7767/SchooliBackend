import zod, { string } from 'zod'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { studentValidation } from '../zod/student.zod'

type studentType = zod.infer<typeof studentValidation>
interface studentInterface extends studentType {
    profile: string,
    status: string
    generateAccessToken: () => string,
    generateRefreshToken: () => string
}

const studentSchema = new mongoose.Schema<studentInterface>(
    {
        profile: String,
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        fatherName: {
            type: String,
            required: true
        },
        motherName: {
            type: String,
        },
        DOB: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female", "others"]
        },
        std: {
            type: String,
            enum: ["5", "6", "7", "8", "9", "10"]
        },
        aadharNumber: String,
        motherContactNumber: String,
        fatherContactNumber: String,
        email: String,
        address: {
            type: String,
            trim: true
        },
        religion: String,
        birthPlace: String,
        state: String,
        nationality: String,
        aadharImage: String,
        birthCertificate: String,
        leavingCertificate: String,
        status: {
            type: String,
            default: "Student"
        }
    }
)

// studentSchema.pre("save", async function(next){
//     if(!this.isModified("password")) next()
//     this.password = await bcrypt.hash(this.password, 5)
//     next()
// })

// studentSchema.methods.isPasswordCorrect = async function(password: string){
//     return bcrypt.compare(password, this.password)
// }

studentSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username
        },
        `${process.env.ACCESS_SECRET}`,
        {
            expiresIn: "1d"
        }
    )
}

studentSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        `${process.env.REFRESH_SECRET}`,
        {
            expiresIn: "10d"
        }
    )
}

const Student = mongoose.model("Student", studentSchema)

export default Student