import Employee from "../models/employee.model.js";
import employeeSchema from "../schema/employeeDetails.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { hierarchyTable } from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import Leave from "../models/leave.model.js";
import Attendance from "../models/attendance.model.js";
import DailyTask from "../models/dailyTask.model.js";
import Notification from "../models/notification.model.js";
import Payroll from "../models/payroll.model.js";
import Todo from "../models/todo.model.js";
import Complaint from "../models/complaints.model.js";
import mongoose from "mongoose";
import { sendNotification } from "../utils/socket-io.js";

// Add new Employee
export const addNewEmployee = asyncHandler(async(req, res) => {
    const empData = req.body;

    if(req.currUser.level <= 2){
        throw new ApiError("You can't add new employee", 403);
    }

    // checking for profile-img
    let profileImgUrl = "https://res.cloudinary.com/dal1usete/image/upload/v1739604949/j7axztsa2kjehkmqvdg7.webp";

    if(req.file?.path){
        const response = await uploadOnCloudinary(req.file.path);
        // console.log("cloudinary res : ", response);

        if(!response){
            throw new ApiError("Upload failed", 500);
        }

        profileImgUrl = response.secure_url;
    }
    
    // zod input validation
    const {success, error} = employeeSchema.safeParse({...empData, tenure : Number(empData.tenure), profileImg : profileImgUrl});

    if(!success){
        console.log("zod error : ", error);
        throw new ApiError(error.message || "Invalid Input", 400);
    }

    const uniqueEmail = await Employee.findOne({email : empData.email});
    const uniqueEmpId = await Employee.findOne({employeeId : empData.employeeId});

    if(uniqueEmail){
        throw new ApiError("Employee with given email already exist", 400);
    }
    if(uniqueEmpId){
        throw new ApiError("Employee with given employee ID already exist", 400);
    }
    
    if(!hierarchyTable[empData.role]){
        throw new ApiError("Invalid role provided", 400);
    }
    
    const newEmployee = new Employee(empData);
    
    const reportsTo = await Employee.findOne({employeeId : empData.reportsTo}).select("_id");
    const level = hierarchyTable[empData.role]?.level;
    
    const joiningDate = newEmployee.joiningDate;
    
    let lastWorkingDate = new Date(Date.UTC(joiningDate.getFullYear(), joiningDate.getMonth(), joiningDate.getDate() + newEmployee.tenure));
    // console.log("joining date : ", joiningDate);
    // console.log("last working date : ", lastWorkingDate);

    // modifying the new employee
    newEmployee.password = `${empData.username.replace(/\s/g, "")}${empData.employeeId}`;
    newEmployee.level = level;
    newEmployee.reportsTo = reportsTo;
    newEmployee.lastWorkingDate = lastWorkingDate;
    newEmployee.profileImg = profileImgUrl;

    // console.log("new emp : ", newEmployee);
    
    const result = await newEmployee.save();
    // console.log("result : ", result);

    if(!result){
        throw new ApiError("Employee not created", 500);
    }

    return res.status(201).json({
        success : true,
        message : "Employee created successfully",
        newEmployee : result
    })
})

// Get all employee data
export const getAllEmployees = asyncHandler(async (req,res) => {
    const empLevel = req.currUser.level;

    let result = await Employee.find({
        level : {
            $lte : empLevel
        }
    })

    result = result.filter((emp) => {
        return (emp._id.toString() !== req.currUser._id.toString());
    });

    if(!result){
        throw new ApiError("Employees not found", 404);
    }

    return res.status(200).json({ 
        success: true,
        result 
    });

})

// Get specific employee data
export const getEmployee = asyncHandler(async (req,res) => {

    const {id} = req.params
    // console.log(id)
    
    if(!id){
        throw new ApiError("Employee ID is required", 400);
    }

    const employee = await Employee.findOne({_id:id}).select('-password').populate("reportsTo", "username employeeId");

    if(!employee){
        throw new ApiError("Employee not found", 404);
    }

    return res.status(200).json({
        success:true,
        employee,
    })
})

