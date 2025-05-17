import mongoose, { Schema } from "mongoose";

const departmentSchema = new mongoose.Schema({
    departmentName:{
        type : String,
        required : [true,"please provide your department"],
        unique : true
    },
    employees : [{
        type : Schema.Types.ObjectId,
        ref : "Employee"
    }],
    departmentHead : {
        type : Schema.Types.ObjectId,
        ref : "Employee"
    }
})

const Department  = mongoose.model("Department", departmentSchema);
export default Department;
