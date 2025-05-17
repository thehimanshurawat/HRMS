import mongoose from "mongoose";
import { Schema } from "mongoose";

const complaintSchema = new Schema({
    employee : {
        type : Schema.Types.ObjectId,
        ref : "Employee",
        required : true
    },
    username: { 
        type: String,
        required: true
    },
    subject : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : [true, "Please describe your problem"]
    },
    documents : [{
        url : {
            type : String,
            required : true
        },
        filename : {
            type : String,
            required : true
        }
    }],
    status : {
        type : String,
        enum : ["Pending", "Resolved"],
        default : "Pending"
    }
},{timestamps : true})

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;