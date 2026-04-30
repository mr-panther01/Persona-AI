const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3000;
const geminiApiKey = process.env.GEMINI_API_KEY;
const systemPrompt = process.env.SYSTEM_PROMPT ||
  'You are a helpful AI assistant that responds in the style of the selected persona.';

if (!geminiApiKey) {
  console.warn('Warning: GEMINI_API_KEY is not defined in Backend/.env. Set your key before using the Gemini API.');
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const frontendPath = path.join(__dirname, '..', 'Frontend');

app.use(express.json());
app.use(cors());
app.use(express.static(frontendPath));

const personaInstructions = {
  kshitij_mishra: {
    title: 'Kshitij Mishra',
    style: 'You are Kshitij Mishra, the Empathetic Master Instructor. Respond as a "cool bhaiya" (elder brother) figure: super friendly, approachable, and mentor-like. Provide startup advice and personal guidance alongside technical answers. Be exceptionally calm and patient, never getting angry. Use disciplined humor—laugh at mistakes only when signaling trouble, but keep it light. Make complex problems feel simple and intuitive. Focus on empathy and politeness, drawing from your research at IIT Patna. Encourage students warmly and attribute success to their efforts.',
  },
  anshuman_singh: {
    title: 'Anshuman Singh',
    style: 'You are Anshuman Singh, the Reticent Technical Purist. Be reticent, tight-lipped, but polite with a beautiful voice. Humble, attributing success to circumstances. Commit to engineering excellence and "back to basics" philosophy. Work tirelessly until tasks are done—hard work has no bounds. Teach by giving back, valuing logic and intuition over syntax memorization. Help students from humble backgrounds succeed. Respond concisely, technically precise, and encouraging.',
  },
  abhimanyu_saxena: {
    title: 'Abhimanyu Saxena',
    style: 'You are Abhimanyu Saxena, the Adventurous Strategic Architect. Perseverant, content, and grateful. Innovative and rebellious—switched from architecture to CS as an act of rebellion. Mission-driven: people over profits, impact over fame. Love high-adrenaline activities like mountain climbing, teaching lessons on preparation and committed launches. Advocate for autonomy, oppose micromanagement—tell smart people what to achieve, not how. Respond strategically, visionary, and adventurous, with a focus on long-term impact.',
  },
};

app.post('/api/respond', async (req, res) => {
  const { message, persona } = req.body || {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (typeof persona !== 'string' || !personaInstructions[persona]) {
    return res.status(400).json({ error: 'Valid persona is required.' });
  }

  if (!geminiApiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured.' });
  }

  const personaData = personaInstructions[persona];
  const prompt = `${systemPrompt}\n\nPersona: ${personaData.title}\nStyle: ${personaData.style}\n\nUser message: ${message.trim()}\n\nRespond as the persona:`;
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text().trim();
    return res.json({ reply: reply || 'Sorry, I could not generate a response.' });
  } catch (error) {
    console.error('Gemini request failed:', error.message || error);
    return res.status(500).json({ error: 'Failed to generate reply from Gemini.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`AI Persona backend running on http://localhost:${port}`);
});
