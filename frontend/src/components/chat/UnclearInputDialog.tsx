import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "../ui";

interface UnclearInputDialogProps {
  open: boolean;
  onRetry: () => void;
  onClose: () => void;
}

/**
 * Error modal mirroring the Figma "Unclear Input" wireframe. Shown when
 * the user submits a message that's too short or ambiguous to interpret.
 */
export function UnclearInputDialog({
  open,
  onRetry,
  onClose,
}: UnclearInputDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="unclear-input-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-elevated dark:bg-surface-dark-subtle">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-surface-muted hover:text-slate-600 dark:hover:bg-surface-dark-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid h-12 w-12 place-items-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2
          id="unclear-input-title"
          className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Unclear Input
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          We couldn't understand your question. Please try rephrasing it.
        </p>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900/50 dark:bg-amber-950/40">
          <p className="font-medium text-amber-900 dark:text-amber-200">
            Helpful Tip:
          </p>
          <p className="mt-0.5 text-amber-800 dark:text-amber-300">
            Try asking in simpler words or Urdu.
          </p>
          <p
            lang="ur"
            dir="rtl"
            className="mt-1 text-amber-800 dark:text-amber-300"
          >
            براہ کرم اپنا سوال آسان جملوں میں دوبارہ پوچھیں۔
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button onClick={onRetry} fullWidth>
            Try Again
          </Button>
          <Button onClick={onClose} variant="outline" fullWidth>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
