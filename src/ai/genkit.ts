import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Hardcoded API key for immediate functionality
const GEMINI_API_KEY = 'AIzaSyBAjBnQf9OGYT5uYwT4ku-C4l2GP67o5zo';

const plugins = [
  googleAI({
    apiKey: GEMINI_API_KEY,
  })
];

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-1.5-flash',
});
