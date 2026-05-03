import { MessageSquare, Languages, Stethoscope, Mic, Lock, Search } from "lucide-react";
import { AppShell } from "../components/layout";
import { Card } from "../components/ui";

interface Tip {
  icon: React.ReactNode;
  title: string;
  body: string;
  urdu: string;
  accent: "brand" | "accent";
}

const TIPS: Tip[] = [
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Ask in simple sentences",
    body: "Clarity helps our AI understand your needs more accurately. Avoid long, compound questions.",
    urdu: "آسان جملوں میں اپنا سوال لکھیں",
    accent: "accent",
  },
  {
    icon: <Languages className="h-5 w-5" />,
    title: "You can use Urdu or English",
    body: "We support both languages for your comfort and ease of use.",
    urdu: "آپ اردو یا انگریزی استعمال کر سکتے ہیں",
    accent: "brand",
  },
  {
    icon: <Stethoscope className="h-5 w-5" />,
    title: "Describe symptoms clearly",
    body: "Including detailed context allows for more medically-relevant suggestions.",
    urdu: "علامات کو واضح طور پر بیان کریں",
    accent: "brand",
  },
  {
    icon: <Mic className="h-5 w-5" />,
    title: "Voice input available",
    body: "Just tap the microphone to speak your health concerns directly.",
    urdu: "آواز کے ذریعے بھی سوال کیا جا سکتا ہے",
    accent: "accent",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Did you know?",
    body: "Your visits are automatically synced with these suggestions to provide personalized advice.",
    urdu: "آپ کے سوالات بہتر مشورے کے لیے استعمال ہوتے ہیں",
    accent: "brand",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Privacy first",
    body: "Your medical descriptions are encrypted and stay private between you and your provider.",
    urdu: "آپ کی معلومات محفوظ اور نجی رہتی ہیں",
    accent: "accent",
  },
];

export default function TipsPage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            Helpful Tips
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Get better answers from your AI assistant.
          </p>
          <p
            lang="ur"
            dir="rtl"
            className="mt-1 text-sm text-slate-500 dark:text-slate-400"
          >
            اپنے AI معاون سے بہترین جواب حاصل کرنے کے لیے یہ تجاویز
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((tip) => (
            <Card
              key={tip.title}
              accent={tip.accent}
              title={tip.title}
              description={tip.body}
              icon={tip.icon}
            >
              <p
                lang="ur"
                dir="rtl"
                className="mt-4 border-t border-surface-border pt-3 text-sm text-slate-600 dark:border-surface-dark-border dark:text-slate-400"
              >
                {tip.urdu}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
