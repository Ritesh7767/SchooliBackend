import mongoose from "mongoose";

export interface schedule {
    title: string,
    start: string
}

interface scheduleInterface {
    owner: mongoose.Schema.Types.ObjectId,
    schedule: schedule[]
}

const scheduleSchema = new mongoose.Schema<scheduleInterface>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },
    schedule: [
        {
            title: {
                type: String,
                required: true
            },
            start: {
                type: String,
                required: true
            }
        }
    ]
})

const Schedule = mongoose.model("Schedule", scheduleSchema)

export default Schedule