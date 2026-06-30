import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(2, "Username or email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export type SignInSchema = z.infer<typeof signInSchema>;