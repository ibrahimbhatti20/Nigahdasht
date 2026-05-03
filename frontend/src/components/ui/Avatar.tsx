import { User } from "lucide-react";
import clsx from "clsx";

export interface AvatarProps {
  /** Optional image URL. If not provided, falls back to initials or a User icon. */
  src?: string;
  alt?: string;
  /** First letters of name to render when no image is set. */
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({
  src,
  alt = "User avatar",
  initials,
  size = "md",
  className,
}: AvatarProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-white/20 font-medium text-white",
        "ring-2 ring-white/40",
        SIZES[size],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-full object-cover"
        />
      ) : initials ? (
        <span aria-label={alt}>{initials.slice(0, 2).toUpperCase()}</span>
      ) : (
        <User
          className={clsx(
            size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6",
          )}
          aria-label={alt}
        />
      )}
    </span>
  );
}
