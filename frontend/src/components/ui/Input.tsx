import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Optional error message (renders below input in red). */
  error?: string;
  /** Helper text rendered below input. */
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** When true, removes the rounded box style (used inline in chat input area). */
  bare?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    bare = false,
    id: idProp,
    className,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;

  const wrapperBase = bare
    ? "flex items-center gap-2"
    : "flex items-center gap-2 rounded-full border bg-white px-4 py-2.5 transition focus-within:border-brand-800 focus-within:ring-2 focus-within:ring-brand-800/20 dark:bg-surface-dark-muted dark:border-surface-dark-border";

  const wrapperBorder = bare
    ? ""
    : error
      ? "border-red-400"
      : "border-surface-border";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <div className={clsx(wrapperBase, wrapperBorder, className)}>
        {leftIcon && (
          <span className="text-slate-400 dark:text-slate-500">{leftIcon}</span>
        )}
        <input
          ref={ref}
          id={id}
          className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...rest}
        />
        {rightIcon && (
          <span className="text-slate-400 dark:text-slate-500">
            {rightIcon}
          </span>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
