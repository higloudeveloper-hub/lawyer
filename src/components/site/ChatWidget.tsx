import { useState } from "react";
import { MessageSquare, Paperclip, Send, X } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { useLiveCount } from "@/lib/live-count";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const lawyers = useLiveCount("lawyers");
  const { t } = useLocale();
  const { chat } = t;

  return (
    <div className="fixed right-3 bottom-[4.75rem] z-50 sm:right-6 sm:bottom-6">
      {open ? (
        <div className="animate-chatpop w-[min(calc(100vw-1.5rem),20rem)] overflow-hidden rounded-lg border border-border bg-card shadow-panel">
          <div className="flex items-center gap-3 bg-ink px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-ui text-[0.5rem] leading-none text-brand-foreground">
              D2
              <br />
              LE2
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-display text-base text-brand-foreground">
                D2LE2 Law
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[0.7rem] text-brand-foreground/80">
                <span className="relative grid h-1.5 w-1.5 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-emerald-400/70 animate-livepulse" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span key={lawyers} className="animate-onlineflick tabular-nums text-brand-foreground">
                  {lawyers.toLocaleString("en-US")}
                </span>
                {chat.lawyersOnline}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={chat.close}
              className="shrink-0 rounded p-1 text-brand-foreground/90 transition-colors hover:bg-brand-foreground/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex max-h-[min(22rem,50vh)] flex-col gap-3 overflow-y-auto bg-muted/60 p-4">
            {chat.messages.map((m, i) => (
              <div key={i} className={m.from === "me" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.from === "me"
                      ? "max-w-[85%] rounded-lg rounded-br-sm bg-brand px-3 py-2 text-sm text-brand-foreground"
                      : "max-w-[85%] rounded-lg rounded-bl-sm bg-card px-3 py-2 text-sm text-card-foreground shadow-sm"
                  }
                >
                  <p className="leading-snug">{m.text}</p>
                  <p
                    className={
                      m.from === "me"
                        ? "mt-1 text-right text-[0.65rem] text-brand-foreground/75"
                        : "mt-1 text-right text-[0.65rem] text-muted-foreground"
                    }
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5"
          >
            <input
              placeholder={chat.placeholder}
              aria-label={chat.placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" aria-label={chat.attach} className="shrink-0 text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label={chat.send}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-end gap-2">
          <span className="min-w-[7.25rem] rounded border border-border bg-card px-2.5 py-1.5 text-left shadow-panel">
            <span className="flex items-center gap-1.5">
              <span className="relative grid h-1.5 w-1.5 place-items-center">
                <span className="absolute inset-0 rounded-full bg-emerald-400/70 animate-livepulse" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span key={lawyers} className="animate-onlineflick text-ui text-sm tabular-nums leading-none text-foreground">
                {lawyers.toLocaleString("en-US")}
              </span>
            </span>
            <span className="mt-1 block text-[0.62rem] font-semibold tracking-wide text-muted-foreground">
              {chat.availableNow}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`${lawyers} ${chat.lawyersOnline}`}
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground shadow-brand animate-ctapulse transition-transform hover:scale-105"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
