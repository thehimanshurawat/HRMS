import { z } from 'zod';

const dailyTaskSchema = z.object({
  employee: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Employee ID format"),
  date: z.date().default(() => new Date()),
  employeeId: z.string().nonempty("Employee ID is required"),
  name: z.string().nonempty("Name is required"),
  teamNo: z.number().nullable().optional(),
  numberOfCalls: z.number().optional(),
  numberOfHiring: z.number().optional(),
  numberOfOnboarding: z.number().optional(),
  totalTechTeamHiring: z.number().optional(),
  jobPostLink: z.string().optional(),
  specificPostLink: z.string().optional(),
  updatedInGroup: z.boolean().optional(),
  updatedInSheet: z.boolean().optional(),
  updateEmailSent: z.boolean().optional(),
  attendedMeet: z.boolean().optional(),
  dailyTeamMeet: z.boolean().optional(),
  additionalTask: z.string().optional(),
  issuesAndIdeas: z.string().optional(),
  teamQueries: z.string().optional(),
});

export default dailyTaskSchema;