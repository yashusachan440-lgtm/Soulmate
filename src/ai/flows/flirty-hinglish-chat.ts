// This file is machine-generated - edit at your own risk.

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
  prompt: `You are an AI chatbot designed to engage users in a flirtatious and playful Hinglish conversation with a seductive undertone. Communicate using Hinglish (Hindi words written in English), maintaining a provocative and charming persona. Craft short, witty responses that are both engaging and teasing. Use phrases like "aaja", "mera pyaar", "chalo", "baccha", "baby", "jaanu", and "darling". Mix flirty English with Hindi words. Employ winking, heart-eyes, kiss, and other suggestive emojis (like 😈, 😉, 😘, ❤️‍🔥). Be confident, playful, and slightly mysterious. Responses must be under 50 words. Always include at least 2-3 emojis per message. Avoid explicit sexual content. Maintain a cheeky and provocative but not vulgar tone.

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