// Update any employee details
export const updateEmployee = asyncHandler(async(req,res)=>{
    const loggedinUserID = req.currUser._id.toString();
    const {id} = req.params;

    // console.log("logged in user : ", loggedinUserID);
    // console.log("id : ", id);
    // console.log("body : ", req.body)
    const targetedEmployee = await Employee.findById(id).populate("reportsTo", "employeeId");

    const updateData = {};
    if(loggedinUserID === id){
        let {password, phoneNo} = req.body;

        // if updating profile image
        let newProfile;
        if(req.file?.path){
            const response = await uploadOnCloudinary(req.file.path);
            
            if(!response){
                throw new ApiError("Profile image upload failed", 500);
            }
            
            newProfile = response.secure_url;
        }

        // encrypting password
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        } 
        if(phoneNo) updateData.phoneNo = phoneNo;
        // console.log("new profile img : ", newProfile);
        if(newProfile) updateData.profileImg = newProfile;
    }
    else{
        const {role, teamNo, reportsTo, department, designation, tenure} = req.body;
        if(role){
            if(reportsTo === targetedEmployee.reportsTo.employeeId){
                throw new ApiError("Provide updated reports field also to update role", 400);
            }
            else{
                updateData.role = role;
            }
        }
        if(teamNo) updateData.teamNo = teamNo;
        if(department) updateData.department = department;
        if(designation) updateData.designation = designation;
        if(tenure) updateData.tenure = tenure;
        if(reportsTo){
            const reportsToId = await Employee.findOne({employeeId : reportsTo}).select("_id");

            // update leaves data reporting manager also
            const leaves = await Leave.find({employee : id});
            // console.log("leaves : ", leaves);

            if(!leaves){
                throw new ApiError("Leaves not found", 404);
            }

            const updatedLeaves = await Promise.all(
                leaves.map(async (leave) => {
                    leave.reportingManager = reportsToId;
                    return await leave.save();
                })
            )
            
            // console.log("updated leaves : ", updatedLeaves);
            if(!updatedLeaves){
                throw new ApiError("reporting manager not updated for leaves", 500);
            }

            updateData.reportsTo = reportsToId;
        };
    }

    const updatedEmp = await Employee.findByIdAndUpdate(id, updateData, {new : true});

    if(!updatedEmp){
        throw new ApiError("Some error occured while updating", 500);
    }

    // Notify employee
    const io = req.app.get("io");
    await sendNotification(io, [id], "personal", "Your profile has been updated");

    res.status(200).json({
        success : true,
        message : "Employee details updated successfully",
        updatedEmp
    })

})

// Delete any employee
export const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log("req params : ", req.params);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedEmp = await Employee.findByIdAndDelete(id, { session });

        if (!deletedEmp) {
            throw new ApiError("Failed to delete the employee", 500);
        }

        // Updating all the employees reportsTo which were reporting to this employee
        await Employee.updateMany(
            { reportsTo: id },
            { $set: { reportsTo: null } },
            { session }
        );

        // Deleting Employee data from all other collections
        await Leave.deleteMany({ employee: id }, { session });
        await Attendance.deleteMany({ employee: id }, { session });
        await DailyTask.deleteMany({ employee: id }, { session });
        await Notification.deleteMany({
            recipients: { $in: [id] }
        }, { session });
        await Payroll.deleteMany({ employee: id }, { session });
        await Todo.deleteMany({ employee: id }, { session });
        await Complaint.deleteMany({ employee: id }, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: "Employee deleted successfully",
            deletedEmp
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError("Failed to delete the employee and related data", 500);
    }
});

// Get logged-in user
export const getLoggedInEmployee = asyncHandler(async (req,res) => {
    if(!req.currUser){
        throw new ApiError("No Logged in user, Login first", 404);
    }

    return res.status(200).json({
        success : true,
        loggedInUser : req.currUser
    })
})