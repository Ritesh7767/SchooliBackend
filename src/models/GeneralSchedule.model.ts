import mongoose from "mongoose";
import { schedule } from "./Schedule.model";

const generalScheduleSchema = new mongoose.Schema<schedule>({
    title: String,
    start: String
})

const GeneralSchedule = mongoose.model("GeneralSchedule", generalScheduleSchema)

export default GeneralSchedule