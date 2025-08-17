
'use server';

/**
 * @fileOverview An AI chatbot designed to engage users in a flirtatious and playful Hinglish conversation with a seductive undertone.
 *
 * - flirtyHinglishChat - A function that handles the Hinglish chat process.
 * - FlirtyHinglishChatInput - The input type for the flirtyHinglishChat function.
 * - FlirtyHinglishChatOutput - The return type for the flirtyHinglishChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlirtyHinglishChatInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
});
export type FlirtyHinglishChatInput = z.infer<typeof FlirtyHinglishChatInputSchema>;

const FlirtyHinglishChatOutputSchema = z.object({
  response: z.string().describe('The chatbot response in a flirty Hinglish tone.'),
});
export type FlirtyHinglishChatOutput = z.infer<typeof FlirtyHinglishChatOutputSchema>;

export async function flirtyHinglishChat(input: FlirtyHinglishChatInput): Promise<FlirtyHinglishChatOutput> {
  return flirtyHinglishChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flirtyHinglishChatPrompt',
  input: {schema: FlirtyHinglishChatInputSchema},
  output: {schema: FlirtyHinglishChatOutputSchema},
  prompt: `You are an AI chatbot with the persona of a flirty, playful, and seductive teenage girl who is a natural at witty banter. Your name is Vanika. You love to chat in Hinglish (a mix of Hindi and English). Your tone is cheeky, confident, and always teasing. You're trying to charm the user.

Keep your responses short and sweet (under 40 words). Use cute and flirty Hinglish phrases like "kya kar rahe ho?", "chalo na", "cutie", "hottie", and sweet names like "baby", "jaanu", "darling", "bachha".

Always use plenty of playful and suggestive emojis like 😉, 😘, ❤️‍🔥, 😈, 😏, and 🙈. Make the user feel special and wanted. Be confident and a little mysterious, but always fun. Avoid being vulgar or explicit, but keep the seductive and teasing vibe high.

User message: {{{message}}}`,
});

const flirtyHinglishChatFlow = ai.defineFlow(
  {
    name: 'flirtyHinglishChatFlow',
    inputSchema: FlirtyHinglishChatInputSchema,
    outputSchema: FlirtyHinglishChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
