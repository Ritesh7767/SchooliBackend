import mongoose from "mongoose";
import notificationValidation from "../zod/notification.zod";
import zod from 'zod'

type notificationType = zod.infer<typeof notificationValidation>
const notificationSchema = new mongoose.Schema<notificationType>({
    message: {
        type: String,
        trim: true,
        min: 8
    }
})

export const Notification = mongoose.model<notificationType>("Notification", notificationSchema)