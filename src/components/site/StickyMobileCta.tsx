import { useEffect, useState } from "react";
import { MessageSquare, Paperclip, Phone, Send, X } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { useLiveCount } from "@/lib/live-count";

/** Mobile-only native dock + chat sheet. Hidden from sm and up. */
export function StickyMobileCta() {
  const [chatOpen, setChatOpen] = useState(false);
  const lawyers = useLiveCount("lawyers");
  const { t } = useLocale();
  const { chat, header, hero } = t;

  useEffect(() => {
    if (!chatOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [chatOpen]);

  return (
    <div className="sm:hidden">
      {chatOpen && (
        <button
          type="button"
          aria-label={chat.close}
          onClick={() => setChatOpen(false)}
          className="fixed inset-0 z-40 bg-ink/45"
        />
      )}

      {chatOpen && (
        <div className="animate-sheetup fixed inset-x-0 z-50 mx-2 overflow-hidden rounded-t-2xl border border-border bg-card shadow-panel bottom-[calc(3.85rem+env(safe-area-inset-bottom))]">
          <div className="flex justify-center pt-2">
            <span className="h-1 w-10 rounded-full bg-border" />
          </div>
          <div className="flex items-center gap-3 px-4 pb-3 pt-1">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-ui text-[0.5rem] leading-none text-brand-foreground">
              D2
              <br />
              LE2
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-display text-base text-foreground">D2LE2 Law</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
                <span className="relative grid h-1.5 w-1.5 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-emerald-400/70 animate-livepulse" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span key={lawyers} className="animate-onlineflick tabular-nums text-foreground">
                  {lawyers.toLocaleString("en-US")}
                </span>
                {chat.lawyersOnline}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              aria-label={chat.close}
              className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex max-h-[min(52svh,22rem)] flex-col gap-3 overflow-y-auto bg-muted/60 px-4 py-3">
            {chat.messages.map((m, i) => (
              <div key={i} className={m.from === "me" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.from === "me"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-3 py-2 text-sm text-brand-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-card px-3 py-2 text-sm text-card-foreground shadow-sm"
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
              className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            <button type="button" aria-label={chat.attach} className="grid h-11 w-11 place-items-center text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label={chat.send}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
        <div className="grid h-[3.85rem] grid-cols-3 items-center px-2">
          <button
            type="button"
            onClick={() => setChatOpen((v) => !v)}
            aria-label={chat.open}
            className="flex flex-col items-center gap-0.5 text-muted-foreground"
          >
            <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
            <span className="text-ui text-[0.62rem]">{header.dockChat}</span>
          </button>

          <a
            href="/registro/cliente"
            className="mx-1 flex h-11 items-center justify-center rounded-full bg-brand px-3 text-ui text-[0.8rem] text-brand-foreground active:bg-brand-dark"
          >
            {header.ctaClient}
          </a>

          <a
            href={t.phoneHref}
            aria-label={hero.callCta}
            className="flex flex-col items-center gap-0.5 text-muted-foreground"
          >
            <Phone className="h-5 w-5" strokeWidth={1.75} />
            <span className="text-ui text-[0.62rem]">{header.dockCall}</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
