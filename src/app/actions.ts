
"use server";

import { flirtyHinglishChat } from "@/ai/flows/flirty-hinglish-chat";
import type { FlirtyHinglishChatInput, UserGender } from "@/ai/types/flirty-hinglish-chat";

interface GetAiResponseParams {
  message: string;
  userGender: UserGender;
  chatbotName: string;
}

export async function getAiResponse(params: GetAiResponseParams): Promise<string> {
  try {
    const input: FlirtyHinglishChatInput = {
      ...params,
      isMale: params.userGender === 'male',
    };
    
    const { response } = await flirtyHinglishChat(input);
    return response;

  } catch (error) {
    console.error("Error calling AI flow:", error);
    return "Oops! Thoda sa technical glitch ho gaya, my love. Try again? 😉";
  }
}
