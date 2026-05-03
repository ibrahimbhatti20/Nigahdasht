import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, CheckCircle2, Send } from "lucide-react";
import { AppShell } from "../components/layout";
import { Button, Card, Input } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";

type Status = "idle" | "submitting" | "success";

export default function ContactPage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Enter a valid email.";
    if (!subject.trim()) next.subject = "Subject is required.";
    if (message.trim().length < 10)
      next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    // Mock send — swap for fetch("/api/contact", ...) when backend lands.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
    setName("");
    setSubject("");
    setMessage("");
  };

  if (status === "success") {
    return (
      <AppShell>
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 py-10 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Message sent
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Thanks for reaching out. We'll respond to{" "}
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {email}
            </span>{" "}
            within 1–2 business days.
          </p>
          <p
            lang="ur"
            dir="rtl"
            className="text-sm text-slate-500 dark:text-slate-400"
          >
            آپ کا پیغام موصول ہو گیا ہے۔ شکریہ۔
          </p>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]">
        <aside className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Contact Us
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Have a question, feedback, or a bug to report? Send us a message.
          </p>
          <p
            lang="ur"
            dir="rtl"
            className="text-sm text-slate-500 dark:text-slate-400"
          >
            ہم سے رابطہ کریں — ہم آپ کی مدد کے لیے حاضر ہیں۔
          </p>

          <Card accent="accent" className="mt-2">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 shrink-0 text-accent-700 dark:text-accent-300" />
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  support@nigahdasht.app
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Email support
                </p>
              </div>
            </div>
          </Card>
          <Card accent="brand">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 shrink-0 text-brand-700 dark:text-brand-300" />
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Replies in 1–2 days
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Mon–Fri, 9am–5pm PKT
                </p>
              </div>
            </div>
          </Card>
        </aside>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card dark:bg-surface-dark-subtle"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Your name"
              placeholder="Aisha Khan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
          </div>

          <Input
            label="Subject"
            placeholder="What's this about?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={errors.subject}
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what's on your mind..."
              className={
                "w-full rounded-2xl border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-800/20 dark:bg-surface-dark-muted dark:text-slate-100 dark:placeholder:text-slate-500 " +
                (errors.message
                  ? "border-red-400"
                  : "border-surface-border dark:border-surface-dark-border")
              }
            />
            {errors.message && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              loading={status === "submitting"}
              rightIcon={<Send className="h-4 w-4" />}
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
