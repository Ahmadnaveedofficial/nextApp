import { z } from "zod";

// Validation schema for sending a message
export const messageSchema = z.object({
  // Validate message content
  content: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(500, "Message cannot exceed 500 characters"),
});

// Export inferred TypeScript type
export type MessageSchema = z.infer<typeof messageSchema>;
