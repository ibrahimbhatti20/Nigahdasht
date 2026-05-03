import { useEffect, useRef } from "react";
import { BotMessage } from "./BotMessage";
import { UserMessage } from "./UserMessage";
import { ThinkingDots } from "../ui";
import { useChat } from "../../contexts/ChatContext";

/**
 * Scrollable message viewport that auto-scrolls to the bottom when new
 * messages arrive or while the bot is thinking.
 */
export function MessageList() {
  const { messages, isThinking } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Chat conversation"
      className="flex-1 space-y-4 overflow-y-auto px-5 py-6"
    >
      {messages.map((m) =>
        m.role === "bot" ? (
          <BotMessage key={m.id} message={m} />
        ) : (
          <UserMessage key={m.id} message={m} />
        ),
      )}
      {isThinking && (
        <div className="flex items-center justify-end">
          <ThinkingDots label="thinking…" />
        </div>
      )}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}
