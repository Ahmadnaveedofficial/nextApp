import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConfig";
import { sendVerificationEmail } from "@/helpers/sendEmailVerification";
import UserModel from "@/models/user.model";
import { signUpSchema } from "@/schemas/auth/signUpSchema";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    // Parse request body
    const body = await request.json();

    // Validate request body
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        new ApiResponse(400, result.error.issues[0].message),
        { status: 400 },
      );
    }

    // Extract validated data
    const { username, email, password } = result.data;

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if username is already taken
    const existingUsername = await UserModel.findOne({
      username: normalizedUsername,
    });

    if (existingUsername && existingUsername.email !== normalizedEmail) {
      return NextResponse.json(
        new ApiResponse(409, "Username is already taken."),
        { status: 409 },
      );
    }

    // Check if email already exists
    const existingUserByEmail = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUserByEmail?.isVerified) {
      return NextResponse.json(
        new ApiResponse(409, "An account with this email already exists."),
        { status: 409 },
      );
    }

    // Generate secure 6-digit verification code
    const verifyCode = crypto.randomInt(100000, 1000000).toString();

    // Verification code expires in 1 hour
    const verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

    if (existingUserByEmail) {
      // Update existing unverified account
      existingUserByEmail.username = normalizedUsername;
      existingUserByEmail.password = password;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;

      await existingUserByEmail.save();
    } else {
      // Create new account
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

    return NextResponse.json(
      new ApiResponse(
        201,
        "User registered successfully. Please check your email for verification.",
      ),
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Signup Error:", error);

    // Handle duplicate key errors
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

    return NextResponse.json(new ApiResponse(500, "Internal Server Error"), {
      status: 500,
    });
  }
}
