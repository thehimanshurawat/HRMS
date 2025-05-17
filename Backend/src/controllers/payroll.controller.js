import Employee from "../models/employee.model.js";
import Payroll from "../models/payroll.model.js";
import payrollSchema from "../schema/payrollDetails.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";

export const createPayroll = asyncHandler(async (req, res) => {
  const { ctc, salaryPerMonth, employeeId, deductions } = req.body; // ctc salary/month and deduction and empId

  const { success, error } = payrollSchema.safeParse({
    ctc: Number(ctc),
    salaryPerMonth: Number(salaryPerMonth),
    deductions: Number(deductions),
    employeeId,
  });

  if (!success) {
    console.log("error : ", error);
    throw new ApiError("Invalid payroll data", 400);
  }

  const payrollEmployee = await Employee.findOne({
    employeeId: employeeId,
  }).select("_id");

  // console.log("payroll emp ; ", payrollEmployee);

  if (!payrollEmployee) {
    throw new ApiError("Invalid Employee ID", 400);
  }

  const payrollExists = await Payroll.findOne({ employee: payrollEmployee });

  if (payrollExists) {
    throw new ApiError("Payroll has already been created", 401);
  }

  // Create a new payroll entry
  const newPayroll = new Payroll({
    ctc: Number(ctc),
    salaryPerMonth: Number(salaryPerMonth),
    deductions: Number(deductions),
    employee: payrollEmployee,
  });

  // Save to the database
  const result = await newPayroll.save();

  return res.status(201).json({
    success: true,
    message: "Payroll created successfully",
    newPayroll: result,
  });
});

export const getPayroll = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const payroll = await Payroll.findById(id).populate("employee", "-password");
  // console.log("payroll : ", payroll);

  if (!payroll) throw new ApiError("No Payroll Found", 401);

  return res.status(200).json({
    success: true,
    payroll,
  });
});

export const updatePayroll = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const payroll = await Payroll.findById(id);

  if (!payroll) throw new ApiError("No Payroll Found", 401);

  const newUpdatedPayroll = await Payroll.findByIdAndUpdate(
    id,
    updatedData,
    { new: true , runValidators : true}
  );

  return res.status(201).json({
    success: true,
    payroll: newUpdatedPayroll,
  });
});

export const getAllpayroll = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const payrolls = await Payroll.find().skip(skip).limit(limit).populate("employee", "username profileImg employeeId designation department");

  // const payrolls = await Payroll.find();

  if (!payrolls) {
    throw new ApiError("No Payroll found", 404);
  }

  const totalCount = payrolls.length;

  return res.status(201).json({
    success: true,
    payrolls,
    pagination: {
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: skip + limit < totalCount,
      hasPrevPage: page > 1
    }
  });
});

export const deletePayroll = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const payroll = await Payroll.findById(id);
  if (!payroll) throw new ApiError("Payroll does not exist", 400);

  const deletedPayroll = await Payroll.findByIdAndDelete(id);

  if (!deletedPayroll) {
    throw new ApiError("Some error occured", 500);
  }

  return res.status(200).json({
    success: true,
    message: "Deleted Successfully!",
  });
});
