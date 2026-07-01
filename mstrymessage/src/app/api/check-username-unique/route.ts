import dbConnect from "@/database/dbConfig";
import UserModel from "@/models/user.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/auth/signUpSchema";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";

// Schema for validating username query parameter
const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  // Establish database connection
  await dbConnect();

  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);

    const queryParams = {
      username: searchParams.get("username"),
    };

    // Validate query parameters
    const result = usernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameError =
        result.error.format().username?._errors || [];

      return NextResponse.json(
        new ApiResponse(
          400,
          usernameError.length > 0
            ? usernameError.join(", ")
            : "Invalid query parameters"
        ),
        { status: 400 }
      );
    }

    // Extract validated username
    const { username } = result.data;

    // Check if the username already belongs to a verified account
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        new ApiResponse(400, "Username is already taken"),
        { status: 400 }
      );
    }

    // Username is available
    return NextResponse.json(
      new ApiResponse(200, "Username is unique"),
      { status: 200 }
    );
  } catch (error) {
    // Log unexpected server errors
    console.error("Error checking username:", error);

    return NextResponse.json(
      new ApiResponse(500, "Error checking username"),
      { status: 500 }
    );
  }
}