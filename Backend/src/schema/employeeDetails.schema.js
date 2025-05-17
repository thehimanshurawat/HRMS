import { z } from "zod";

const employeeSchema = z.object({
    employeeId: z.string().min(1, "Please provide employee-id"),
    username: z.string().min(3, "Please provide employee name"),
    email: z.string().email("Invalid email format"),
    profileImg: z.string().url().default("https://res.cloudinary.com/dal1usete/image/upload/v1739604949/j7axztsa2kjehkmqvdg7.webp"),
    phoneNo : z.string(),
    department: z.string().nonempty("Please provide employee department"),
    designation: z.string().min(1, "Please provide employee designation"),
    role: z.string().min(2, "Please provide employee role"),
    reportsTo: z.string().default(null),
    level: z.number().optional(),
    tenure: z.number().min(1, "Please provide employee tenure"),
    joiningDate: z.coerce.date(), // Accepts both Date objects and valid date strings
    lastWorkingDate: z.coerce.date().optional(),
    createdAt: z.date().optional(), // timestamps fields if needed
    updatedAt: z.date().optional()
});

export default employeeSchema;