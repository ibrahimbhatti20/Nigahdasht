import {
  Mic,
  Send,
  Paperclip,
  Settings,
  HelpCircle,
  User,
  Info,
  ShieldPlus,
  Mail,
  Lock,
  Moon,
  Sun,
} from "lucide-react";
import { Button, IconButton, Input, Card, Avatar, ThinkingDots } from "../components/ui";
import { useTheme } from "../contexts/ThemeContext";
import { useFontSize, type FontSize } from "../contexts/FontSizeContext";

/**
 * Internal design-system preview, mounted at /__ds in dev.
 *
 * Renders every atomic UI component in light + dark variants so we can
 * compare side-by-side with the Figma screenshots before wiring them
 * into real screens.
 */
export default function DesignSystem() {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
            Nigahdasht — Design System
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Phase 2 preview. Compare against Figma screenshots before
            integrating.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Font:
          </span>
          {(["sm", "md", "lg"] as FontSize[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFontSize(s)}
              className={
                "rounded-md border px-2.5 py-1 text-xs font-medium transition " +
                (fontSize === s
                  ? "border-brand-800 bg-brand-800 text-white"
                  : "border-surface-border bg-white text-slate-700 hover:border-brand-300 dark:border-surface-dark-border dark:bg-surface-dark dark:text-slate-200")
              }
            >
              {s.toUpperCase()}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            leftIcon={theme === "light" ? <Moon /> : <Sun />}
          >
            {theme === "light" ? "Dark" : "Light"}
          </Button>
        </div>
      </header>

      {/* Color tokens */}
      <Section title="Color tokens">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch label="brand-800" className="bg-brand-800" />
          <Swatch label="brand-700" className="bg-brand-700" />
          <Swatch label="accent-800" className="bg-accent-800" />
          <Swatch label="accent-700" className="bg-accent-700" />
          <Swatch label="surface" className="bg-surface text-slate-900" />
          <Swatch label="surface-subtle" className="bg-surface-subtle text-slate-900" />
          <Swatch label="surface-muted" className="bg-surface-muted text-slate-900" />
          <Swatch label="surface-border" className="bg-surface-border text-slate-900" />
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="primary" leftIcon={<Send className="h-4 w-4" />}>
            Send
          </Button>
          <Button variant="primary" loading>
            Loading
          </Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Logout</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      {/* Icon buttons */}
      <Section title="Icon buttons">
        <div className="flex flex-wrap items-center gap-3">
          <IconButton aria-label="Profile" icon={<User />} variant="ghost" />
          <IconButton aria-label="Settings" icon={<Settings />} variant="ghost" />
          <IconButton aria-label="Help" icon={<HelpCircle />} variant="ghost" />
          <IconButton aria-label="Send" icon={<Send />} variant="solid" />
          <IconButton
            aria-label="Record voice"
            icon={<Mic />}
            variant="ghost"
          />
          <span className="rounded-lg bg-brand-800 p-2">
            <IconButton
              aria-label="Profile (header)"
              icon={<User />}
              variant="header"
            />
          </span>
        </div>
      </Section>

      {/* Inputs */}
      <Section title="Inputs">
        <div className="grid gap-4 sm:max-w-md">
          <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<Mail className="h-4 w-4" />} />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
          />
          <Input
            label="With error"
            placeholder="invalid"
            error="Please enter a valid email."
          />
          <Input
            label="With hint"
            placeholder="username"
            hint="Letters, numbers, and underscores only."
          />
        </div>
      </Section>

      {/* Cards (Figma supportive cards) */}
      <Section title="Supportive cards (Figma style)">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card
            accent="accent"
            dir="rtl"
            title="ضروری معلومات"
            description="بخار کی صورت میں آرام اور سیال اشیاء کا استعمال فوری بہتری میں مددگار ہوتا ہے۔"
            icon={<Info className="h-6 w-6" />}
          />
          <Card
            accent="brand"
            dir="rtl"
            title="صحت کا خلاصہ"
            description="آپ کی حالیہ بات چیت کی بنیاد پر، ہم نے ایک رپورٹ تیار کی ہے جو آپ اپنے ڈاکٹر کو دکھا سکتے ہیں۔"
            icon={<ShieldPlus className="h-6 w-6" />}
          />
        </div>
      </Section>

      {/* Avatar */}
      <Section title="Avatar (used inside green header)">
        <div className="flex items-center gap-4 rounded-xl bg-brand-800 p-4">
          <Avatar size="sm" />
          <Avatar size="md" />
          <Avatar size="lg" initials="AR" />
        </div>
      </Section>

      {/* Thinking */}
      <Section title="Thinking state">
        <ThinkingDots />
      </Section>

      {/* Inline chat input mock to validate Input + IconButton compose well */}
      <Section title="Chat input (composed preview)">
        <div className="flex items-center gap-3 rounded-full bg-white px-2 py-2 shadow-card dark:bg-surface-dark-subtle">
          <IconButton
            aria-label="Send"
            icon={<Send className="-rotate-0" />}
            variant="solid"
            size="md"
          />
          <button
            type="button"
            aria-label="Attach file"
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <IconButton
            aria-label="Record voice"
            icon={<Mic />}
            variant="ghost"
          />
        </div>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h2>
      <div className="rounded-2xl border border-surface-border bg-surface-subtle p-6 dark:border-surface-dark-border dark:bg-surface-dark-muted">
        {children}
      </div>
    </section>
  );
}

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={
        "flex h-20 items-end rounded-lg border border-surface-border p-2 text-xs font-medium text-white dark:border-surface-dark-border " +
        className
      }
    >
      {label}
    </div>
  );
}
