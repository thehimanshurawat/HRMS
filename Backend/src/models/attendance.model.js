import mongoose, { Schema } from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  employee   : {
    type : Schema.Types.ObjectId,
    ref : "Employee"
  },
  status: {
    type: String,
    enum: ["Absent", "Late", "On-Time", "Leave"],
    default: "Absent",
  },
  submissionTime : {
    type : Date,
    default : Date.now()
  }
}, {timestamps : true});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
