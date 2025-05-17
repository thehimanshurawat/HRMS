import jwt from "jsonwebtoken";
import Employee from "../models/employee.model.js";

export const generateToken = async (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const cookieOptions = {
    httpOnly: true, // Prevents JS access to cookies
    secure: process.env.ENVIRONMENT === "production", // Ensure cookies are sent over HTTPS in production
    maxAge: 9 * 60 * 60 * 1000,
  }

  if(process.env.ENVIRONMENT === "production"){
    cookieOptions.sameSite = 'None' // Allow cross-site cookies in production
  }

  res.cookie("token", token, cookieOptions);

  const employee = await Employee.findById(id).select("-password");

  return employee;
};
