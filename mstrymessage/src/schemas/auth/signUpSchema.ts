import { z } from "zod";

// Reusable username validation schema
export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username cannot exceed 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  );

// Validation schema for user registration
export const signUpSchema = z.object({
  // Validate username
  username: usernameValidation,

  // Validate email address
  email: z.email("Please enter a valid email address"),

  // Validate password length
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

// Export inferred TypeScript type
export type SignUpSchema = z.infer<typeof signUpSchema>;