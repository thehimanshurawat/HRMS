import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema({
    employee : {
        type : Schema.Types.ObjectId,
        ref : "Employee",
        required : true
    },
    fromDate: {
        type: Date,
        required: [true, "Please provide the start date of leave"]
    },
    toDate: {
        type: Date,
        required: [true, "Please provide the end date of leave"]
    },
    days : {
        type : Number,
    },
    reason: {
        type: String,
        required: [true, "Please provide the reason of leave"]
    },
    reportingManager: {
        type: Schema.Types.ObjectId,
        ref : "Employee",
        required : true
    },
    leaveStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
},{timestamps : true});

leaveSchema.pre("save" , function(next){
    const date1 = new Date(this.fromDate);
    const date2 = new Date(this.toDate);
    const diff = Math.abs(date2 - date1);
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000)) + 1;

    this.days = days;
    next();
})

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
