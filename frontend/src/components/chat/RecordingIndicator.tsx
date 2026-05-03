import { Mic } from "lucide-react";

/**
 * Animated waveform shown while the user is recording. Five bars pulse
 * in sequence using `.wave-bar` keyframes from `index.css`. Mirrors the
 * Figma "Listening" state on Desktop-2.
 */
export function RecordingIndicator() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto mb-3 flex max-w-fit items-center gap-3 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
    >
      <Mic className="h-3.5 w-3.5 animate-pulse" />
      <span>Listening</span>
      <div className="flex h-5 items-center gap-0.5">
        <span className="wave-bar h-2" />
        <span className="wave-bar h-3" />
        <span className="wave-bar h-4" />
        <span className="wave-bar h-3" />
        <span className="wave-bar h-2" />
      </div>
      <span lang="ur" dir="rtl" className="opacity-75">
        سن رہا ہوں
      </span>
    </div>
  );
}
