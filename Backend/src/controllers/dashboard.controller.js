import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";
import Leave from "../models/leave.model.js";
import Todo from "../models/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";
import { findAllEmployeesAttendance, getLast7DaysAttendance } from "../utils/helper.js";
import Complaint from "../models/complaints.model.js";

export const getDashboardData = asyncHandler(async (req, res) => {
	const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
	const lastWeek = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 7));

    // Calculating Employee percentage change
    const totalEmployees = await Employee.countDocuments() - 1;

	const totalEmployeesLastWeek = await Employee.countDocuments({
        createdAt: { $lte: lastWeek },
	});
    
    // console.log("total emp : ", totalEmployees);
    // console.log("total last week emp : ", totalEmployeesLastWeek);
    
	const employeeChangePercent =
		(totalEmployeesLastWeek === 0) ? 100
        : (
            ((totalEmployees - totalEmployeesLastWeek) / totalEmployeesLastWeek) * 100
        ).toFixed(2);
    
    // Calculating total departments percentage change
	const totalDepartments = await Employee.distinct("department");
	const totalDepartmentsCount = totalDepartments.length;

	const totalDepartmentsLastWeek = await Employee.distinct("department", {
		createdAt: { $lte: lastWeek },
	});
	const totalDepartmentsLastWeekCount = totalDepartmentsLastWeek.length;

    // console.log("total emp : ", totalDepartments);
    // console.log("total last week emp : ", totalDepartmentsLastWeek);

	const departmentChangePercent =
		(totalDepartmentsLastWeekCount === 0) ? 100
        : (
            ((totalDepartmentsCount - totalDepartmentsLastWeekCount) / totalDepartmentsLastWeekCount) * 100
        ).toFixed(2);

    // Calculating total Teams percentage change
    const totalTeams = await Employee.distinct("teamNo");
	const totalTeamCount = totalTeams.length;

	const totalTeamsLastWeek = await Employee.distinct("teamNo", {
		createdAt: { $lte: lastWeek },
	});
	const totalTeamsLastWeekCount = totalTeamsLastWeek.length;

    // console.log("total emp : ", totalDepartments);
    // console.log("total last week emp : ", totalDepartmentsLastWeek);

	const teamChangePercent =
		(totalTeamsLastWeekCount === 0) ? 100
        : (
            ((totalTeamCount - totalTeamsLastWeekCount) / totalTeamsLastWeekCount) * 100
        ).toFixed(2);


    // Calculating Attendance Percentage
    // console.log("today : ", today);
    const todayAttendanceCount = await Attendance.countDocuments({
        date: today,
        status: {
            $in: ["On-Time", "Late"]
        },
    });

    // console.log("today present count : ", todayAttendanceCount);
    let todayAttendancePercentage;
    if(totalEmployees > 0){
        todayAttendancePercentage = ((todayAttendanceCount / totalEmployees) * 100).toFixed(2);
    }

    // Calculating TODOs for current Employee
	const employeeId = req.currUser._id;
	const todayTodos = await Todo.find({ employee : employeeId, date: today });

    const [attendanceData, empAttendanceData] = await Promise.all([
        getLast7DaysAttendance(),
        findAllEmployeesAttendance(new Date()) // Assuming you want today's data
      ]);

    if(!attendanceData || !empAttendanceData){
        throw new ApiError('Error in fetching attendance data', 500);
    }

	return res.status(200).json({
        employee : {
            totalEmployees,
            employeeChangePercent,
        },
        department : {
            totalDepartments: totalDepartmentsCount,
            departmentChangePercent,
        },
        attendance : {
            todayAttendanceCount,
            todayAttendancePercentage,
            attendanceData,
            empAttendanceData
        },
        team : {
            totalTeamCount,
            teamChangePercent
        },
		todayTodos: todayTodos.map((todo) => todo.task),
        
	});
});



