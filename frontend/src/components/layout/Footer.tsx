/**
 * App-wide footer rendered below every page.
 *
 * Mirrors the Figma footer (node 1:1775): a thin gray strip with a
 * centered English copyright line and a centered Urdu medical disclaimer.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-surface-border bg-surface-muted px-6 py-6 text-center dark:border-surface-dark-border dark:bg-surface-dark-subtle">
      <div className="mx-auto max-w-screen-xl space-y-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © {year} Nigahdasht AI Health Assistant. Empowering your wellness
          journey.
        </p>
        <p
          lang="ur"
          dir="rtl"
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          براہ کرم یاد رکھیں: یہ صرف ایک معاون اطلاعاتی معاون ہے، کسی بھی سنگین
          صورتحال میں فوری طور پر ڈاکٹر سے رجوع کریں۔
        </p>
      </div>
    </footer>
  );
}
