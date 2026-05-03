import { useState } from "react";
import {
  Settings,
  HelpCircle,
  Moon,
  Sun,
  Plus,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { Avatar, IconButton } from "../ui";
import { SettingsDrawer } from "./SettingsDrawer";
import { AboutModal } from "./AboutModal";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/home", label: "Home" },
  { to: "/chat", label: "Chat" },
  { to: "/how-to-use", label: "How to Use" },
  { to: "/tips", label: "Tips" },
  { to: "/contact", label: "Contact" },
];

/**
 * Persistent green TopAppBar from Figma (node 1:1781).
 *
 *  Left:   Avatar | Settings | Help | New Chat
 *  Center: Page nav (Home / Chat / How to Use / Tips / Contact)
 *  Right:  "Nigahasht" + subtitle | Theme toggle | (Profile menu)
 */
export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { clearMessages } = useChat();
  const navigate = useNavigate();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-20 bg-brand-800 text-white shadow-md">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between gap-4 px-6 md:px-12">
          {/* Left cluster — utility icons */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((v) => !v)}
                aria-label="Open profile menu"
                aria-expanded={profileMenuOpen}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Avatar size="md" initials={user?.email?.[0]} />
              </button>

              {profileMenuOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-12 w-56 rounded-xl border border-surface-border bg-white py-1 text-slate-800 shadow-elevated dark:border-surface-dark-border dark:bg-surface-dark-subtle dark:text-slate-100"
                >
                  <div className="border-b border-surface-border px-4 py-2 text-xs text-slate-500 dark:border-surface-dark-border dark:text-slate-400">
                    Signed in as
                    <div className="truncate font-medium text-slate-800 dark:text-slate-100">
                      {user?.email ?? "guest"}
                    </div>
                  </div>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setSettingsOpen(true);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-surface-muted dark:hover:bg-surface-dark-muted"
                  >
                    <UserIcon className="h-4 w-4" /> Profile & settings
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              )}
            </div>

            <IconButton
              aria-label="Settings"
              icon={<Settings />}
              variant="header"
              onClick={() => setSettingsOpen(true)}
            />
            <IconButton
              aria-label="Help and about"
              icon={<HelpCircle />}
              variant="header"
              onClick={() => setAboutOpen(true)}
            />
            <IconButton
              aria-label="Start a new chat"
              icon={<Plus />}
              variant="header"
              onClick={() => {
                if (
                  confirm("Clear current conversation and start a new chat?")
                ) {
                  clearMessages();
                }
              }}
            />
          </div>

          {/* Center — page navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  "rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white " +
                  (isActive
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right cluster — branding + theme toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <div
                lang="ur"
                dir="rtl"
                className="text-2xl font-semibold leading-tight"
              >
                نگہداشت{" "}
                <span lang="en" dir="ltr" className="font-sans">
                  (Nigahasht)
                </span>
              </div>
              <div className="text-xs uppercase tracking-wider opacity-90">
                AI Health Assistant
              </div>
            </div>
            <IconButton
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              icon={theme === "light" ? <Moon /> : <Sun />}
              variant="header"
              onClick={toggleTheme}
            />
          </div>
        </div>

        {/* Compact nav for narrow screens (below lg) */}
        <nav
          aria-label="Primary mobile"
          className="flex items-center justify-center gap-1 overflow-x-auto border-t border-white/10 bg-brand-800 px-4 py-1 lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition " +
                (isActive
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
