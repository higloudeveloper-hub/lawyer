import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { Reveal } from "./Reveal";

export function Contact() {
  const { t } = useLocale();
  const { contact } = t;
  const [sent, setSent] = useState(false);

  return (
    <section id="contacto" className="scroll-mt-24 bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-kicker text-brand">{contact.label}</p>
          <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{contact.text}</p>
          <a
            href={t.phoneHref}
            className="mt-8 inline-flex items-center gap-3 text-display text-xl text-foreground"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand">
              <MessageCircle className="h-5 w-5 text-brand-foreground" />
            </span>
            {t.phone}
          </a>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded border border-border bg-card p-5 sm:p-8"
          >
            {sent ? (
              <div className="animate-chatpop py-10 text-center">
                <p className="text-display text-lg text-foreground">{contact.done}</p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: contact.fields.name, type: "text", ph: contact.fields.namePh },
                    { label: contact.fields.email, type: "email", ph: contact.fields.emailPh },
                    { label: contact.fields.phone, type: "tel", ph: contact.fields.phonePh },
                  ].map((f) => (
                    <label key={f.label} className="block min-w-0">
                      <span className="text-kicker text-muted-foreground">
                        {f.label}
                      </span>
                      <input
                        type={f.type}
                        required
                        placeholder={f.ph}
                        className="mt-2 w-full rounded border border-border bg-background px-3 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand"
                      />
                    </label>
                  ))}
                </div>
                <label className="mt-4 block">
                  <span className="text-kicker text-muted-foreground">
                    {contact.fields.message}
                  </span>
                  <textarea
                    rows={4}
                    required
                    placeholder={contact.fields.messagePh}
                    className="mt-2 w-full rounded border border-border bg-background px-3 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-6 w-full rounded border border-foreground/20 px-5 py-4 text-ui text-sm text-foreground transition-colors hover:bg-accent"
                >
                  {contact.submit}
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
