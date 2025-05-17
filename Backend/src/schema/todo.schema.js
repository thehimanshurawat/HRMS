import { z } from 'zod';

const todoSchema = z.object({
  task: z.string().nonempty("Task is required"),
  time: z.string().nonempty("Time is required").regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  employee: z.string().nonempty("Employee ID is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid Employee ID format"),
});

export default todoSchema;