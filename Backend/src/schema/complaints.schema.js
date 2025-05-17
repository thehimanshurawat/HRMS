import { z } from "zod";

const complaintSchema = z.object({
  username : z.string().min(1, "Please provide username"), 
  employee: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), 
 
  subject : z.string().min(1, "Please provide subject"),
  description: z.string().min(1, "Please describe your problem"),
  documents: z.array(
    z.object({
      url: z.string().url("Invalid URL format"),
      filename: z.string().min(1, "Filename is required"),
    })
  ), 
  status: z.enum(["Pending", "Resolved"]).default("Pending"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default complaintSchema;
