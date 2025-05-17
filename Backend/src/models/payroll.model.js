import mongoose, { Schema } from "mongoose";

const payrollSchema = new mongoose.Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref : "Employee",
        required: true
    },
    ctc: {
        type: Number,
        required: [true, "Please provide the CTC amount"]
    },
    salaryPerMonth: {
        type: Number,
        required: [true, "Please provide the monthly salary"]
    },
    deductions: {
        type: Number,
        default : 0
    },
    // status :{
    //     type : String,
    //     enum : ["Completed","Pending"],
    //     default : "Pending"
    // }
});

const Payroll = mongoose.model("Payroll", payrollSchema);
export default Payroll;
