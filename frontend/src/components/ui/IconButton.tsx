import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

export type IconButtonVariant = "solid" | "ghost" | "header";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required for accessibility — describes what the button does. */
  "aria-label": string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const VARIANTS: Record<IconButtonVariant, string> = {
  solid:
    "bg-brand-800 text-white hover:bg-brand-700 active:bg-brand-900 shadow-card",
  ghost:
    "text-slate-600 hover:bg-surface-muted dark:text-slate-300 dark:hover:bg-surface-dark-muted",
  /** Used in the green header — translucent white pill on the brand bar. */
  header:
    "text-white bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm",
};

const SIZES: Record<IconButtonSize, string> = {
  sm: "h-8 w-8 [&>*]:h-4 [&>*]:w-4",
  md: "h-10 w-10 [&>*]:h-5 [&>*]:w-5",
  lg: "h-12 w-12 [&>*]:h-6 [&>*]:w-6",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, variant = "ghost", size = "md", className, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          "inline-flex items-center justify-center rounded-full transition",
          VARIANTS[variant],
          SIZES[size],
          className,
        )}
        {...rest}
      >
        {icon}
      </button>
    );
  },
);
