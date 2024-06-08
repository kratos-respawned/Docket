import { z } from "zod";
export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(28, "Password must be less than 28 characters"),
});
export type signInSchema = z.infer<typeof signInSchema>;
