import mongoose from "mongoose";

interface festivalInterface {
    title: string,
    start: string,
}

interface holidayInterface {
    year: number,
    holidays: festivalInterface[]
}

const holidaySchema = new mongoose.Schema<holidayInterface>({
    year: Number,
    holidays: [
        {
            title: String,
            start: String,
        }
    ]
})

const Holiday = mongoose.model<holidayInterface>("Holiday", holidaySchema)

export default Holiday