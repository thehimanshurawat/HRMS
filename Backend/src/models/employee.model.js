import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = new Schema({
    employeeId : {
        type : String,
        required : [true, "please provide employee-id"],
        unique : true
    },
    username : {
        type : String,
        required : [true, "please provide employee name"]
    },
    email : {
        type : String,
        required : [true, "please provide employee email"],
        unique : true
    },
    profileImg : {
        type : String,
        default : "https://res.cloudinary.com/dal1usete/image/upload/v1739604949/j7axztsa2kjehkmqvdg7.webp"
    },
    phoneNo : {
        type : String,
        required : [true, "Please provide employee contact no."]
    },
    department : {
        type : String,
        required : [true, "Please provide employee department"]
    },
    designation : {
        type : String,
        required : [true, "Please provide employee designation"]
    },
    role : {
        type : String,
        enum : ["Employee", "HR Associate", "Sr. HR Associate", "Manager", "Sr. Manager", "Director Associate", "Director", "Chief of Staff", "CEO"],
        required : [true, "Please provide employee role"]
    },
    password : {
        type : String,
    },
    teamNo : {
        type : Number,
        default : 0
    },
    reportsTo : {
        type : Schema.Types.ObjectId,
        ref : "Employee",
        default : null
    },
    level : {
        type : Number
    },
    tenure : {
        type : Number,
        required : true,
    },
    joiningDate : {
        type : Date,
        required : true,
    },
    lastWorkingDate : {
        type : Date
    },
    resetOTP : {
        type : Number
    },
    otpExpires : {
        type : Date
    }
},{timestamps : true});

employeeSchema.pre("save", async function(next){
    // password should only change if it is modified
    if(!this.isModified("password")){
        return next();
    }
    else{
        this.password = await bcrypt.hash(this.password, 10);
        // console.log("hashed password : ", this.password);
        next();
    }
})

employeeSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;