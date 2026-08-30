import { ChatMessage, DiseaseDiagnosis } from '../types';

/**
 * Base URL for the CropVision backend API.
 * - In dev, requests are proxied to the backend by Vite (see vite.config.ts),
 *   so an empty string is correct.
 * - For a separately hosted backend, set VITE_API_BASE in .env.local, e.g. "https://api.example.com".
 */
const API_BASE = ((import.meta.env as Record<string, string | undefined>).VITE_API_BASE ?? '')
  .replace(/\/+$/, '');

async function post<T>(url: string, body: unknown, timeoutMs = 60000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API error ${res.status}: ${text.slice(0, 200)}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

interface AnalyzeResponse {
  diagnosis?: DiseaseDiagnosis;
  error?: string;
}

/**
 * Sends the plant image to the backend for a real Gemini-powered diagnosis.
 * Returns null if the backend is unreachable or the API key is missing,
 * so the caller can fall back to the local sample-based behavior.
 */
export async function analyzePlantImageRemote(
  imageSource: string | File,
  plantHint?: string
): Promise<DiseaseDiagnosis | null> {
  try {
    const imageDataUrl = typeof imageSource === 'string' ? imageSource : await fileToDataUrl(imageSource);
    const result = await post<AnalyzeResponse>('/api/analyze', { imageDataUrl, plantHint });
    return result?.diagnosis ?? null;
  } catch {
    return null;
  }
}

interface ChatResponse {
  reply?: string;
  source?: string;
  intent?: string;
  crop?: string;
  disease?: string;
  sessionId?: string;
  error?: string;
}

/**
 * Sends a chat message to the backend for a real Gemini-powered reply.
 * Throws if the backend is unreachable, so the caller can fall back
 * to the local rule-based replies.
 */
export async function chatWithAIRemote(message: string, history: ChatMessage[]): Promise<string> {
  // Generate a session ID from the first message timestamp to maintain context
  const sessionId = `web-${Date.now().toString(36)}`;
  const result = await post<ChatResponse>('/api/chat', { message, history, sessionId });
  const reply = result?.reply?.trim();
  if (!reply) throw new Error('Empty AI reply');
  return reply;
}

interface VoiceResponse {
  reply?: string;
  source?: string;
  error?: string;
}

/**
 * Sends audio (base64) to the backend voice assistant endpoint.
 * Gemini transcribes the audio and generates an AI response.
 */
export async function sendVoiceAudio(
  audioBase64: string,
  mimeType: string,
  history: ChatMessage[],
  lang: string
): Promise<string> {
  const result = await post<VoiceResponse>('/api/voice-assistant', {
    audio: audioBase64,
    mimeType,
    history,
    lang,
  }, 90000);
  const reply = result?.reply?.trim();
  if (!reply) throw new Error('Empty voice reply');
  return reply;
}
