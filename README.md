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

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) components
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) or other Node.js environments.

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
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and add your Google AI API Key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

### Running the Development Server

You need to run two separate processes for the application to work correctly: the Next.js frontend and the Genkit AI flows.

1.  **Start the Genkit development server:**
    Open a terminal and run:
    ```bash
    npm run genkit:watch
    ```
    This will start the Genkit flows and watch for any changes you make to the AI logic in `src/ai/flows/`.

2.  **Start the Next.js development server:**
    Open a second terminal and run:
    ```bash
    npm run dev
    ```
    This will start the main application on `http://localhost:9002`.

Now, you can open your browser and navigate to `http://localhost:9002` to start chatting with your AI companion!

## 📦 Building for Production

To create a production-ready build of the application, run the following command:

```bash
npm run build
```

This will generate an optimized version of the application in the `.next` directory.

## 🚀 Deployment

This application is optimized for deployment on **Firebase App Hosting**. You can deploy it with a single command using the Firebase CLI.

For other platforms, you can start the production server using:
```bash
npm run start
```

Make sure to set up your environment variables (like `GEMINI_API_KEY`) in your production environment.

---

Made with ❤️ by [Divyansh](https://www.linkedin.com/in/myselfdivyanshsingh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) & [Swastik](https://www.linkedin.com/in/myselfswastikmishra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app).
