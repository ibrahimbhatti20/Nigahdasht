/**
 * Mock API client.
 *
 * The backend (Python: FAISS retrieval + Ollama LLM, Whisper STT, Coqui TTS)
 * exposes no HTTP endpoints today. These functions simulate the contract
 * we expect once the backend is wrapped in Flask/FastAPI:
 *
 *   POST /api/chat                 { question: string } -> { answer: string, audioUrl?: string }
 *   POST /api/stt   (multipart)    audio -> { text: string }
 *   POST /api/tts                  { text: string } -> audio/mpeg
 *
 * Swap each `mock*` body with `fetch('/api/...')` once the server is live.
 */

export interface SendMessageResult {
  answer: string;
  audioUrl?: string;
}

const URDU_REPLIES = [
  "وعلیکم السلام! میں آپ کی مدد کے لیے یہاں ہوں۔ آپ کی علامات کیا ہیں؟",
  "بخار کی صورت میں آرام، وافر مقدار میں پانی اور مناسب غذا اہم ہیں۔",
  "بہتر ہوگا کہ آپ کسی قریبی ڈاکٹر سے مشورہ کریں اور تجویز کردہ ادویات لیں۔",
  "اگر علامات دو دن سے زیادہ برقرار رہیں تو فوراً معالج سے رجوع کریں۔",
  "براہ کرم زیادہ معلومات بتائیں — کب سے یہ مسئلہ ہے اور کیا کوئی اور علامات ہیں؟",
];

function randomReply() {
  return URDU_REPLIES[Math.floor(Math.random() * URDU_REPLIES.length)];
}

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

/**
 * Send a chat message and receive a textual reply.
 * Will be replaced by `fetch('/api/chat', { ... })` when backend ships.
 */
export async function sendMessage(question: string): Promise<SendMessageResult> {
  if (!question.trim()) {
    throw new Error("Question must not be empty.");
  }
  // Simulate ~800ms thinking time
  await delay(700 + Math.random() * 600);
  return {
    answer: randomReply(),
    // audioUrl is left undefined here; will be wired when /api/tts exists.
  };
}

/**
 * Transcribe an audio blob.
 * Will be replaced by a multipart POST to `/api/stt` (Python Whisper).
 */
export async function transcribeAudio(blob: Blob): Promise<string> {
  if (!blob || blob.size === 0) {
    throw new Error("No audio captured.");
  }
  await delay(900);
  return "آپ کو بخار کب سے ہے؟ کیا آپ کو کھانسی یا جسم میں درد بھی ہے؟";
}

/**
 * Stream a synthesized audio reply (Urdu TTS).
 * Will return an audio URL once `/api/tts` is wired.
 */
export async function speakText(_text: string): Promise<string | null> {
  await delay(200);
  return null; // No audio playback in mock mode.
}
