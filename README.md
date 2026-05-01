# The Scaler Trio - AI Persona Agent

A modern web application that allows you to interact with an AI embodying the three founders/instructors of Scaler: Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra. The AI uses a "Chain of Thought" reasoning mechanism to analyze its tone and strategy before responding, ensuring it stays perfectly in character.

## Features

- **Three Distinct Personas:**
  - **Anshuman Singh:** The Reticent Technical Purist.
  - **Abhimanyu Saxena:** The Adventurous Strategic Architect.
  - **Kshitij Mishra:** The Empathetic Master Instructor.
- **Modern UI/UX:** Built with Vanilla HTML, CSS, and JS featuring a rich glassmorphism design, vibrant gradients, and dynamic ambient background animations.
- **Chain of Thought Reasoning:** The AI processes interactions internally before responding, making the conversation highly contextual and accurate to each persona's unique traits.
- **Powered by Gemini API:** Uses Google's `gemini-2.5-flash` model for fast, intelligent, and context-aware responses.

## Project Structure

The repository is divided into two main parts:

- `/Frontend`: Contains the client-side code (`index.html`, `styles.css`, `script.js`).
- `/Backend`: Contains the Node.js Express server (`server.js`) that handles communication with the Gemini API.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key

### Backend Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

The frontend is served statically by the backend server. Once you start the backend server, simply navigate to `http://localhost:3000` in your browser to interact with the application.

## Deployment

The backend is configured to be easily deployable on platforms like Render or Heroku. Make sure to set your `GEMINI_API_KEY` as an environment variable in your hosting provider's dashboard.

The frontend is already configured to point to the production backend API endpoint if deployed.
