import Attendance from "../models/attendance.model.js";
import ApiError from "./customError.js";

export const markAttendance = async (employeeId) => {
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

    // console.log("today : ", today);

    console.log("marking attendance");

    // check if attendance already marked
    const existingRecord = await Attendance.findOne({
        employee : employeeId,
        date : today
    })

    // console.log("existing : ", existingRecord);

    if(existingRecord){
        throw new ApiError("Your attendance has already been marked");
    }
    let status = "On-Time";
    let maxLateTime = new Date() // 10am threshold
    maxLateTime.setHours(10, 0, 0, 0);
    if(now > maxLateTime){
        status = "Late"
    }

    let outOfTime = new Date(); // after 12 no attendance should be marked
    outOfTime.setHours(12, 0, 0, 0);
    if(now > outOfTime){
        throw new ApiError("You can't submit aily task form after 12pm");
    }

    // Save attendance record
    const newAttendance = await Attendance.create({
         employee : employeeId,
         date : today,
         status,
         submissionTime : now
     })
 
    // console.log("new attendance : ", newAttendance);

}
