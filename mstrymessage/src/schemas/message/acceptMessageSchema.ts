import { z } from "zod";

// Validation schema for updating message acceptance status
export const acceptMessageSchema = z.object({
  // Indicates whether the user wants to receive anonymous messages
  isAcceptingMessage: z.boolean(),
});

// Export inferred TypeScript type
export type AcceptMessageSchema = z.infer<typeof acceptMessageSchema>;
