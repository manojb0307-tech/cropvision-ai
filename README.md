<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# CropVision - Run and deploy your AI Studio app

CropVision is an AI-powered plant disease detection & smart crop health assistant.
The frontend is a React + Vite app. The backend is a small Express server that
wraps the Gemini API for real image-based disease diagnosis and an agronomy chat assistant.

View your app in AI Studio: https://ai.studio/apps/8afb4aec-15da-4117-8858-94841f3a2386

## Architecture

```
src/                    React frontend (Vite)
  lib/api.ts            API client for the backend endpoints
  data/sampleDiagnoses.ts  analyzePlantImage(): backend-first, falls back to offline samples
server/server.js        Express backend (Gemini API proxy)
scripts/dev.mjs         Runs backend + Vite dev server together
```

### Backend endpoints

| Endpoint        | Body                                  | Returns                                  |
| --------------- | ------------------------------------- | ---------------------------------------- |
| `POST /api/analyze` | `{ imageDataUrl, plantHint? }`    | `{ diagnosis }` (full DiseaseDiagnosis)  |
| `POST /api/chat`    | `{ message, history }`            | `{ reply }`                              |
| `GET /api/health`   | -                                    | server status + whether AI is configured |

## Run Locally

**Prerequisites:** Node.js (v18+), npm

1. Install dependencies:
   `npm install`
2. Set your Gemini API key. Create `.env` from the example and fill it in:
   `cp .env.example .env` (Windows: `copy .env.example .env`)
   - `GEMINI_API_KEY="your-key-here"`
3. Run the full app (backend + frontend):
   `npm run dev:full`
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8787 (also see http://localhost:8787/api/health)
   - Or run them separately: `npm run server` and `npm run dev`

## Production build

`npm run build` (builds the frontend into `dist/`)
`npm start` (serves both the API and the built frontend on http://localhost:8787)

## Notes

- Without `GEMINI_API_KEY`, the app still works: image scans fall back to the
  built-in offline sample diagnoses and the chat uses offline rule-based replies.
- API errors never crash the UI - the frontend always falls back gracefully.

## Troubleshooting

- `aiConfigured: false` on `/api/health` → set `GEMINI_API_KEY` in `.env` and restart the server.
- `ERR_CONNECTION_REFUSED` on `/api/...` in dev → make sure the backend is running (`npm run server`).
