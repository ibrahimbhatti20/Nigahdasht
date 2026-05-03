import clsx from "clsx";

export interface ThinkingDotsProps {
  /** Optional label rendered next to the dots (defaults to "thinking..."). */
  label?: string;
  className?: string;
}

/**
 * Three animated dots used while the assistant is generating a reply.
 * Animation is defined as `.thinking-dot` in `index.css`.
 *
 * Mirrors the Figma "Thinking State" component (node 1:1733).
 */
export function ThinkingDots({ label = "thinking…", className }: ThinkingDotsProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-card dark:bg-surface-dark-subtle",
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        <span className="thinking-dot" />
        <span className="thinking-dot" />
        <span className="thinking-dot" />
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
}
