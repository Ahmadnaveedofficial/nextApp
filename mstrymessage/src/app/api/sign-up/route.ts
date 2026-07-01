import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConfig";
import { sendVerificationEmail } from "@/helpers/sendEmailVerification";
import UserModel from "@/models/user.model";
import { signUpSchema } from "@/schemas/auth/signUpSchema";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: NextRequest) {
  // Establish database connection
  await dbConnect();

  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        new ApiResponse(400, result.error.issues[0].message),
        { status: 400 },
      );
    }

    // Extract validated data
    const { username, email, password } = result.data;

    // Normalize username and email
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if the username is already taken by another account
    const existingUsername = await UserModel.findOne({
      username: normalizedUsername,
    });

    if (existingUsername && existingUsername.email !== normalizedEmail) {
      return NextResponse.json(
        new ApiResponse(409, "Username is already taken."),
        { status: 409 },
      );
    }

    // Check if an account already exists with the provided email
    const existingUserByEmail = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUserByEmail?.isVerified) {
      return NextResponse.json(
        new ApiResponse(409, "An account with this email already exists."),
        { status: 409 },
      );
    }

    // Generate a secure six-digit verification code
    const verifyCode = crypto.randomInt(100000, 1000000).toString();

    // Set verification code expiry time (1 hour)
    const verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

    if (existingUserByEmail) {
      // Update the existing unverified account
      existingUserByEmail.username = normalizedUsername;
      existingUserByEmail.password = password;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;

      await existingUserByEmail.save();
    } else {
      // Create a new user account
      const newUser = new UserModel({
        username: normalizedUsername,
        email: normalizedEmail,
        password,
        verifyCode,
        verifyCodeExpiry,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      normalizedEmail,
      normalizedUsername,
      verifyCode,
    );

    if (!emailResponse.success) {
      return NextResponse.json(new ApiResponse(500, emailResponse.message), {
        status: 500,
      });
    }

    // Return success response
    return NextResponse.json(
      new ApiResponse(
        201,
        "User registered successfully. Please check your email for verification.",
      ),
      { status: 201 },
    );
  } catch (error: unknown) {
    // Log unexpected server errors
    console.error("Signup Error:", error);

    // Handle MongoDB duplicate key errors
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        new ApiResponse(409, "Username or email already exists."),
        { status: 409 },
      );
    }

    // Return generic server error
    return NextResponse.json(new ApiResponse(500, "Internal Server Error"), {
      status: 500,
    });
  }
}
