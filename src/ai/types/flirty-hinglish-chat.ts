
/**
 * @fileOverview Shared types for the flirty Hinglish chat flow.
 * This file contains Zod schemas and TypeScript types that are used by both
 * the client-side components and the server-side Genkit flow.
 */

import {z} from 'genkit';

export const UserGenderSchema = z.enum(['male', 'female']);
export type UserGender = z.infer<typeof UserGenderSchema>;

export const FlirtyHinglishChatInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
  userGender: UserGenderSchema.describe("The user's selected gender."),
  isMale: z.boolean().describe('Whether the user is male.'),
  chatbotName: z.string().describe("The chatbot's current name."),
});
export type FlirtyHinglishChatInput = z.infer<typeof FlirtyHinglishChatInputSchema>;

export const FlirtyHinglishChatOutputSchema = z.object({
  response: z.string().describe('The chatbot response in a flirty Hinglish tone.'),
});
export type FlirtyHinglishChatOutput = z.infer<typeof FlirtyHinglishChatOutputSchema>;
