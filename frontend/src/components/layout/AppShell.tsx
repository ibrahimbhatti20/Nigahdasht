import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { OfflineBanner } from "./OfflineBanner";

export interface AppShellProps {
  children: ReactNode;
  /** Hide the header (e.g. on Login/Register pages where we want a clean shell). */
  hideHeader?: boolean;
  /** Hide the footer too. */
  hideFooter?: boolean;
}

/**
 * Top-level layout wrapper.
 *
 * - Full-bleed header / footer (green bar spans full width like Figma)
 * - Centered content with `max-w-screen-xl` + horizontal padding so the
 *   user sees the requested **white side bars** on wide screens.
 * - `min-h-screen flex-col` so the footer sticks to the bottom.
 */
export function AppShell({ children, hideHeader, hideFooter }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle dark:bg-surface-dark">
      {!hideHeader && <Header />}
      {!hideHeader && <OfflineBanner />}
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-screen-xl flex-1 px-6 py-8 md:px-12">
          {children}
        </div>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
