import { z } from "zod";

const departmentSchema = z.object({
  departmentName: z.string().min(1, "Please provide your department"),
  employees: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Employee ID")).optional(),
  departmentHead : z.string()
});

export default departmentSchema;
