import { Info, ShieldPlus } from "lucide-react";
import { Card } from "../ui";

/**
 * Two info cards rendered below the chat (Figma node 1:1755).
 * Click handlers open a small alert for now — when the backend exposes
 * /api/summary they'll fetch a real summary blob.
 */
export function SupportiveCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <button
        type="button"
        onClick={() =>
          alert(
            "Quick health tips will be auto-generated from the conversation once the Python backend is wired in.",
          )
        }
        className="text-left transition hover:-translate-y-0.5 hover:shadow-elevated focus-visible:-translate-y-0.5"
      >
        <Card
          accent="accent"
          dir="rtl"
          title="ضروری معلومات"
          description="بخار کی صورت میں آرام اور سیال اشیاء کا استعمال فوری بہتری میں مددگار ہوتا ہے۔"
          icon={<Info className="h-6 w-6" />}
        />
      </button>

      <button
        type="button"
        onClick={() =>
          alert(
            "Health-summary export will be enabled once the backend ships /api/summary.",
          )
        }
        className="text-left transition hover:-translate-y-0.5 hover:shadow-elevated focus-visible:-translate-y-0.5"
      >
        <Card
          accent="brand"
          dir="rtl"
          title="صحت کا خلاصہ"
          description="آپ کی حالیہ بات چیت کی بنیاد پر، ہم نے ایک رپورٹ تیار کی ہے جو آپ اپنے ڈاکٹر کو دکھا سکتے ہیں۔"
          icon={<ShieldPlus className="h-6 w-6" />}
        />
      </button>
    </div>
  );
}
