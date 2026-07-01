import dbConnect from "@/database/dbConfig";
import UserModel from "@/models/user.model";
import { verifySchema } from "@/schemas/auth/verifySchema";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Establish database connection
  await dbConnect();

  try {
    // Parse request body
    const { username, code } = await request.json();

    // Validate the verification code
    const parsedData = verifySchema.safeParse({ code });

    if (!parsedData.success) {
      return NextResponse.json(
        new ApiResponse(
          400,
          "Invalid verification code",
          parsedData.error.format()
        ),
        { status: 400 }
      );
    }

    // Decode username received from the client
    const decodedUsername = decodeURIComponent(username);

    // Find the user by username
    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
      return NextResponse.json(
        new ApiResponse(404, "User not found"),
        { status: 404 }
      );
    }

    // Check whether the verification code is valid and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired =
      new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Mark the user as verified
      user.isVerified = true;

      await user.save();

      return NextResponse.json(
        new ApiResponse(200, "User verified successfully"),
        { status: 200 }
      );
    }

    // Verification code has expired
    if (!isCodeNotExpired) {
      return NextResponse.json(
        new ApiResponse(
          400,
          "Verification code has expired. Please sign up again."
        ),
        { status: 400 }
      );
    }

    // Verification code is incorrect
    return NextResponse.json(
      new ApiResponse(400, "Invalid verification code"),
      { status: 400 }
    );
  } catch (error) {
    // Log unexpected server errors
    console.error("Error while verifying user:", error);

    return NextResponse.json(
      new ApiResponse(500, "Error verifying user"),
      { status: 500 }
    );
  }
}