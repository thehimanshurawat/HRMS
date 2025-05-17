import Notification from "../models/notification.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";

export const getEmployeeNotification = asyncHandler(async (req,res) => {
    const empId = req.currUser._id.toString();

    const notifications = await Notification.find({
        recipients : {
            $in : [empId]
        }
    }).sort({createdAt : -1}) // Sort by most recent one

    if(!notifications){
        throw new ApiError("No Notifications found", 404);
    }

    return res.status(200).json({
        success : true,
        notifications
    })
})

export const markAllNotificationsAsRead = asyncHandler(async (req,res) => {
    const empId = req.currUser._id;

    const notifications = await Notification.find({
        recipients : {$in : [empId]},
        status : "unread"
    });

    // console.log("unread notifications : ", notifications);

    if(!notifications){
        throw new ApiError("Notification not found", 404);
    }

    notifications.forEach(async (notification) => {
        notification.status = "read";
        await notification.save();
    })

    return res.status(200).json({
        success : true,
        message : "Notifications marked as read"
    })
})