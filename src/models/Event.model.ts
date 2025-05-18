import mongoose from "mongoose";

interface eventInterface {
    image: string,
    like: number,
    comment: string
}
const eventSchema = new mongoose.Schema<eventInterface>({
    image: {
        type: String
    },
    like: {
        type: Number,
        default: 0
    },
})

const Event = mongoose.model<eventInterface>("Event", eventSchema)

export default Event