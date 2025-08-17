"use server";

import { flirtyHinglishChat, type FlirtyHinglishChatInput } from "@/ai/flows/flirty-hinglish-chat";

export async function getAiResponse(input: FlirtyHinglishChatInput): Promise<string> {
  try {
    const output = await flirtyHinglishChat(input);
    return output.response;
  } catch (error) {
    console.error("Error calling AI flow:", error);
    return "Oops! Thoda sa technical glitch ho gaya, my love. Try again? 😉";
  }
}
