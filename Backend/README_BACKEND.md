# AI Persona Backend

This backend serves the frontend and provides a simple persona-based response API.

## Install

1. Open a terminal in `d:\GENAI\AI Personna\Backend`
2. Run `npm install`
3. Copy `.env.example` to `.env` and add your Gemini API key.
4. Run `npm start`

## API

### POST /api/respond

Request body:

```json
{
  "message": "What is the best way to learn AI?",
  "persona": "kshitij_mishra"
}
```

Response:

```json
{
  "reply": "..."
}
```

## Persona values

- `kshitij_mishra`
- `anshuman_singh`
- `abhimanyu_saxena`
