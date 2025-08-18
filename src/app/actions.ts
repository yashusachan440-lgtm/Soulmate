
"use server";

import { flirtyHinglishChatStream } from "@/ai/flows/flirty-hinglish-chat";
import type { FlirtyHinglishChatInput, UserGender } from "@/ai/types/flirty-hinglish-chat";

interface GetAiResponseParams {
  message: string;
  userGender: UserGender;
  chatbotName: string;
}

export async function getAiResponse(params: GetAiResponseParams): Promise<ReadableStream<string>> {
  try {
    const input: FlirtyHinglishChatInput = {
      ...params,
      isMale: params.userGender === 'male',
    };
    const stream = await flirtyHinglishChatStream(input);
    return stream;
  } catch (error) {
    console.error("Error calling AI flow:", error);
    // In case of an error, return a stream that sends a single error message.
    return new ReadableStream({
      start(controller) {
        controller.enqueue("Oops! Thoda sa technical glitch ho gaya, my love. Try again? 😉");
        controller.close();
      },
    });
  }
}
