import { Link } from "react-router-dom";
import { Type, Mic, Sparkles, ArrowRight } from "lucide-react";
import { AppShell } from "../components/layout";
import { Button, Card } from "../components/ui";

interface Step {
  n: number;
  icon: React.ReactNode;
  title: string;
  urduTitle: string;
  body: string;
  urduBody: string;
}

const STEPS: Step[] = [
  {
    n: 1,
    icon: <Type className="h-5 w-5" />,
    title: "Type your health question",
    urduTitle: "صحت سے متعلق اپنا سوال لکھیں",
    body: "Open the chat and type a clear, simple question. Urdu and English both work.",
    urduBody:
      "چیٹ کھولیں اور آسان جملوں میں سوال لکھیں۔ اردو اور انگریزی دونوں قبول ہیں۔",
  },
  {
    n: 2,
    icon: <Mic className="h-5 w-5" />,
    title: "Use voice input for faster help",
    urduTitle: "تیز جواب کے لیے آواز کا استعمال کریں",
    body: "Tap the microphone, speak your question, and tap again to stop. The assistant will transcribe and answer.",
    urduBody:
      "مائیک پر کلک کریں، اپنا سوال بولیں، پھر روکنے کے لیے دوبارہ دبائیں۔",
  },
  {
    n: 3,
    icon: <Sparkles className="h-5 w-5" />,
    title: "Get AI-powered guidance instantly",
    urduTitle: "فوری AI رہنمائی حاصل کریں",
    body: "Read the response in your preferred language. Tap the speaker icon to hear it aloud.",
    urduBody:
      "اپنی پسندیدہ زبان میں جواب پڑھیں یا سننے کے لیے اسپیکر دبائیں۔",
  },
];

export default function HowToUsePage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="text-center">
          <p
            lang="ur"
            dir="rtl"
            className="text-2xl font-semibold text-brand-800 dark:text-brand-300"
          >
            نگہداشت
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            How to Use Nigahdasht
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-600 dark:text-slate-400">
            Our AI assistant is here to help you manage your health with ease
            and precision. Three simple steps to get started.
          </p>
        </header>

        <ol className="flex flex-col gap-4">
          {STEPS.map((step) => (
            <li key={step.n}>
              <Card accent={step.n === 2 ? "brand" : "accent"}>
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-800 text-white">
                    {step.n}
                  </div>
                  <div className="flex-1">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                      <span className="text-brand-800 dark:text-brand-300">
                        {step.icon}
                      </span>
                      {step.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {step.body}
                    </p>
                    <div
                      lang="ur"
                      dir="rtl"
                      className="mt-3 border-t border-surface-border pt-3 text-sm text-slate-700 dark:border-surface-dark-border dark:text-slate-300"
                    >
                      <p className="font-semibold text-brand-800 dark:text-brand-300">
                        {step.urduTitle}
                      </p>
                      <p className="mt-1">{step.urduBody}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <div className="flex justify-center">
          <Link to="/chat">
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Start Chatting Now
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