export const getUserDashboard = asyncHandler(async (req, res) => {
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const lastWeek = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 7));


    // Get the first and last date of the current month
  
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Get logged-in user ID
    const employeeId = req.currUser._id;

    //   Fetch total leave data for logged-in user
    const totalLeave = await Leave.countDocuments({ employee: employeeId });

    const totalLeaveLastWeek = await Leave.countDocuments({
        employee: employeeId,
        createdAt: { $gte: lastWeek, $lte: today },
    });

    const leaveChangePercent =
        totalLeaveLastWeek === 0 ? 100 : (((totalLeave - totalLeaveLastWeek) / totalLeaveLastWeek) * 100).toFixed(2);

    //  Fetch todo data for logged-in user
    const userTodo = await Todo.find({ employee: employeeId });

    const totalTodo = userTodo.length;

    const totalTodoLastWeek = await Todo.countDocuments({
        employee: employeeId,
        createdAt: { $gte: lastWeek, $lte: today },
    });

    const todoChangePercent =
        totalTodoLastWeek === 0 ? 100 : (((totalTodo - totalTodoLastWeek) / totalTodoLastWeek) * 100).toFixed(2);

    // Fetch complaint data for logged-in user
    const totalEmployeeComplaint = await Complaint.find({employee : employeeId}).countDocuments();

    //  Fetch attendance data for logged-in user
    const todayStart = new Date(today);
    const todayEnd = new Date(today);
    todayEnd.setUTCDate(todayEnd.getUTCDate() + 7);

    const weeklyAttendanceCount = await Attendance.countDocuments({
        employee: employeeId,
        date: {
            $gte: todayStart,
            $lt: todayEnd,
        },
        status: { $in: ["On-Time", "Late"] },
    });
    
    const lastWeekAttendanceCount = await Attendance.countDocuments({
        employee : employeeId,
        date : {$gt : lastWeek, $lt : todayEnd},
        status : {$in : ["On-Time", "Late"]}
    })

    const weeklyAttendanceChangePercent = lastWeekAttendanceCount === 0 
    ? 100 
    :  (((weeklyAttendanceCount - lastWeekAttendanceCount)/lastWeekAttendanceCount) * 100).toFixed(2);


    // Get weekly attendance data of the user
    const weeklyAttendance = await Attendance.aggregate([
        {
            $match: {
                employee: employeeId,
                date: { $gte: startOfMonth, $lte: endOfMonth }
            },
        },
        {
            $group: {
                _id: { 
                    week: {
                        $ceil: { $divide: [{ $dayOfMonth: "$date" }, 7] } } // Get week number
                },
                total: { $sum: 1 },
                absent: { $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] } },
                late: { $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] } },
                onTime: { $sum: { $cond: [{ $eq: ["$status", "On-Time"] }, 1, 0] } },
                leave: { $sum: { $cond: [{ $eq: ["$status", "Leave"] }, 1, 0] } }
            }
        },
        {
            $project: {
                _id: 0,
                week: { 
                    $switch: {
                        branches: [
                            { case: { $eq: ["$_id.week", 1] }, then: "1st Week" },
                            { case: { $eq: ["$_id.week", 2] }, then: "2nd Week" },
                            { case: { $eq: ["$_id.week", 3] }, then: "3rd Week" },
                            { case: { $eq: ["$_id.week", 4] }, then: "4th Week" }
                        ],
                        default: "Unknown Week"
                    }
                },
                total: 1,
                absent: {
                    $cond: { if: { $gt: ["$total", 0] }, then: { $multiply: [{ $divide: ["$absent", "$total"] }, 100] }, else: 0 }
                },
                late: {
                    $cond: { if: { $gt: ["$total", 0] }, then: { $multiply: [{ $divide: ["$late", "$total"] }, 100] }, else: 0 }
                },
                onTime: {
                    $cond: { if: { $gt: ["$total", 0] }, then: { $multiply: [{ $divide: ["$onTime", "$total"] }, 100] }, else: 0 }
                },
                leave: {
                    $cond: { if: { $gt: ["$total", 0] }, then: { $multiply: [{ $divide: ["$leave", "$total"] }, 100] }, else: 0 }
                }
            }
        }
    ]);

    // Ensure we always return data for 4 weeks
    const weeks = ["1st Week", "2nd Week", "3rd Week", "4th Week"];
    const formattedData = weeks.map((week) => {
        const weekData = weeklyAttendance.find((item) => item.week === week) || {
            week,
            total: 0,
            absent: 0,
            late: 0,
            onTime: 0,
            leave: 0
        };
        return weekData;
    });
    
    
    return res.status(200).json({
        leave: {
            totalLeave,
            leaveChangePercent,
        },
        todo: {
            totalTodo,
            todoChangePercent,
            todoList: userTodo.map((todo) => todo.task),
        },
        complaints: {
            totalEmployeeComplaint,
        },
        attendance: {
            weeklyAttendanceCount,
            weeklyAttendanceChangePercent,
            data: formattedData
        },
    });
});

