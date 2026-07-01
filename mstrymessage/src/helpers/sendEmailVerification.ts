import { resend } from "@/utils/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse<null>> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify Your Email",
      react: VerificationEmail({
        username,
        otp: verifyCode,
      }),
    });

    return new ApiResponse(200, "Verification email sent successfully");
  } catch (error) {
    console.error(error);

    throw new ApiError(
      500,
      "Failed to send verification email"
    );
  }
}