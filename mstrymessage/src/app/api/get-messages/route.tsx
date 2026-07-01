import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";
import dbConnect from "@/database/dbConfig";
import { User } from "next-auth";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  // Establish database connection
  await dbConnect();

  // Get the currently authenticated user session
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // Return unauthorized if the user is not logged in
  if (!session || !session.user) {
    return NextResponse.json(new ApiResponse(401, "Not Authenticated User"), {
      status: 401,
    });
  }

  // Convert the user id into a MongoDB ObjectId
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    // Fetch all messages of the logged-in user using MongoDB Aggregation
    const result = await UserModel.aggregate([
      // Match the logged-in user
      {
        $match: {
          _id: userId,
        },
      },

      // Separate each message into its own document
      {
        $unwind: "$messages",
      },

      // Sort messages by newest first
      {
        $sort: {
          "messages.createdAt": -1,
        },
      },

      // Group messages back into an array
      {
        $group: {
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);

    // Return if user or messages are not found
    if (!result.length) {
      return NextResponse.json(new ApiResponse(404, "User not found"), {
        status: 404,
      });
    }

    // Return all messages
    return NextResponse.json(
      new ApiResponse(
        200,
        "User messages fetched successfully",
        result[0].messages,
      ),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching user messages:", error);

    return NextResponse.json(new ApiResponse(500, "Internal Server Error"), {
      status: 500,
    });
  }
}
