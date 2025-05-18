import mongoose from "mongoose";
import zod, { string } from 'zod'
import {teacherValidation} from "../zod/teacher.zod";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type teacherType = zod.infer<typeof teacherValidation>
export interface teacherInterface extends teacherType {
    profile: string,
    status: string,
    isPasswordCorrect: (password: string) => Promise<boolean>,
    generateAccessToken: ()=>string,
    generateRefreshToken: ()=>string
}

const teacherSchema = new mongoose.Schema<teacherInterface>(
    {
        profile: {
            type: String
        },
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
        middlename: {
            type: String,
        },
        lastname: {
            type: String,
            required: true
        },
        classOf: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Teacher", "Admin"],
            default: "Teacher"
        },
        DOB: {
            type: String
        },
        gender: {
            type: String,
            enum: ["female", "male", "others"]
        },
        address: String,
        email: String,
        contact: String,
        subject: String,
        qualification: String
    }
)

// teacherSchema.pre("save", async function(next){
//     if (!this.isModified("password")) next()
//     this.password = await bcrypt.hash(this.password, 5)
//     next()
// })

// teacherSchema.methods.isPasswordCorrect = async function(password: string){
    // return await bcrypt.compare(password, this.password)
// }

teacherSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            status: this.status
        },
        `${process.env.ACCESS_SECRET}`,
        {
            expiresIn: "1d"
        }
    )
}

teacherSchema.methods.generateRefreshToken = function(){
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

const Teacher = mongoose.model<teacherInterface>("Teacher", teacherSchema)

export default Teacher