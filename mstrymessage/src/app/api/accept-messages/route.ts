import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";
import dbConnect from "@/database/dbConfig";
import { User } from "next-auth";
import UserModel from "@/models/user.model";
import { acceptMessageSchema } from "@/schemas/message/acceptMessageSchema";

// Update the user's message acceptance status
export async function POST(request: NextRequest) {
  // Connect to the database
  await dbConnect();

  // Get the authenticated user's session
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // Return if the user is not authenticated
  if (!session || !session.user) {
    return NextResponse.json(new ApiResponse(401, "Not Authenticated User"), {
      status: 401,
    });
  }

  // Validate request body
  const body = await request.json();
  const result = acceptMessageSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      new ApiResponse(400, "Invalid request data", result.error.format()),
      { status: 400 },
    );
  }

  const { isAcceptingMessage } = result.data;
  const userId = user._id;

  try {
    // Update the user's message acceptance status
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage },
      { new: true },
    );

    // Return if the user does not exist
    if (!updatedUser) {
      return NextResponse.json(new ApiResponse(404, "User not found"), {
        status: 404,
      });
    }

    // Return success response
    return NextResponse.json(
      new ApiResponse(200, "User status updated successfully", updatedUser),
      { status: 200 },
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Failed to update message acceptance status:", error);

    return NextResponse.json(
      new ApiResponse(500, "Failed to update user status to accept message"),
      { status: 500 },
    );
  }
}

// Get the current user's message acceptance status
export async function GET(request: NextRequest) {
  // Connect to the database
  await dbConnect();

  // Get the authenticated user's session
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // Return if the user is not authenticated
  if (!session || !session.user) {
    return NextResponse.json(new ApiResponse(401, "Not Authenticated User"), {
      status: 401,
    });
  }

  const userId = user._id;

  try {
    // Find the authenticated user
    const foundUser = await UserModel.findById(userId);

    // Return if the user does not exist
    if (!foundUser) {
      return NextResponse.json(new ApiResponse(404, "User not found"), {
        status: 404,
      });
    }

    // Return the user's current message acceptance status
    return NextResponse.json(
      new ApiResponse(200, "User found", foundUser.isAcceptingMessage),
      { status: 200 },
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Failed to fetch message acceptance status:", error);

    return NextResponse.json(
      new ApiResponse(500, "Failed to fetch user status to accept message"),
      { status: 500 },
    );
  }
}
