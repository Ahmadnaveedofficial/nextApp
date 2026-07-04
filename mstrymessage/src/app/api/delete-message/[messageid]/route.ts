import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";
import dbConnect from "@/database/dbConfig";
import { User } from "next-auth";
import UserModel from "@/models/user.model";

interface RouteParams {
  params: Promise<{
    messageid: string;
  }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  // Establish Database Connection

  await dbConnect();

  // Get Authenticated User

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // Authentication Check

  if (!session || !session.user) {
    return NextResponse.json(new ApiResponse(401, "Not Authenticated User"), {
      status: 401,
    });
  }

  // Get Dynamic Route Param

  const { messageid } = await params;

  try {
    // Delete Message

    const result = await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        $pull: {
          messages: {
            _id: messageid,
          },
        },
      },
    );

    // Message Not Found

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        new ApiResponse(404, "Message not found or already deleted"),
        {
          status: 404,
        },
      );
    }

    // Success Response

    return NextResponse.json(
      new ApiResponse(200, "Message deleted successfully"),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error deleting message:", error);

    return NextResponse.json(new ApiResponse(500, "Internal Server Error"), {
      status: 500,
    });
  }
}
