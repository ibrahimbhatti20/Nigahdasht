import { AppShell } from "../components/layout";
import { MessageList, InputArea, SupportiveCards } from "../components/chat";

/**
 * The main chat screen — Figma node 1:1696 ("Html → Body").
 *
 * Layout:
 *   - AppShell provides the green header + footer + white side bars
 *   - Centered chat container (720px) with rounded corners and soft shadow
 *   - Two supportive info cards below
 */
export default function ChatPage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <section
          aria-label="Chat conversation"
          className="flex h-[640px] flex-col overflow-hidden rounded-2xl bg-white shadow-card dark:bg-surface-dark-subtle"
        >
          <MessageList />
          <InputArea />
        </section>

        <SupportiveCards />
      </div>
    </AppShell>
  );
}
