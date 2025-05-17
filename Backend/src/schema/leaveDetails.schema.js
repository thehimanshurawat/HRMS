import { z } from "zod";


const leaveSchema = z.object({
  fromDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date format",
  }),
  toDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date format",
  }),
  duration: z.number().positive("Duration must be a positive number"),
  reportingManager: z.string().min(2, "Reporting manager's name is required"),
  leaveStatus: z.enum(["Pending", "Approved", "Rejected"]),
});

export default leaveSchema;
