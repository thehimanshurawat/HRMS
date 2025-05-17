import Notification from "../models/notification.model.js";

// send notification and save to DB
const sendNotification = async (io, empIds, type, message) => {
    const newNotification = await Notification.create({
        recipients : empIds,
        message,
        type
    })
    // console.log("emp ids : ", empIds);
    empIds.forEach((userId) => {
        io.to(userId.toString()).emit("receiveNotification", newNotification);
    })
}

const initSocket = (io) => {
    io.on("connection", (socket) => {
        // console.log("New client connected : ", socket.id);
        
        // User joins their room (employee-id)
        socket.on("joinRoom", (empId) => {
            socket.join(empId);
            // console.log(`Employee joined room : ${empId}`);
        })

        // On user login, send unread notifications
        socket.on("fetchUnreadNotification", async (empId) => {
            const unreadNotifications = await Notification.find({recipients : {$in : [empId]}, status : "unread"});
            unreadNotifications.forEach((notification) => {
                socket.emit("receiveNotification", notification);
            })
        })

        socket.on("disconnect", () => {
            // console.log("Client Disconnected : ", socket.id);
        })
    })
}

export {initSocket, sendNotification};