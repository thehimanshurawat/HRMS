import { z } from "zod";

const projectDetailsSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"), 
  projectName: z.string().min(1, "Project name is required"), 
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date format",
  }), 
  finishDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid finish date format",
  }), 
  status: z.string().min(1, "Project status is required"), 
});

export default projectDetailsSchema;
