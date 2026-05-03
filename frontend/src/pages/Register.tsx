import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon, Heart, Moon, Sun } from "lucide-react";
import { Button, Input } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function RegisterPage() {
  const { register, isAuthenticating } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await register(email.trim(), password, name.trim() || undefined);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle dark:bg-surface-dark">
      <div className="flex items-center justify-between bg-brand-800 px-6 py-4 text-white md:px-12">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 ring-2 ring-white/30">
            <Heart className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <div className="text-lg font-semibold">Nigahdasht</div>
            <div className="text-xs uppercase tracking-wider opacity-80">
              Create your account
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/20 transition hover:bg-white/30"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>

      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card dark:bg-surface-dark-subtle">
          <h1 className="mb-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Create your account
          </h1>
          <p
            lang="ur"
            dir="rtl"
            className="mb-6 text-sm text-slate-600 dark:text-slate-300"
          >
            اپنا اکاؤنٹ بنائیں اور اپنی صحت کی نگرانی شروع کریں
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Full name (optional)"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              leftIcon={<UserIcon className="h-4 w-4" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              leftIcon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              required
              leftIcon={<Lock className="h-4 w-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint="Use 6+ characters."
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
              leftIcon={<Lock className="h-4 w-4" />}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isAuthenticating}
            >
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-brand-800 hover:underline dark:text-brand-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
