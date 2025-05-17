import { z } from "zod";

const attendanceSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }), 

  employee: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"), 

  status: z.enum(["Absent", "Late", "On-Time", "Leave"]), 
});

export default attendanceSchema;

