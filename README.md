# Vanika - Your Flirty AI Companion

Welcome to Vanika, a delightful and playful chatbot experience where you can engage in flirtatious Hinglish conversations with a charming AI. This project showcases how to create engaging, AI-powered applications with a beautiful, modern user interface.

![Vanika Screenshot](https://placehold.co/800x600.png)
*A sneak peek of the Vanika interface.*

## ✨ Features

- **Dual AI Personas**: Chat with "Vanika" (a flirty girlfriend persona) or "Veer" (a charming boyfriend persona) based on your gender selection.
- **Flirty Hinglish Chatbot**: Engage in witty, seductive, and playful conversations in a natural Hinglish dialect.
- **Real-time Interaction**: Get instant, dynamic responses from the AI, creating a lively and believable chat experience.
- **Playful & Romantic UI**: A beautiful, modern interface with a shifting gradient background and floating hearts to enhance the romantic mood.
- **Customizable Persona**: Users can change the name and avatar of their AI companion.
- **Built with Genkit**: Leverages the power of Google's Gemini models through Firebase Genkit for intelligent and creative responses.
- **Production-Ready**: A solid foundation to build upon, with best practices for Next.js and AI integration.

## 🚀 Tech Stack & Architecture

This application is built with a modern, robust, and scalable tech stack, perfect for creating production-grade AI applications.

### Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) components
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: Ready for [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or other Node.js environments.

### Architecture

The application follows a clean, decoupled architecture:

-   **Frontend (`src/app`, `src/components`)**: The user interface is built with React and Next.js, using the App Router for clear, file-based routing. We use Server Components where possible for better performance. All UI components are from the excellent ShadCN UI library, which are styled with Tailwind CSS. The romantic theme is configured in `src/app/globals.css`.

-   **Backend Logic (`src/app/actions.ts`)**: Communication between the frontend and the AI backend is handled via Next.js Server Actions. This provides a seamless and secure way to call server-side functions directly from our React components without needing to manually create API endpoints.

-   **AI Flows (`src/ai/flows`)**: This is the heart of our AI. We use Firebase Genkit to define our generative AI logic. The `flirty-hinglish-chat.ts` file defines the prompts and logic for how the AI should respond based on the user's gender and message. Genkit orchestrates the calls to the powerful Google Gemini model.

## 🛠️ Quick Start

### 1. Get Your API Key
Get your Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 2. Environment Setup
1. Copy `.env.example` to `.env`
2. Add your API key to the `.env` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Install and Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:9002`

## 🚀 Deployment

### Netlify
1. Connect your repository to Netlify
2. Set environment variable: `GEMINI_API_KEY` = your API key
3. Deploy!

### Vercel
1. Connect your repository to Vercel
2. Add environment variable: `GEMINI_API_KEY` = your API key
3. Deploy!

### Other Platforms
The app is a standard Next.js application and can be deployed anywhere that supports Node.js.

## 🔧 Environment Variables

- `GEMINI_API_KEY`: Your Google AI API key (required)

---

Made with ❤️ by [Divyansh](https://www.linkedin.com/in/myselfdivyanshsingh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) & [Swastik](https://www.linkedin.com/in/myselfswastikmishra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app).
