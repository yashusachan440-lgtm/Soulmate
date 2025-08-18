# Vanika - Your Flirty AI Companion

Welcome to Vanika, a delightful and playful chatbot experience where you can engage in flirtatious Hinglish conversations with a charming AI. This project showcases how to create engaging, AI-powered applications with a beautiful, modern user interface.

![Vanika Screenshot](https://placehold.co/800x600.png?text=Vanika+UI)
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
- **Deployment**: Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) or other Node.js environments.

### Architecture

The application follows a clean, decoupled architecture:

-   **Frontend (`src/app`, `src/components`)**: The user interface is built with React and Next.js, using the App Router for clear, file-based routing. We use Server Components where possible for better performance. All UI components are from the excellent ShadCN UI library, which are styled with Tailwind CSS. The romantic theme is configured in `src/app/globals.css`.

-   **Backend Logic (`src/app/actions.ts`)**: Communication between the frontend and the AI backend is handled via Next.js Server Actions. This provides a seamless and secure way to call server-side functions directly from our React components without needing to manually create API endpoints.

-   **AI Flows (`src/ai/flows`)**: This is the heart of our AI. We use Firebase Genkit to define our generative AI logic. The `flirty-hinglish-chat.ts` file defines the prompts and logic for how the AI should respond based on the user's gender and message. Genkit orchestrates the calls to the powerful Google Gemini model.

## 🛠️ Getting Started

Follow these steps to get the Vanika application running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A [Google AI API Key](https://ai.google.dev/) for using the Gemini model.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. You can do this by copying the example if one exists, or creating a new one:
    ```bash
    touch .env
    ```
    Open the `.env` file and add your Google AI API Key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

### Running the Development Server

The application requires two separate processes to run in development: one for the Next.js frontend and one for the Genkit AI server.

1.  **Start the Genkit Development Server:**
    Open a terminal and run:
    ```bash
    npm run genkit:watch
    ```
    This command starts the Genkit development server and will automatically restart it whenever you make changes to the AI flow files in `src/ai/`.

2.  **Start the Next.js Development Server:**
    Open a *second* terminal and run:
    ```bash
    npm run dev
    ```
    This command starts the main Next.js application.

You can now open your browser and navigate to `http://localhost:9002` to see the login page and start chatting with your AI companion!

## 📦 Building for Production

To create an optimized production build of the application, run the following command:

```bash
npm run build
```

This will compile and optimize the Next.js frontend and the Genkit backend into a `.next` directory, ready for deployment.

## 🚀 Deployment

This application is perfectly configured for deployment on **Firebase App Hosting**. You can deploy it with a single command using the Firebase CLI after setting up your Firebase project.

For other platforms that support Node.js, you can start the production server using:
```bash
npm run start
```
Remember to set up your environment variables (like `GEMINI_API_KEY`) in your production hosting environment.

---

Made with ❤️ by [Divyansh](https://www.linkedin.com/in/myselfdivyanshsingh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) & [Swastik](https://www.linkedin.com/in/myselfswastikmishra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app).
