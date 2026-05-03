import { WifiOff, RotateCw } from "lucide-react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

/**
 * Sticky banner shown when the browser detects no internet connection.
 * Auto-hides when connectivity returns. Includes a retry button that
 * reloads the page to re-establish any backend connections.
 */
export function OfflineBanner() {
  const online = useOnlineStatus();
  if (online) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="sticky top-20 z-20 border-b border-red-300 bg-red-50 dark:border-red-900/50 dark:bg-red-950/40"
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-6 py-2.5 md:px-12">
        <div className="flex items-center gap-3 text-sm text-red-800 dark:text-red-200">
          <WifiOff className="h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">No Internet Connection</p>
            <p
              lang="ur"
              dir="rtl"
              className="text-xs text-red-700 dark:text-red-300"
            >
              انٹرنیٹ سے رابطہ نہیں ہے
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
        >
          <RotateCw className="h-3.5 w-3.5" /> Retry
        </button>
      </div>
    </div>
  );
}
