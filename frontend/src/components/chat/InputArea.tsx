import { useRef, useState, type KeyboardEvent } from "react";
import { Paperclip, Mic, Send, Square, X } from "lucide-react";
import { IconButton } from "../ui";
import { useChat } from "../../contexts/ChatContext";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { transcribeAudio } from "../../lib/api";
import { RecordingIndicator } from "./RecordingIndicator";
import { UnclearInputDialog } from "./UnclearInputDialog";

/**
 * Bottom input bar from the Figma chat (node 1:1740).
 *
 * Wires every visible control:
 *   - Send button & Enter key      -> sendUserMessage
 *   - Mic button                   -> MediaRecorder + transcribeAudio
 *   - Attachment button            -> file picker, attaches filename
 *   - X button on attachment chip  -> remove attachment
 *
 * Triggers the UnclearInputDialog when a submitted message is too short
 * or contains only punctuation/numbers.
 */
function isUnclear(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 3) return true;
  // No alphabetic characters at all (Latin or Urdu) — likely unclear.
  if (!/[A-Za-z؀-ۿ]/.test(trimmed)) return true;
  return false;
}

export function InputArea() {
  const { sendUserMessage, isThinking } = useChat();
  const recorder = useVoiceRecorder();

  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const [unclearOpen, setUnclearOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSend =
    !isThinking && !transcribing && (text.trim().length > 0 || !!attachment);

  const handleSend = async () => {
    if (!canSend) return;
    const message = text.trim();
    // Only gate on the text — attachments alone always pass through.
    if (message && isUnclear(message) && !attachment) {
      setUnclearOpen(true);
      return;
    }
    const filename = attachment?.name;
    setText("");
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await sendUserMessage(message, { attachmentName: filename });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleMicClick = async () => {
    if (recorder.isRecording) {
      const blob = await recorder.stop();
      if (!blob) return;
      try {
        setTranscribing(true);
        const transcript = await transcribeAudio(blob);
        setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      } catch (err) {
        alert(err instanceof Error ? err.message : "Transcription failed.");
      } finally {
        setTranscribing(false);
      }
    } else {
      await recorder.start();
    }
  };

  const handleAttachClick = () => fileInputRef.current?.click();

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachment(file);
  };

  return (
    <div className="border-t border-surface-border bg-white px-4 py-4 dark:border-surface-dark-border dark:bg-surface-dark-subtle">
      {recorder.isRecording && <RecordingIndicator />}

      {attachment && (
        <div className="mx-auto mb-3 flex max-w-full items-center gap-2 rounded-full border border-surface-border bg-surface-muted px-3 py-1.5 text-xs text-slate-700 dark:border-surface-dark-border dark:bg-surface-dark-muted dark:text-slate-200">
          <Paperclip className="h-3.5 w-3.5" />
          <span className="truncate">{attachment.name}</span>
          <button
            type="button"
            onClick={() => setAttachment(null)}
            aria-label="Remove attachment"
            className="ml-1 rounded-full p-0.5 hover:bg-surface-border dark:hover:bg-surface-dark-border"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div
        className={
          "flex items-center gap-2 rounded-full border bg-white px-2 py-1.5 transition focus-within:border-brand-700 focus-within:ring-2 focus-within:ring-brand-700/20 dark:bg-surface-dark-muted " +
          (recorder.isRecording
            ? "border-red-400"
            : "border-surface-border dark:border-surface-dark-border")
        }
      >
        <IconButton
          aria-label={canSend ? "Send message" : "Send (compose first)"}
          icon={<Send />}
          variant="solid"
          onClick={handleSend}
          disabled={!canSend}
        />

        <button
          type="button"
          onClick={handleAttachClick}
          aria-label="Attach a file"
          className="rounded-full p-2 text-slate-400 transition hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelected}
        />

        <input
          type="text"
          placeholder={
            transcribing
              ? "Transcribing..."
              : recorder.isRecording
                ? "Recording — tap mic again to stop"
                : "Type your message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isThinking || transcribing}
          className="flex-1 bg-transparent px-2 text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        <button
          type="button"
          onClick={handleMicClick}
          aria-label={recorder.isRecording ? "Stop recording" : "Record voice"}
          aria-pressed={recorder.isRecording}
          disabled={!recorder.isSupported}
          className={
            "rounded-full p-2 transition " +
            (recorder.isRecording
              ? "mic-pulse bg-red-500 text-white dark:bg-red-500"
              : "text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200") +
            (!recorder.isSupported ? " cursor-not-allowed opacity-40" : "")
          }
        >
          {recorder.isRecording ? (
            <Square className="h-5 w-5 fill-current" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </button>
      </div>

      {recorder.error && (
        <p
          role="alert"
          className="mt-2 text-center text-xs text-red-600 dark:text-red-400"
        >
          {recorder.error}
        </p>
      )}

      <UnclearInputDialog
        open={unclearOpen}
        onRetry={() => setUnclearOpen(false)}
        onClose={() => setUnclearOpen(false)}
      />
    </div>
  );
}
