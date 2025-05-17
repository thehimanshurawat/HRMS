import DailyTask from "../models/dailyTask.model.js";
import Employee from "../models/employee.model.js";
import Holiday from "../models/holiday.model.js";
import dailyTaskSchema from "../schema/dailyTask.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";
import { markAttendance } from "../utils/markAttendance.js";
import Attendance from "../models/attendance.model.js";

// Submit daily task for marking attendance
export const submitDailyTask = asyncHandler(async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    // console.log("data : ", data);

    // check whether emp exist
    const empExist = await Employee.findById(id);
    if(!empExist){
        throw new ApiError("Invalid Employee ID", 400);
    }

    // do the validation
    const {success, error} = dailyTaskSchema.safeParse({employee : id, ...req.body});

    if(!success){
        console.log("Zod Error : ", error);
        throw new ApiError("Invalid Inputs", 400);
    }

    for(const key in data){
        if(data[key] === undefined){
            delete data[key];
        }
    }
    // console.log("data : ", data);

    // Check whether it's a holiday
    const today = new Date();
    const isHoliday = await Holiday.findOne({date : today});
    if(isHoliday){
        return res.status(200).json({
            success : true,
            message : "Today is Holiday"
        })
    }

    const newDailyTask = await DailyTask.create({employee : id, ...data});

    if(!newDailyTask){
        throw new ApiError("Some error occured while submitting task", 500);
    }

    await markAttendance(id);

    return res.status(201).json({
        success : true,
        message : "Task Submitted",
        newDailyTask
    })

})

export const getAllEmployeesAttendance = asyncHandler(async (req,res) => {
    
    let employeesId = await Employee.find({
        level : {
            $lte : req.currUser.level
        }
    }).select("_id");

    employeesId = employeesId.filter((id) => id._id.toString() !== req.currUser._id.toString());

    // console.log("emp ids : ", employeesId);

    const allAttendance = await Attendance.find({
        employee : {$in : employeesId}
    }).populate("employee", "username employeeId designation profileImg").sort({date : -1});

    if(!allAttendance){
        throw new ApiError("Attendance not found", 404);
    }

    return res.status(200).json({
        success : true,
        allAttendance
    })
})

export const getOneEmployeeAttendance = asyncHandler(async (req,res) => {
    const {id} = req.params;

    const employeeId = await Employee.findById(id).select("_id");

    if(!employeeId){
        throw new ApiError("Employee not found", 404);
    }

    const attendance = await Attendance.find({employee : employeeId});

    // console.log("emp attendance : ", attendance);

    if(!attendance){
        throw new ApiError("Attendance not found", 404);
    }

    return res.status(200).json({
        success : true,
        attendance
    })
})

