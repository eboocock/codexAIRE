import { z } from "zod";

export const intakeSchema = z.object({
  role: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(2),
  timeline: z.string().min(2),
  goals: z.string().min(5),
  painPoints: z.string().min(5),
  state: z.string().min(2)
});
