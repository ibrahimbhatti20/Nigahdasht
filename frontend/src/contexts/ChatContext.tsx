import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { sendMessage } from "../lib/api";

export type MessageRole = "user" | "bot";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  /** ISO timestamp. */
  createdAt: string;
  /** Optional file attachment (filename only — full upload comes with backend). */
  attachmentName?: string;
  /** Optional URL of synthesized audio reply (set once /api/tts is live). */
  audioUrl?: string;
  /** True when the message was originally typed in English (rendered LTR). */
  isEnglish?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  isThinking: boolean;
  error: string | null;
}

interface ChatContextValue extends ChatState {
  sendUserMessage: (text: string, opts?: { attachmentName?: string }) => Promise<void>;
  clearMessages: () => void;
}

const STORAGE_KEY = "nigahdasht.chat";

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

const SEED_MESSAGES: ChatMessage[] = [
  {
    id: "seed-1",
    role: "bot",
    text: "السلام علیکم! میں آپ کا ڈیجیٹل صحت کا معاون ہوں۔ میں آپ کی کس طرح مدد کر سکتا ہوں؟",
    createdAt: new Date().toISOString(),
  },
];

function loadInitialMessages(): ChatMessage[] {
  if (typeof window === "undefined") return SEED_MESSAGES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_MESSAGES;
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return SEED_MESSAGES;
  } catch {
    return SEED_MESSAGES;
  }
}

function isMostlyEnglish(text: string): boolean {
  const ascii = text.replace(/\s/g, "").match(/[A-Za-z]/g)?.length ?? 0;
  return ascii > text.replace(/\s/g, "").length / 2;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadInitialMessages);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist messages whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage may be unavailable (private mode etc.) — ignore.
    }
  }, [messages]);

  const sendUserMessage = useCallback(
    async (text: string, opts?: { attachmentName?: string }) => {
      const trimmed = text.trim();
      if (!trimmed && !opts?.attachmentName) return;

      const userMsg: ChatMessage = {
        id: makeId(),
        role: "user",
        text: trimmed,
        createdAt: new Date().toISOString(),
        attachmentName: opts?.attachmentName,
        isEnglish: trimmed.length > 0 && isMostlyEnglish(trimmed),
      };
      setMessages((m) => [...m, userMsg]);
      setIsThinking(true);
      setError(null);

      try {
        const result = await sendMessage(trimmed || "(attachment)");
        const botMsg: ChatMessage = {
          id: makeId(),
          role: "bot",
          text: result.answer,
          audioUrl: result.audioUrl,
          createdAt: new Date().toISOString(),
        };
        setMessages((m) => [...m, botMsg]);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
        setMessages((m) => [
          ...m,
          {
            id: makeId(),
            role: "bot",
            text:
              "معذرت، اس وقت جواب دینا ممکن نہیں۔ براہ کرم دوبارہ کوشش کریں۔",
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsThinking(false);
      }
    },
    [],
  );

  const clearMessages = useCallback(() => {
    setMessages(SEED_MESSAGES);
    setError(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{ messages, isThinking, error, sendUserMessage, clearMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within <ChatProvider>");
  return ctx;
}
