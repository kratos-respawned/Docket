import { z } from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );
export type SettingsSchema = z.infer<typeof SettingsSchema>;

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Minimum of 8 characters required",
      })
      .max(100, "Maximum 100 characters "),
    confirmPassword: z
      .string()
      .min(8, { message: "Minimum of 8 characters required" })
      .max(100, "Maximum 100 characters "),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Minimum of 8 characters required",
    })
    .max(100, "Maximum 100 characters "),
});
export type NewPasswordSchema = z.infer<typeof NewPasswordSchema>;

export const ResetSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .min(3, "Minimum 3 characters required")
    .max(100, "Maximum 100 characters "),
});
export type ResetSchema = z.infer<typeof ResetSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .min(3, "Minimum 3 characters required")
    .max(100, "Maximum 100 characters "),
  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(100, "Maximum 100 characters "),
  code: z.optional(z.string()),
});
export type LoginSchema = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .min(3, "Minimum 3 characters required")
    .max(100, "Maximum 100 characters "),
  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(100, "Maximum 100 characters "),
  name: z
    .string()
    .min(3, "Minimum 3 characters required")
    .max(100, "Maximum 100 characters "),
});
export type RegisterSchema = z.infer<typeof RegisterSchema>;
