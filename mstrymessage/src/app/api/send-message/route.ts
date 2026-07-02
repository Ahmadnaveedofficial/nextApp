import UserModel, { Message } from "@/models/user.model";
import dbConnect from "@/database/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: NextRequest) {
  // Establish database connection
  await dbConnect();

  try {
    // Extract request body
    const { username, content } = await request.json();

    // Find user by username
    const user = await UserModel.findOne({ username });

    // Return if user does not exist
    if (!user) {
      return NextResponse.json(new ApiResponse(404, "User not found"), {
        status: 404,
      });
    }

    // Check whether the user is accepting anonymous messages
    if (!user.isAcceptingMessage) {
      return NextResponse.json(
        new ApiResponse(403, "User is not accepting messages"),
        { status: 403 },
      );
    }

    // Create a new anonymous message
    const newMessage: Message = {
      content,
      createdAt: new Date(),
    } as Message;

    // Add message to the user's inbox
    user.messages.push(newMessage);

    // Save updated user document
    await user.save();

    return NextResponse.json(
      new ApiResponse(200, "Message sent successfully"),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending anonymous message:", error);

    return NextResponse.json(new ApiResponse(500, "Internal Server Error"), {
      status: 500,
    });
  }
}
