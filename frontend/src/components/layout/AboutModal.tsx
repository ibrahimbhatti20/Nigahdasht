import { useEffect } from "react";
import { X, Heart, MessageSquare, Mic, ShieldCheck } from "lucide-react";
import { Button } from "../ui";

export interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

/** "Help / About" modal opened from the header HelpCircle button. */
export function AboutModal({ open, onClose }: AboutModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-elevated dark:bg-surface-dark-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-800 text-white">
              <Heart className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="about-title"
                className="text-xl font-semibold text-slate-900 dark:text-slate-50"
              >
                About Nigahdasht
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                AI Health Assistant for Urdu speakers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close about modal"
            className="rounded-full p-1 text-slate-500 transition hover:bg-surface-muted dark:text-slate-300 dark:hover:bg-surface-dark-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 text-slate-600 dark:text-slate-300">
          Nigahdasht is a Retrieval-Augmented Generation health assistant. Ask
          questions in Urdu by voice or text and get evidence-based answers
          drawn from a curated set of maternal- and child-health documents.
        </p>

        <ul className="mb-6 space-y-3 text-sm">
          <Feature
            icon={<MessageSquare className="h-4 w-4" />}
            title="Chat in Urdu or English"
            body="Type or speak — the assistant responds in clear Urdu."
          />
          <Feature
            icon={<Mic className="h-4 w-4" />}
            title="Voice input via Whisper"
            body="Recorded audio is transcribed locally for privacy."
          />
          <Feature
            icon={<ShieldCheck className="h-4 w-4" />}
            title="Grounded answers"
            body="Replies are based only on cited source material; the assistant says when it doesn't know."
          />
        </ul>

        <p className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          ⚠ This is an informational assistant only and not a substitute for a
          qualified medical professional. Seek a doctor in any urgent
          situation.
        </p>

        <div className="flex justify-end">
          <Button onClick={onClose}>Got it</Button>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300">
        {icon}
      </span>
      <div>
        <div className="font-medium text-slate-800 dark:text-slate-100">
          {title}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">{body}</div>
      </div>
    </li>
  );
}
