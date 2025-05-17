import Employee from "../models/employee.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";
 
export const getDepartmentOfEmployee = asyncHandler(async (req,res)=>{

       const loggedInUserId = req.currUser._id; 

       const employee = await Employee.findById(loggedInUserId)
           .populate("reportingManager", "username") 
           .select("username department designation reportingManager");

       if (!employee) {
           throw new ApiError("Employee not found", 404);
       }

       res.status(200).json(employee);
})
