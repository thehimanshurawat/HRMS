import express from "express";
import dotenv from "dotenv";
dotenv.config({ path : "./.env" });
import morgan from "morgan";
import connectDB from "./src/utils/dbConnect.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import {rateLimit} from "express-rate-limit";
import "./src/utils/crondailytask.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import {initSocket} from "./src/utils/socket-io.js";
import {attendanceScheduler} from "./src/utils/cronScheduler.js";

// importing routes
import authRoutes from "./src/routes/auth.routes.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import attendanceRoutes from "./src/routes/attendance.routes.js";
import payrollRoutes from "./src/routes/payroll.routes.js";
import teamRoutes from "./src/routes/team.routes.js";
import departmentRoutes from "./src/routes/department.routes.js";
import complaintRoutes from "./src/routes/complaint.routes.js";
import leaveRoutes from "./src/routes/leave.routes.js";
import todoRoutes from "./src/routes/todo.routes.js";
import holidayRoutes from "./src/routes/holiday.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";

const app = express();
const server = http.createServer(app);

const allowedOrigins = ["http://localhost:5173", import.meta.VITE_FRONTEND_SERVER];

const io = new Server(server, {
    cors : {
        origin : allowedOrigins,
        credentials : true
    }
});
app.set("io", io);

initSocket(io);
connectDB(); // connecting to db

const port = process.env.PORT || 3000;

const corsOptions = {
    origin : (origin, callback) => {
        if(origin || allowedOrigins.includes(origin)){
            callback(null, true); // Allow origin
        }
        else{
            callback(new Error("Not allowed by cors")); // Block request
        }
    },
    credentials : true
}

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("combined"));
app.use(cookieParser());

const limiter = rateLimit({
    windowMs : 10 * 60 * 1000, // 10 minutes
    max : 150,
    message : "Too many request from this IP, Please try again later"
})

app.use(limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/department", departmentRoutes);
app.use("/api/v1/complaint", complaintRoutes);
app.use("/api/v1/leave", leaveRoutes);
app.use("/api/v1/team", teamRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/payroll", payrollRoutes);
app.use("/api/v1/holiday", holidayRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/notification", notificationRoutes);

app.use(errorMiddleware);

server.listen(port, async () => {
    try {
        await connectDB(); // Connecting to DB
        console.log(`Server running on PORT: ${port}`);

        // Starting the attendance scheduler
        attendanceScheduler(io);
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1); // Exit the process with failure
    }
})