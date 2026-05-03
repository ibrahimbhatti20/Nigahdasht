import { useEffect } from "react";
import { X, Moon, Sun, Type, Languages } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useFontSize, type FontSize } from "../../contexts/FontSizeContext";
import { Button } from "../ui";

export interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

/** Right-side slide-out drawer with theme + font-size + language stub. */
export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={
          "fixed inset-0 z-40 bg-slate-900/40 transition-opacity " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        className={
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-elevated transition-transform dark:bg-surface-dark-subtle " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between border-b border-surface-border px-6 py-4 dark:border-surface-dark-border">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="rounded-full p-1 text-slate-500 transition hover:bg-surface-muted dark:text-slate-300 dark:hover:bg-surface-dark-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
          {/* Theme */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}{" "}
              Theme
            </h3>
            <div className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-subtle p-4 dark:border-surface-dark-border dark:bg-surface-dark-muted">
              <div>
                <div className="font-medium">
                  {theme === "light" ? "Light mode" : "Dark mode"}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Toggle between light and dark appearance.
                </div>
              </div>
              <Button onClick={toggleTheme} size="sm">
                Switch to {theme === "light" ? "dark" : "light"}
              </Button>
            </div>
          </section>

          {/* Font size */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Type className="h-4 w-4" /> Font size
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(["sm", "md", "lg"] as FontSize[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFontSize(s)}
                  className={
                    "rounded-xl border p-4 text-center transition " +
                    (fontSize === s
                      ? "border-brand-800 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-900/30 dark:text-brand-300"
                      : "border-surface-border bg-white hover:border-brand-300 dark:border-surface-dark-border dark:bg-surface-dark")
                  }
                  aria-pressed={fontSize === s}
                >
                  <div
                    className={
                      "font-semibold " +
                      (s === "sm"
                        ? "text-sm"
                        : s === "md"
                          ? "text-base"
                          : "text-lg")
                    }
                  >
                    Aa
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wide">
                    {s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Affects every screen, including chat bubbles.
            </p>
          </section>

          {/* Language stub */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Languages className="h-4 w-4" /> Language
            </h3>
            <div className="rounded-xl border border-surface-border bg-surface-subtle p-4 text-sm dark:border-surface-dark-border dark:bg-surface-dark-muted">
              <div className="mb-1 font-medium">Urdu + English</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The assistant currently understands and replies in Urdu.
                Additional languages coming soon.
              </p>
            </div>
          </section>
        </div>

        <footer className="border-t border-surface-border px-6 py-4 dark:border-surface-dark-border">
          <Button variant="outline" fullWidth onClick={onClose}>
            Done
          </Button>
        </footer>
      </aside>
    </>
  );
}
