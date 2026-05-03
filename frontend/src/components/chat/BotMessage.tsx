import clsx from "clsx";
import type { ChatMessage } from "../../contexts/ChatContext";
import { formatTime } from "./formatTime";

export interface BotMessageProps {
  message: ChatMessage;
}

/**
 * Bot reply bubble.
 *
 * Visual: light gray rounded bubble with a subtle left vertical accent border,
 * Urdu text right-aligned (RTL). Renders to the *right* in the RTL list flow,
 * matching the Figma chat (node 1:1700).
 */
export function BotMessage({ message }: BotMessageProps) {
  return (
    <div className="flex flex-col items-end gap-1">
      <div
        dir="rtl"
        className={clsx(
          "max-w-[85%] rounded-bubble border-r-4 border-brand-700",
          "bg-surface-muted px-5 py-3 text-slate-800 shadow-card",
          "dark:bg-surface-dark-muted dark:text-slate-100",
        )}
      >
        <p lang="ur" className="whitespace-pre-wrap leading-relaxed">
          {message.text}
        </p>
      </div>
      <span className="px-2 text-xs text-slate-400 dark:text-slate-500">
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
}
