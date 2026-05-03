import { Link } from "react-router-dom";
import {
  MessageCircle,
  BookOpen,
  Lightbulb,
  Mail,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "../components/layout";
import { Card } from "../components/ui";

interface HomeTile {
  to: string;
  title: string;
  urduTitle: string;
  description: string;
  icon: React.ReactNode;
  accent: "brand" | "accent";
}

const TILES: HomeTile[] = [
  {
    to: "/chat",
    title: "Start Chatting",
    urduTitle: "گفتگو شروع کریں",
    description:
      "Ask the AI assistant your health question by voice or text. Replies in Urdu or English.",
    icon: <MessageCircle className="h-6 w-6" />,
    accent: "brand",
  },
  {
    to: "/how-to-use",
    title: "How to Use",
    urduTitle: "استعمال کا طریقہ",
    description:
      "A short guide to typing, voice input, and reading the assistant's responses.",
    icon: <BookOpen className="h-6 w-6" />,
    accent: "accent",
  },
  {
    to: "/tips",
    title: "Helpful Tips",
    urduTitle: "مفید مشورے",
    description:
      "Get better answers with simple language, clear symptoms, and bilingual queries.",
    icon: <Lightbulb className="h-6 w-6" />,
    accent: "brand",
  },
  {
    to: "/contact",
    title: "Contact Us",
    urduTitle: "ہم سے رابطہ",
    description:
      "Send a message, report an issue, or ask the team a question.",
    icon: <Mail className="h-6 w-6" />,
    accent: "accent",
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="text-center">
          <p
            lang="ur"
            dir="rtl"
            className="text-3xl font-semibold text-brand-800 dark:text-brand-300"
          >
            خوش آمدید
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            Welcome to Nigahdasht
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Your AI-powered health assistant. Choose where you want to go.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {TILES.map((tile) => (
            <Link
              key={tile.to}
              to={tile.to}
              className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle dark:focus-visible:ring-offset-surface-dark"
            >
              <Card
                accent={tile.accent}
                className="h-full transition group-hover:-translate-y-0.5 group-hover:shadow-elevated"
                title={
                  <span className="flex items-center gap-2">
                    {tile.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                }
                description={tile.description}
                icon={tile.icon}
              >
                <p
                  lang="ur"
                  dir="rtl"
                  className="mt-4 text-sm text-slate-500 dark:text-slate-400"
                >
                  {tile.urduTitle}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
