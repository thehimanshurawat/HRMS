import Attendance from "../models/attendance.model.js";
import Employee from "../models/employee.model.js";
import Holiday from "../models/holiday.model.js";
import Leave from "../models/leave.model.js";
import cron from "node-cron";
import { sendNotification } from "./socket-io.js";
import ApiError from "./customError.js";

const markAutoAttendance = async (io) => {
    console.log("Running attendance job...");

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Convert to UTC (as mongodb stores date in UTC)
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

    try {
        // Skipping attendance on holidays
        const isHoliday = await Holiday.findOne({ date: todayUTC });
        if (isHoliday) {
            console.log(`Skipping attendance for ${todayUTC.toISOString().split("T")[0]} Holiday - ${isHoliday.name}`);
            return;
        }

        // Find employees on approved leaves
        const employeeOnLeave = await Leave.find({
            fromDate: { $lte: todayUTC }, // fromDate <= today (leave started on today or day before)
            toDate: { $gte: todayUTC }, // toDate >= today (leave end on today or day after)
            leaveStatus: "Approved",
        }).distinct("employee");

        // Get all employees
        const allEmployees = await Employee.find().select("_id role");

        for (const employee of allEmployees) {
            // Skipping CEO attendance
            if (employee.role === "CEO") continue;
            // Setting status = Leave for employees who are on leave
            if (employeeOnLeave.includes(employee._id.toString())) {
                console.log(`${employee._id} (on leave)`);
                await Attendance.create({
                    employee: employee._id,
                    date: todayUTC,
                    status: "Leave"
                });

                await sendNotification(io, [employee._id.toString()], "personal", "Your leave has been marked for today");
            }

            // Check if the employee has already marked attendance
            const existingAttendance = await Attendance.findOne({
                employee: employee._id,
                date: todayUTC
            });

            // console.log("exist : ", existingAttendance);

            if (!existingAttendance) {
                console.log(`Marking absent for Employee: ${employee._id}`);

                await Attendance.create({
                    employee: employee._id,
                    date: todayUTC,
                    status: "Absent"
                });

                await sendNotification(io, [employee._id.toString()], "personal", "Your Absent has been marked for today");

                // Extending tenure by 1 Day if employee is Absent
                employee.tenure += 1;
                const lastWorkingDate = new Date(employee.lastWorkingDate);
                lastWorkingDate.setUTCDate(employee.lastWorkingDate.getUTCDate() + 1);
                employee.lastWorkingDate = lastWorkingDate;

                const empTenureAdd = await employee.save();

                if(!empTenureAdd){
                    throw new ApiError("Something went wrong while extending absent employee tenure", 500);
                }
            }
        }

        console.log("Attendance job completed");

        // Sending notification to employees and their reportingManager if there Absents are more than 10 in a month.
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const employeesWithAbsences = await Attendance.aggregate([
            {
                $match : {
                    date : {$gte : startOfMonth, $lte : endOfMonth},
                    status : "Absent"
                }
            },
            {
                $group : {
                    _id : "$employee",
                    absenceCount : {$sum : 1}
                }
            },
            {
                $match : {
                    absenceCount : { $gt : 10}
                }
            }
        ])

        for(const record of employeesWithAbsences){
            const employee = await Employee.findById(record._id).select("reportsTo employeeId");
            const reportingManagerId = employee.reportsTo;

            await sendNotification(io, [record._id.toString()], "personal", "You have more than 10 Absences this month");
            if(reportingManagerId){
                await sendNotification(io, [reportingManagerId.toString()], "personal", `Employee ${employee.employeeId} has more than 10 Absences this month`)
            }
        }
        
    } catch (err) {
        console.log("error: ", err.message || "Some error occurred in cron job");
    }
};

export const attendanceScheduler = (io) => {
    // Schedule the cron job to run at 11:59 AM from Monday to Saturday
    cron.schedule("59 11 * * 1-6", async () => {
        await markAutoAttendance(io);
    }, {
        timezone: "Asia/Kolkata"
    });

    // Run the attendance marking logic immediately if the server starts after 12 PM
    const now = new Date();
    let noon = new Date();
    noon = noon.setHours(12, 0, 0, 0);
    if (now > noon) {
        markAutoAttendance(io);
    }
};