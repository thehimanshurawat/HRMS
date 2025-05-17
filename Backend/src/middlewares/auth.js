import Employee from "../models/employee.model.js";
import ApiError from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const hierarchyTable = {
    "Employee": { level: 1, reportsTo: "HR Associate" },
    "HR Associate": { level: 2, reportsTo: "Sr. HR Associate" },
    "Sr. HR Associate": { level: 3, reportsTo: "Manager" },
    "Manager": { level: 4, reportsTo: "Sr. Manager" },
    "Sr. Manager": { level: 5, reportsTo: "Director Associate" },
    "Director Associate": { level: 6, reportsTo: "Director" },
    "Director": { level: 7, reportsTo: "Chief of Staff" },
    "Chief of Staff": { level: 8, reportsTo: "CEO" },
    "CEO": { level: 9, reportsTo: null } // CEO has no superior
}

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log("token : ", token);
    
        if(!token){
            return next(new ApiError("Token not found, Please Login First", 403));
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded : ", decoded);
    
        const userId = decoded.id;
    
        const loggedInUser = await Employee.findOne({_id : userId}).select("-password");
    
        if(!loggedInUser){
            return next(new ApiError("Invalid token, Please login again", 401));
        }
    
        // Keeping logged in user in req object
        req.currUser = loggedInUser;
    
        return next();
    } catch (error) {
        return next(new ApiError("Invalid token, Login again", 400));
    }
};

export const isAuthorized = (action) => async (req,res,next) => {
    try {
        const user = req.currUser;
        const {id : employeeId} = req.params;

        if(!user){
            return next(new ApiError("Login first", 400));
        };

        if(!employeeId){
            return next(new ApiError("Invalid Employee id", 400));
        }

        const userLevel = hierarchyTable[user.role]?.level;
        if(!userLevel){
            return next(new ApiError("Invalid role", 403));
        }

        if(userLevel >= 6) return next();

        if(user._id.toString() === employeeId && (action === "update" || action === "get")) return next(); // allow self data to see or update

        const targetEmployee = await Employee.findById(employeeId);
        if(!targetEmployee){
            return next(new ApiError("Employee not found", 404));
        }

        if(userLevel <= 2 && (action === "update" || action === "delete" || action === "create")){
            return next(new ApiError("Permission Denied", 403));
        }

        const targetLevel = hierarchyTable[targetEmployee.role]?.level;

        if(userLevel > targetLevel) return next();

        return next(new ApiError("Permission Denied", 403));

    } catch (error) {
        console.log("error in auth : ", error);
        return next(new ApiError("Internal server error", 500));
    }
}

export const isCEO = async (req,res, next) => {
    if(req.currUser.level != 9){
        return next(new ApiError("Access Denied", 403));
    }

    next();
}