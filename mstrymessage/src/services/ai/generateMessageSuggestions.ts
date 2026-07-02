import { generateText } from "ai";
import { geminiFlashModel } from "./models";
import { MESSAGE_SUGGESTION_PROMPT } from "./prompts";

// Number of suggestions to generate
const SUGGESTION_COUNT = 5;

// Generates anonymous message suggestions using Gemini AI
export async function generateMessageSuggestions(): Promise<string[]> {
  // Generate text from the AI model
  const { text } = await generateText({
    model: geminiFlashModel,
    prompt: MESSAGE_SUGGESTION_PROMPT,
  });

  // Convert AI response into a clean array
  const suggestions = text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  // Ensure the AI returned the expected number of suggestions
  if (suggestions.length < SUGGESTION_COUNT) {
    throw new Error(
      `Expected ${SUGGESTION_COUNT} suggestions, but received ${suggestions.length}.`,
    );
  }

  // Return only the required number of suggestions
  return suggestions.slice(0, SUGGESTION_COUNT);
}
