# AI Persona Agent Frontend

A simple web frontend for an AI agent that supports three human-like persona types.

## Features

- Persona selection: Friendly, Professional, Creative
- Chat UI with user and agent messages
- Backend API hook at `/api/respond`

## Setup

1. Serve the files from a static web server or add the frontend files to your backend project.
2. Start the backend server from the project root and send requests to `/api/respond`.

```json
{ "message": "Hello", "persona": "kshitij_mishra" }
```

3. Return JSON with a `reply` field:

```json
{ "reply": "Hello! How can I help today?" }
```

## Persona values

- `kshitij_mishra`
- `anshuman_singh`
- `abhimanyu_saxena`
