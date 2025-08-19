import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Ensure we have the API key
if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not set. AI features will not work.');
}

const plugins = [
  googleAI({
    apiKey: process.env.GEMINI_API_KEY,
  })
];

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-1.5-flash',
});
