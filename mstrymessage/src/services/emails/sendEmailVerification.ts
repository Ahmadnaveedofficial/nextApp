
//  if i can use resend then i will use it otherwise i will use nodemailer


// import VerificationEmail from "../services/emails/VerificationEmail";
// import { ApiResponse } from "@/utils/ApiResponse";
// import { ApiError } from "@/utils/ApiError";

// // Send email verification OTP to the user
// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string,
// ): Promise<ApiResponse<null>> {
//   try {
//     // Send verification email using Resend
//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: "Verify Your Email",
//       react: VerificationEmail({
//         username,
//         otp: verifyCode,
//       }),
//     });

//     // Return success response
//     return new ApiResponse(200, "Verification email sent successfully");
//   } catch (error) {
//     // Log the error for debugging
//     console.error(error);

//     // Throw a custom API error
//     throw new ApiError(500, "Failed to send verification email");
//   }
// }



import { transporter } from "@/utils/nodemailer";
import VerificationEmail from "./VerificationEmail";
import { render } from "@react-email/render";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

// Send email verification OTP
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse<null>> {
  try {
    const html = await render(
      VerificationEmail({
        username,
        otp: verifyCode,
      })
    );

    await transporter.sendMail({
      from: `"MysteryMessage" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html,
    });

    return new ApiResponse(
      200,
      "Verification email sent successfully"
    );
  } catch (error) {
    console.error(error);

    throw new ApiError(
      500,
      "Failed to send verification email"
    );
  }
}