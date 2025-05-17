import { z } from 'zod';

const notificationSchema = z.object({
  recipient : z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Employee ID format"),
  message : z.string().nonempty("message is required"),
  type : z.enum(["general", "personal", "leave", "complaint"]),
  status : z.enum(["unread", "read"]).default("unread")
});

export default notificationSchema;