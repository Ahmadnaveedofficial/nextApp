import { z } from "zod";

// Validation schema for email verification code
export const verifySchema = z.object({
  // Verification code must be a 6-digit numeric string
  code: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

// Export inferred TypeScript type
export type VerifySchema = z.infer<typeof verifySchema>;
