import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import Team from "../models/team.model.js";
import ApiError from "../utils/customError.js";
import Employee from "../models/employee.model.js";



// Get task by ID
export const getTeamById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Task ID" });
    }

    const task = await Team.findById(id)

    if (!task) {
        return res.status(404).json({ success: false, message: "Team not found" });
    }

    res.status(200).json({ success: true, data: task });
});

// Get all Employees in a team
export const getTeamMembers = asyncHandler(async (req,res) => {
    const {teamNo = null} = req.query;

    const existingTeams = await Employee.distinct("teamNo");

    // console.log("existing teams : ", existingTeams);

    if(!existingTeams.includes(Number(teamNo))){
        throw new ApiError("Team not found", 404);
    }

    const teamMembers = await Employee.find({teamNo}).select("-password");

    if(!teamMembers){
        throw new ApiError("Something went wrong", 500);
    }

    return res.json({
        success : true,
        teamMembers
    })
})