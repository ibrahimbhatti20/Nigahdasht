import { type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

export type CardAccent = "brand" | "accent" | "none";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Top-border color accent — Figma uses blue for "info" and green for "summary". */
  accent?: CardAccent;
  title?: ReactNode;
  description?: ReactNode;
  /** Optional icon rendered on the right side, in a tinted square overlay. */
  icon?: ReactNode;
  /** Override the icon background tint. Defaults to match accent. */
  iconAccent?: CardAccent;
  /** Direction of text — used for Urdu RTL. */
  dir?: "ltr" | "rtl";
}

const ACCENT_TOP_BORDER: Record<CardAccent, string> = {
  brand: "before:bg-brand-700",
  accent: "before:bg-accent-700",
  none: "before:hidden",
};

const ICON_TINT: Record<CardAccent, string> = {
  brand: "bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300",
  accent:
    "bg-accent-50 text-accent-800 dark:bg-accent-900/40 dark:text-accent-300",
  none: "bg-surface-muted text-slate-600 dark:bg-surface-dark-muted dark:text-slate-300",
};

export function Card({
  accent = "brand",
  title,
  description,
  icon,
  iconAccent,
  dir,
  className,
  children,
  ...rest
}: CardProps) {
  const tint = iconAccent ?? accent;

  return (
    <div
      dir={dir}
      className={clsx(
        "relative overflow-hidden rounded-2xl bg-white p-6 shadow-card",
        "before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:content-['']",
        "dark:bg-surface-dark-subtle",
        ACCENT_TOP_BORDER[accent],
        className,
      )}
      {...rest}
    >
      {(title || icon || description) && (
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {title && (
              <h3
                className={clsx(
                  "text-lg font-semibold",
                  accent === "brand"
                    ? "text-brand-800 dark:text-brand-300"
                    : accent === "accent"
                      ? "text-accent-800 dark:text-accent-300"
                      : "text-slate-900 dark:text-slate-100",
                )}
              >
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
          {icon && (
            <div
              className={clsx(
                "grid h-12 w-12 shrink-0 place-items-center rounded-xl",
                ICON_TINT[tint],
              )}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
