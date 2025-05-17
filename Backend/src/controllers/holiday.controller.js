import Holiday from "../models/holiday.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import holidaySchema from "../schema/holiday.schema.js"
import ApiError from "../utils/customError.js";

export const addHoliday = asyncHandler(async (req,res) => {
    const {date, name} = req.body;

    if(req.currUser.level <= 2){
        throw new ApiError("You can't add Holiday", 403);
    }

    const {success, error} = holidaySchema.safeParse({date, name});

    if(!success){
        console.log("Zod validation error : ", error);
        throw new ApiError("Invalid Inputs", 400);
    }

    const newHoliday = await Holiday.create({date, name});

    if(!newHoliday){
        throw new ApiError("Some error occured while adding holiday", 400);
    }

    res.status(201).json({
        success : true,
        message : "Holiday added successfully"
    })
})

export const getAllHolidays = asyncHandler(async (req,res) => {
    const allHolidays = await Holiday.find();

    if(!allHolidays){
        throw new ApiError("No Holiday found", 404);
    }

    res.status(200).json({
        success : true,
        allHolidays
    })
})

export const deleteHoliday = asyncHandler(async (req,res) => {
    const {id} = req.params;

    const holiday = await Holiday.findById(id);

    if(!holiday){
        throw new ApiError("No holiday found", 404);
    }

    await Holiday.findByIdAndDelete(id);

    return res.status(201).json({
        success : true,
        message : "Holiday deleted successfully"
    })
})