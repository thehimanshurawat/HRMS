import { z } from "zod";

const payrollSchema = z.object({
  employeeId: z.string(),
  ctc: z.number().positive("CTC must be a positive number"),
  salaryPerMonth: z.number().positive("Salary per month must be a positive number"),
  deductions: z.number().min(0, "Deductions must be 0 or a positive number").optional(),
  status: z.enum(["Completed", "Pending"], { message: "Status must be either 'Completed' or 'Pending'" }).optional(),
});

export default payrollSchema;
