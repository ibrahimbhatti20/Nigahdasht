import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Heart, Moon, Sun } from "lucide-react";
import { Button, Input } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

interface LocationState {
  from?: string;
}

export default function LoginPage() {
  const { login, isAuthenticating } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from ?? "/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle dark:bg-surface-dark">
      {/* Slim brand header — pure brand bar, no nav */}
      <div className="flex items-center justify-between bg-brand-800 px-6 py-4 text-white md:px-12">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 ring-2 ring-white/30">
            <Heart className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <div className="text-lg font-semibold">Nigahdasht</div>
            <div className="text-xs uppercase tracking-wider opacity-80">
              AI Health Assistant
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
            Welcome back
          </h1>
          <p
            lang="ur"
            dir="rtl"
            className="mb-6 text-sm text-slate-600 dark:text-slate-300"
          >
            دوبارہ خوش آمدید — اپنے اکاؤنٹ میں سائن ان کریں
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300"
              >
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Password reset is not yet wired up — coming with the real backend.",
                  )
                }
                className="text-xs font-medium text-brand-800 hover:underline dark:text-brand-300"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isAuthenticating}
            >
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-brand-800 hover:underline dark:text-brand-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
