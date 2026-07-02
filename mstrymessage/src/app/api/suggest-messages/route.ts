import { NextResponse } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";
import { generateMessageSuggestions } from "@/services/ai";

export async function GET() {
  try {
    // Generate anonymous message suggestions
    const suggestions = await generateMessageSuggestions();

    // Return successful response
    return NextResponse.json(
      new ApiResponse(
        200,
        "Message suggestions generated successfully.",
        suggestions,
      ),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error generating message suggestions:", error);

    // Return error response
    return NextResponse.json(
      new ApiResponse(500, "Failed to generate message suggestions."),
      {
        status: 500,
      },
    );
  }
}
