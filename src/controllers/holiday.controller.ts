import Holiday from "../models/holidays.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import axios from 'axios'

export const getHolidays = asyncHandler(async (req, res) => {

    const data = await Holiday.find()
    const currentYear = new Date().getFullYear()

    if (data[0].year == currentYear) {
        res.status(200).json(new ApiResponse(200, data[0].holidays, "Holidays"))
        return
    }
    
    const API_KEY = "XwYyUyR0j0VNyP9jH2RARLOP88BJH651";

    const result = await axios.get(`https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=IN&year=2025`) as any
    const holidays: any = []

    console.log(result.data.response)

    result.data.response?.holidays?.forEach((ele: any, index: number) => {
        const festival: any = {}
        festival.id = index + 1
        festival.title = ele.name
        festival.start = ele.date.iso
        holidays.push(festival)
    })

    const updatedData = await Holiday.findByIdAndUpdate(data[0]._id, {
        year: currentYear,
        holidays
    }, {new: true, runValidators: true})

    if (!updatedData) throw new ApiError(500, "Something went wrong, please try again")

    res.status(200).json(new ApiResponse(200, updatedData.holidays, 'Holidays'))
})