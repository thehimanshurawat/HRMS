import Complaint from "../models/complaints.model.js";
import Employee from "../models/employee.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import complaintSchema from "../schema/complaints.schema.js";
import { sendNotification } from "../utils/socket-io.js";

// Submit complaint
export const submitComplaint = asyncHandler(async (req, res) => {
	const { subject, description } = req.body;
	// console.log("req body : ", req.body);

	const employee = req.currUser._id.toString();

	const user = await Employee.findById(employee);

	if (!user) {
		throw new ApiError(404, "Employee not found");
	}

	// console.log("user : ", user);

	let documents = [];
	if (req.files && req.files.length > 0) {
		for (const file of req.files) {
			try {
				const uploadedResponse = await uploadOnCloudinary(file.path, {
					use_filename: true,
				});
				// console.log("Cloudinary Upload Response:", uploadedResponse);

				documents.push({
					url: uploadedResponse.secure_url,
					filename: file.originalname,
				});
			} catch (error) {
				console.error("Cloudinary Upload Error:", error);
				throw new ApiError("Error uploading file to Cloudinary", 500);
			}
		}
	}

	// zod validation
	const { success, error } = complaintSchema.safeParse({
		username: user.username,
		employee,
		subject,
		description,
		documents,
	});

	if (!success) {
		console.log("error : ", error);
		throw new ApiError("Invalid Inputs", 400);
	}

	const complaint = new Complaint({
		username: user.username,
		employee,
		subject,
		description,
		documents,
	});
	const newComplaint = await complaint.save();

	if (!newComplaint) {
		throw new ApiError("Something went wrong, Please try again", 500);
	}

	// Send notifications to all seniors
	let allRecipientsId = await Employee.find({
		level : {
			$gt : user.level
		}
	}).select("_id");

	allRecipientsId = allRecipientsId.map((id) => id._id.toString());
	// console.log("all : ", allRecipientsId);
	
	const io = req.app.get("io");
	await sendNotification(io, allRecipientsId, "complaint", `Complaint from ${user.username}`);

	await sendNotification(io, [employee], "complaint", "Your complaint has been submitted");

	return res.status(201).json({
		success: true,
		message: "Complaint submitted successfully",
		complaint,
	});
});

export const getEmployeeComplaints = asyncHandler(async (req, res) => {
	const { id: employee } = req.params;

	const complaints = await Complaint.find({ employee });

	if (!complaints) {
		throw new ApiError("Complaints not found", 404);
	}

	res.status(200).json({
		success: true,
		complaints,
	});
});

export const getAllComplaints = asyncHandler(async (req, res) => {
	
	const employeesId = await Employee.find({
		level : {
			$lte : req.currUser.level
		}
	}).select("_id");
	
	const complaints = await Complaint.find({
		employee : {$in : employeesId}
	}).populate("employee", "username");

	if (!complaints) {
		throw new ApiError("Some error occured", 500);
	}

	return res.status(200).json({
		success: true,
		complaints,
	});
});
