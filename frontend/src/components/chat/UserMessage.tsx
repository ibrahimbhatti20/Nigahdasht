import { Paperclip } from "lucide-react";
import clsx from "clsx";
import type { ChatMessage } from "../../contexts/ChatContext";
import { formatTime } from "./formatTime";

export interface UserMessageProps {
  message: ChatMessage;
}

/**
 * User message bubble.
 *
 * Visual: solid blue bubble (`accent-800`) with white text, right-aligned to
 * the *start* (left in RTL list flow), matching the Figma chat (node 1:1705).
 */
export function UserMessage({ message }: UserMessageProps) {
  const dir = message.isEnglish ? "ltr" : "rtl";

  return (
    <div className="flex flex-col items-start gap-1">
      <div
        dir={dir}
        className={clsx(
          "max-w-[85%] rounded-bubble bg-accent-800 px-5 py-3 text-white shadow-card",
          dir === "rtl" ? "rounded-bl-sm" : "rounded-br-sm",
        )}
      >
        {message.attachmentName && (
          <div className="mb-1 flex items-center gap-1.5 text-xs text-white/80">
            <Paperclip className="h-3.5 w-3.5" />
            <span className="truncate">{message.attachmentName}</span>
          </div>
        )}
        {message.text && (
          <p
            lang={message.isEnglish ? "en" : "ur"}
            className="whitespace-pre-wrap leading-relaxed"
          >
            {message.text}
          </p>
        )}
      </div>
      <span className="px-2 text-xs text-slate-400 dark:text-slate-500">
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
}
