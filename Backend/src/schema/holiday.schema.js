import { z } from 'zod';

const holidaySchema = z.object({
  date: z.date().refine(date => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),
  name: z.string().nonempty("Name is required"),
});

export default holidaySchema;