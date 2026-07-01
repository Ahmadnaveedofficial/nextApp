import { Resend } from "resend";

// Initialize the Resend client using the API key from environment variables
export const resend = new Resend(process.env.RESEND_API_KEY);