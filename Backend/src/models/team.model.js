import mongoose, { Schema } from "mongoose";

const teamSchema = new mongoose.Schema({
    teamNo: {
        type: String,
        required: [true, "Please provide the teamno"]
    },
    employees : [{
        type : Schema.Types.ObjectId,
        ref : "Employee"
    }]
},{timestamps : true});

const Team = mongoose.model("Task", teamSchema);
export default Team;