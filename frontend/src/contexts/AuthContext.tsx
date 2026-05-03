import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface AuthUser {
  email: string;
  /** Optional display name. */
  name?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticating: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = "nigahdasht.auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface StoredAuth {
  user: AuthUser;
  token: string;
}

function loadStored(): StoredAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAuth;
    if (parsed?.user?.email && parsed?.token) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const stored = loadStored();
    return {
      user: stored?.user ?? null,
      token: stored?.token ?? null,
      isAuthenticating: false,
    };
  });

  // Mock login — accepts any non-empty creds, mimics ~600ms server round-trip.
  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    setState((s) => ({ ...s, isAuthenticating: true }));
    await new Promise((r) => setTimeout(r, 600));
    const stored: StoredAuth = {
      user: { email, name: email.split("@")[0] },
      token: `mock-jwt-${Math.random().toString(36).slice(2, 10)}`,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setState({
      user: stored.user,
      token: stored.token,
      isAuthenticating: false,
    });
  }, []);

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }
      setState((s) => ({ ...s, isAuthenticating: true }));
      await new Promise((r) => setTimeout(r, 700));
      const stored: StoredAuth = {
        user: { email, name: name || email.split("@")[0] },
        token: `mock-jwt-${Math.random().toString(36).slice(2, 10)}`,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      setState({
        user: stored.user,
        token: stored.token,
        isAuthenticating: false,
      });
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    // Also clear chat history so logout doesn't leak into the next session
    localStorage.removeItem("nigahdasht.chat");
    setState({ user: null, token: null, isAuthenticating: false });
  }, []);

  // Sync auth across browser tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const stored = loadStored();
        setState({
          user: stored?.user ?? null,
          token: stored?.token ?? null,
          isAuthenticating: false,
        });
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
