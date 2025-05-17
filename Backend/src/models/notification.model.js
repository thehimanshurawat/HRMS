import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new Schema({
    recipients : [{
        type : Schema.Types.ObjectId,
        ref : "Employee",
    }],
    message : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ["general", "personal", "leave", "complaint"],
        required : true
    },
    status : {
        type : String,
        enum : ["unread", "read"],
        default : "unread"
    }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
