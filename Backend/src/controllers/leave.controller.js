import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";
import { sendNotification } from "../utils/socket-io.js";

// Apply for leave
export const applyLeave = asyncHandler(async (req, res) => {
	const { fromDate, toDate, reason } = req.body;
	const employeeId = req.currUser._id.toString();
	const reportingManager = req.currUser.reportsTo.toString();

	// Check whether reporting manager is not null
	if (!reportingManager) {
		return res
			.status(400)
			.json({ message: "Reporting Manager is not assigned" });
	}

	// Check whether leave is already given on the requested dates
	const existingLeaves = await Leave.find({
		employee: employeeId,
		$or: [{ fromDate: { $lte: toDate }, toDate: { $gte: fromDate } }],
	});

	if (existingLeaves.length > 0) {
		throw new ApiError(
			"Leave is already requested for the given dates",
			400
		);
	}

	const leave = new Leave({
		employee: employeeId,
		fromDate,
		toDate,
		reportingManager,
		reason,
	});

	const newLeave = await leave.save();
	// console.log("new leave : ", newLeave);

	if (!newLeave) {
		throw new ApiError("Some error occured, Please try again", 500);
	}

	// Sending notifications to employee and reporting manager
	const io = req.app.get("io");

	await sendNotification(
		io,
		[employeeId],
		"leave",
		"Your Leave Request has been sent."
	);
	await sendNotification(
		io,
		[reportingManager],
		"leave",
		`You have a Leave Request from ${req.currUser.username} | ID : ${req.currUser._id}`
	);

	return res.status(201).json({
		success : true,
		message: "Leave request submitted successfully",
		leave,
	});
});

// Get all leaves
export const getAllLeaves = asyncHandler(async (req, res) => {
	const leaves = await Leave.find().populate(
		"employee",
		"username profileImg email employeeId designation teamNo"
	);

	if (!leaves) {
		throw new ApiError("Something went wrong", 500);
	}

	return res.status(200).json({
		success: true,
		leaves,
	});
});

// Update leave status
export const updateLeaveStatus = asyncHandler(async (req, res) => {
	const { id: leaveId } = req.params;
	const { status } = req.body;
	const managerId = req.currUser._id;

	if (!["Approved", "Rejected"].includes(status)) {
		throw new ApiError("Invalid Leave status", 400);
	}

	const leave = await Leave.findById(leaveId);
	if (!leave) {
		throw new ApiError("Leave not found", 404);
	}

	if(leave.leaveStatus === "Approved" || leave.leaveStatus === "Rejected"){
		throw new ApiError("Leave has already updated", 400);
	}

	if (leave.reportingManager.toString() !== managerId.toString()) {
		throw new ApiError(
			"You are not the reporting manager to this employee",
			400
		);
	}

	leave.leaveStatus = status;

	const updatedLeave = await leave.save();

	if (!updatedLeave) {
		throw new ApiError("Something went wrong, please try again!", 500);
	}

	// send notification to employee
	const io = req.app.get("io");
	const empId = leave.employee?.toString();
	await sendNotification(
		io,
		[empId],
		"leave",
		`Your leave has been ${status}`
	);

	// Extending tenure if leave gets approves
	const employee = await Employee.findById(updatedLeave.employee);

	if (!employee) {
		throw new ApiError("Something went wrong, emp not found", 500);
	}

	if(updatedLeave.leaveStatus === "Approved"){
		employee.tenure += updatedLeave.days;
		const lastWorkingDate = new Date(employee.lastWorkingDate);
		lastWorkingDate.setUTCDate(lastWorkingDate.getUTCDate() + updatedLeave.days);
		employee.lastWorkingDate = lastWorkingDate;
	}
	
	const tenureAdd = await employee.save();

	// console.log("new tenure add employee", tenureAdd);

	if (!tenureAdd) {
		throw new ApiError("Tenure not extended", 500);
	}

	return res.status(200).json({
		success: true,
		message: `Leave request ${status}`,
		leave,
	});
});

// Get all leaves for one employee
export const getEmployeeLeaves = asyncHandler(async (req, res) => {
	const { id: employeeId } = req.params;
	const leaves = await Leave.find({ employee: employeeId }).populate(
		"reportingManager",
		"username"
	);

	if (!leaves) {
		throw new ApiError("Leaves not found", 404);
	}

	res.status(200).json({
		success: true,
		leaves,
	});
});
