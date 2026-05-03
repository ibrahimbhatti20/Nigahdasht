# Nigahdasht — Frontend

React + TypeScript + Vite + Tailwind CSS implementation of the Nigahdasht
AI Health Assistant chat interface.

This is the **frontend only**. The Python backend (FAISS retrieval, Whisper
STT, Ollama LLM, Coqui TTS) lives at the repo root and is wired via
`src/lib/api.ts` — currently mocked, swap to real `fetch` calls once the
backend exposes HTTP endpoints.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open <http://localhost:5173>.

## Routes

| Path        | What's there                                                |
|-------------|-------------------------------------------------------------|
| `/login`    | Mock login (any non-empty credentials accepted)             |
| `/register` | Mock signup                                                 |
| `/chat`     | Main chat screen (protected — redirects to `/login`)        |
| `/__ds`     | Internal design-system preview (every UI primitive)         |

## Scripts

| Command           | Purpose                              |
|-------------------|--------------------------------------|
| `npm run dev`     | Start the Vite dev server (HMR)      |
| `npm run build`   | Type-check + production build        |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

## Architecture

```
src/
├── App.tsx                   Router + global providers
├── main.tsx                  React entry point
├── index.css                 Tailwind directives + base styles
├── contexts/
│   ├── ThemeContext.tsx      light/dark, persisted to localStorage
│   ├── FontSizeContext.tsx   sm/md/lg, drives --font-scale CSS var
│   ├── AuthContext.tsx       mock auth (login/register/logout)
│   └── ChatContext.tsx       message state, persisted to localStorage
├── components/
│   ├── ui/                   Atomic primitives (Button, Card, etc.)
│   ├── layout/               AppShell, Header, Footer, drawers
│   ├── chat/                 BotMessage, UserMessage, InputArea, …
│   └── ProtectedRoute.tsx    Route guard
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Chat.tsx
│   └── _DesignSystem.tsx
├── hooks/
│   └── useVoiceRecorder.ts   MediaRecorder wrapper
└── lib/
    └── api.ts                Mock API client (swap for real backend)
```

## Wiring to the real backend

When the Python side ships HTTP endpoints, edit `src/lib/api.ts`:

```ts
// Current (mock):
return { answer: randomReply() };

// Future:
const res = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question }),
});
return res.json();
```

The expected contract is documented in the file's header comment.
