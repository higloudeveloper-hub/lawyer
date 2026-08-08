import { useState } from "react";
import { ChevronDown, Menu, MessageSquare, Phone, X } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const { header } = t;

  return (
    <header className="sticky top-0 z-40">
      <div className="overflow-hidden bg-gradient-brand">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex w-max marquee-track items-center gap-6 md:animate-none">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center gap-6">
                  {header.ticker.map((item) => (
                    <span
                      key={`${dup}-${item}`}
                      className="flex shrink-0 items-center gap-2 text-display text-[0.65rem] whitespace-nowrap text-brand-foreground/95"
                    >
                      <span className="text-brand-foreground/80">★</span>
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <span className="hidden shrink-0 items-center gap-2 text-display text-[0.65rem] text-brand-foreground/95 lg:flex">
            <MessageSquare className="h-3.5 w-3.5" /> {header.speakLang}
          </span>
        </div>
      </div>

      <div className="border-b border-brand-foreground/10 bg-ink/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
          <div className="flex min-w-0 items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-6 xl:flex">
              {header.nav.map((item) => (
                <div key={item.label} className="group relative">
                  <a
                    href={item.href}
                    className="flex items-center gap-1 border-b-2 border-transparent py-1 text-display text-[0.7rem] text-brand-foreground/80 transition-colors hover:border-brand hover:text-brand-foreground"
                  >
                    {item.label}
                    {"children" in item && item.children ? <ChevronDown className="h-3 w-3" /> : null}
                  </a>
                  {"children" in item && item.children ? (
                    <div className="invisible absolute top-full left-0 z-10 w-56 translate-y-1 rounded-md border border-border bg-card p-2 opacity-0 shadow-panel transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {header.benefitLinks.map((b) => (
                        <a
                          key={b.label}
                          href={b.href}
                          className="block rounded px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {b.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div
              className="hidden items-center rounded border border-brand-foreground/20 p-0.5 text-display text-[0.65rem] sm:flex"
              role="group"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => setLocale("es")}
                className={
                  locale === "es"
                    ? "rounded bg-brand px-2.5 py-1 text-brand-foreground"
                    : "rounded px-2.5 py-1 text-brand-foreground/70 transition-colors hover:text-brand-foreground"
                }
              >
                {header.langEs}
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={
                  locale === "en"
                    ? "rounded bg-brand px-2.5 py-1 text-brand-foreground"
                    : "rounded px-2.5 py-1 text-brand-foreground/70 transition-colors hover:text-brand-foreground"
                }
              >
                {header.langEn}
              </button>
            </div>

            <a href={t.phoneHref} className="hidden items-center gap-2 lg:flex">
              <Phone className="h-4 w-4 shrink-0 text-brand" />
              <span>
                <span className="block text-display text-base leading-none text-brand-foreground">
                  {t.phone}
                </span>
                <span className="block text-[0.6rem] tracking-widest text-brand">
                  {header.phoneSub}
                </span>
              </span>
            </a>

            <a
              href="#registro"
              className="hidden shrink-0 rounded border border-brand-foreground/25 px-4 py-2.5 text-display text-[0.65rem] text-brand-foreground transition-colors hover:bg-brand-foreground/10 md:block"
            >
              {header.ctaClient}
            </a>
            <a
              href="#registro"
              className="hidden shrink-0 rounded bg-brand px-4 py-2.5 text-display text-[0.65rem] text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark sm:block"
            >
              {header.ctaLawyer}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={header.menuOpen}
              className="rounded p-2 text-brand-foreground xl:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-brand-foreground/10 bg-ink xl:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
              {header.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-brand-foreground/10 py-3 text-display text-sm text-brand-foreground/85 transition-colors hover:text-brand"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-2 border-b border-brand-foreground/10 py-3 sm:hidden">
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className={
                    locale === "es"
                      ? "rounded bg-brand px-3 py-1.5 text-display text-xs text-brand-foreground"
                      : "rounded border border-brand-foreground/20 px-3 py-1.5 text-display text-xs text-brand-foreground/80"
                  }
                >
                  {header.langEs}
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={
                    locale === "en"
                      ? "rounded bg-brand px-3 py-1.5 text-display text-xs text-brand-foreground"
                      : "rounded border border-brand-foreground/20 px-3 py-1.5 text-display text-xs text-brand-foreground/80"
                  }
                >
                  {header.langEn}
                </button>
              </div>
              <div className="flex flex-col gap-3 py-4">
                <a
                  href={t.phoneHref}
                  className="flex items-center gap-2 text-display text-sm text-brand-foreground"
                >
                  <Phone className="h-4 w-4 text-brand" /> {t.phone}
                </a>
                <a
                  href="#registro"
                  onClick={() => setOpen(false)}
                  className="rounded border border-brand-foreground/25 px-5 py-3 text-center text-display text-xs text-brand-foreground"
                >
                  {header.ctaClient}
                </a>
                <a
                  href="#registro"
                  onClick={() => setOpen(false)}
                  className="rounded bg-brand px-5 py-3 text-center text-display text-xs text-brand-foreground"
                >
                  {header.ctaLawyer}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
