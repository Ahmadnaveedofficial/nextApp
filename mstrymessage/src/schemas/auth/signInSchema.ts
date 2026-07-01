import { z } from "zod";

// Validation schema for user sign in
export const signInSchema = z.object({
  // Accept username or email as the login identifier
  identifier: z.string().min(2, "Username or email is required"),

  // Validate password length
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

// Export inferred TypeScript type
export type SignInSchema = z.infer<typeof signInSchema>;
