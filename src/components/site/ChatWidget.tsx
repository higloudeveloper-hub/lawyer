import { useState } from "react";
import { MessageSquare, Minus, Paperclip, Send, X } from "lucide-react";

const messages = [
  {
    from: "bot" as const,
    text: "¡Hola! 👋 ¿En qué podemos ayudarte hoy?",
    time: "10:30 AM",
  },
  {
    from: "me" as const,
    text: "Hola, quiero saber cómo funciona la plataforma.",
    time: "10:31 AM",
  },
  {
    from: "bot" as const,
    text: "Con gusto te explico. Conectamos abogados con clientes migratorios en tiempo real. Tú decides a quién aceptar y cuándo.",
    time: "10:32 AM",
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div className="w-[min(88vw,20rem)] overflow-hidden rounded-lg border border-border bg-card shadow-panel">
          <div className="flex items-center gap-3 bg-gradient-brand px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-display text-[0.5rem] leading-none text-brand-foreground">
              D2
              <br />
              LE2
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-display text-sm text-brand-foreground">
                D2LE2 Law
              </span>
              <span className="flex items-center gap-1.5 text-[0.7rem] text-brand-foreground/85">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> En línea
              </span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Minimizar chat"
              className="shrink-0 rounded p-1 text-brand-foreground/90 transition-colors hover:bg-brand-foreground/15"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex max-h-[22rem] flex-col gap-3 overflow-y-auto bg-muted/60 p-4">
            {messages.map((m, i) => (
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
              placeholder="Escribe tu mensaje..."
              aria-label="Escribe tu mensaje"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" aria-label="Adjuntar" className="shrink-0 text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label="Enviar mensaje"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className="grid h-14 w-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-brand transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}