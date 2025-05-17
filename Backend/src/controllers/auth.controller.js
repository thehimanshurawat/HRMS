import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwtUtils.js";
import Employee from "../models/employee.model.js";
import loginSchema from "../schema/loginSchema.js";
import ApiError from     "../utils/customError.js";
import { sendOTPEmail } from "../utils/nodemailer.js";
import crypto from "crypto";
 
// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log("body : ", req.body);
  // zod validation
  const { success, error } = loginSchema.safeParse({ email, password });

  if (!success) {
    throw new ApiError("Invalid Inputs", 400);
  }

  const existingEmp = await Employee.findOne({ email });

  if (!existingEmp) {
    throw new ApiError("Invalid Email or Password", 400);
     
  }

  const isPasswordCorrect = await existingEmp.isPasswordCorrect(password);
  if(!isPasswordCorrect){
    throw new ApiError("Invalid email or password", 400);
  }

  const verifiedEmp = await generateToken(existingEmp._id, res);

  if (!verifiedEmp) {
    throw new ApiError("Some error occured while logging in", 500);
  }

  return res.status(200).json({
    success: true,
    message: "Login Successfull",
  });
});

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.status({ success: false, message: "Error in Logout" });
  }
};

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Employee.findOne({ email });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const otp = crypto.randomInt(1000, 9999).toString();
  // console.log("otp",otp);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.resetOTP = otp;
  user.otpExpires = otpExpires;
  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new ApiError("Some error occured", 500);
  }

  await sendOTPEmail(email, otp);

  res.status(200).json({ message: "OTP sent successfully to your email.",otp, });
});

export const resetpassword = asyncHandler(async (req, res,next) => {
  const { email, password } = req.body;
 
  const user = await Employee.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  
  user.password =  password;
  const passwordchanged = await user.save();

  if(!passwordchanged){
    throw new ApiError("Some error occured", 500);
  } 

  res.status(200).json({ 
    success : true,
    message: "password update successfully." 
  });
});