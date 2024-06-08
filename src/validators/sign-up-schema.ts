import { z } from "zod";
export const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(28, "Password must be less than 28 characters"),
  name: z
    .string()
    .min(3, "name must be at least 3 characters long")
    .max(25, "name must be less than 25 characters"),
});
export type signUpSchema = z.infer<typeof signUpSchema>;
