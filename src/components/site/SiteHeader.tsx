import { useEffect, useState } from "react";
import { ArrowRight, Globe, Menu, Phone, Scale, Shield, Users, X, Zap } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { useActiveSection } from "@/lib/use-active-section";
import { useLiveCount } from "@/lib/live-count";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const primaryHrefs = ["#como-funciona", "#verificacion", "#abogados", "#precios", "#contacto"];
const mobileHrefs = ["#como-funciona", "#abogados", "#precios", "#contacto"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useActiveSection(primaryHrefs);
  const { locale, setLocale, t } = useLocale();
  const { header, app } = t;
  const tickerIcons = [Zap, Shield, Globe];
  const primary = header.nav.filter((item) => primaryHrefs.includes(item.href));

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 12);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open || window.innerWidth >= 640) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-border shadow-[0_8px_24px_-18px_oklch(0.22_0.04_255/0.35)]" : "border-border/60",
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 hidden h-[2px] origin-left bg-brand sm:block"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="overflow-hidden bg-ink sm:hidden">
        <div className="m-ticker flex w-max gap-6 px-3 py-1.5">
          {[...app.ticker, ...app.ticker].map((item, i) => {
            const Icon = tickerIcons[i % tickerIcons.length] ?? Zap;
            return (
              <p
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-wide text-brand-foreground/90"
              >
                <Icon className="h-2.5 w-2.5 shrink-0 text-brand" strokeWidth={2} />
                {item}
              </p>
            );
          })}
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
        <Logo compact className="hidden min-w-0 sm:flex" />
        <Logo subtitle={app.tagline} className="min-w-0 sm:hidden" />
        <a
          href={t.phoneHref}
          className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-card px-2.5 py-1.5 shadow-sm ring-1 ring-border max-sm:flex"
        >
          <Phone className="h-3.5 w-3.5 text-brand" strokeWidth={1.75} />
          <span>
            <span className="block text-[0.62rem] font-semibold leading-none text-foreground">{t.phone}</span>
            <span className="mt-0.5 block text-[0.5rem] leading-none text-muted-foreground">{header.phoneSub}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {primary.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-ui text-[0.8rem] transition-colors",
                active === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-1 h-px bg-brand transition-opacity duration-300",
                  active === item.href ? "opacity-100" : "opacity-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4 sm:gap-5">
          <div className="hidden items-center gap-1.5 text-ui text-[0.7rem] sm:flex" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={cn(
                "transition-colors",
                locale === "es" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {header.langEs}
            </button>
            <span className="text-border">/</span>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "transition-colors",
                locale === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {header.langEn}
            </button>
          </div>

          <a
            href="/registro/abogado"
            className="hidden text-ui text-[0.8rem] text-muted-foreground transition-colors hover:text-foreground lg:block"
          >
            {header.ctaLawyer}
          </a>
          <a
            href="/registro/cliente"
            className="hidden rounded bg-brand px-4 py-2 text-ui text-[0.75rem] text-brand-foreground transition-colors hover:bg-brand-dark sm:block"
          >
            {header.ctaClient}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={header.menuOpen}
            className="grid h-11 w-11 place-items-center text-foreground sm:h-auto sm:w-auto sm:p-1 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <MobileMenu onClose={() => setOpen(false)} />
          <div className="hidden border-t border-border bg-background sm:block lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-6 pb-4">
              {header.nav.map((item) => (
                <a
                  key={`full-${item.label}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border/70 py-3.5 text-ui text-sm transition-colors",
                    active === item.href ? "text-foreground" : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="/registro/abogado"
                  onClick={() => setOpen(false)}
                  className="py-3 text-center text-ui text-xs text-muted-foreground"
                >
                  {header.ctaLawyer}
                </a>
                <a
                  href="/registro/cliente"
                  onClick={() => setOpen(false)}
                  className="rounded bg-brand px-5 py-3 text-center text-ui text-xs text-brand-foreground"
                >
                  {header.ctaClient}
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const lawyers = useLiveCount("lawyers");
  const { locale, setLocale, t } = useLocale();
  const { header, audience, app, hero, chat } = t;
  const links = header.nav.filter((item) => mobileHrefs.includes(item.href));

  return (
    <div className="animate-sheetup fixed inset-x-0 bottom-0 top-[calc(env(safe-area-inset-top)+5.75rem)] z-40 overflow-y-auto bg-background sm:hidden">
      <div className="flex min-h-full flex-col px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex rounded-full bg-muted p-1" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-ui text-[0.72rem]",
                locale === "es" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              {header.langEs}
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-ui text-[0.72rem]",
                locale === "en" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              {header.langEn}
            </button>
          </div>
          <p className="flex items-center gap-1.5 text-[0.68rem] text-muted-foreground">
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="absolute inset-0 rounded-full bg-emerald-400/70 animate-livepulse" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span key={lawyers} className="animate-onlineflick tabular-nums text-foreground">
              {lawyers.toLocaleString("en-US")}
            </span>
            {chat.availableNow}
          </p>
        </div>

        <p className="mt-6 text-kicker text-brand">{header.speakLang}</p>
        <h2 className="mt-1 text-display text-[1.7rem] leading-tight text-foreground">{header.menuPick}</h2>

        <div className="mt-5 grid gap-3">
          <a
            href="/registro/cliente"
            onClick={onClose}
            className="relative overflow-hidden rounded-3xl bg-ink px-5 py-5 text-brand-foreground shadow-panel before:absolute before:-right-8 before:-top-8 before:h-28 before:w-28 before:rounded-full before:bg-brand/25"
          >
            <span className="relative z-10 inline-flex rounded-full bg-brand px-2.5 py-0.5 text-[0.6rem] font-semibold tracking-wide">
              {app.free}
            </span>
            <span className="relative z-10 mt-3 flex items-end justify-between gap-3">
              <span>
                <span className="flex items-center gap-2 text-display text-[1.55rem] leading-none">
                  <Users className="h-5 w-5 text-brand" strokeWidth={1.6} />
                  {header.ctaClient}
                </span>
                <span className="mt-2 block text-sm leading-snug text-brand-foreground/70">
                  {audience.clientTitle}
                </span>
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                <ArrowRight className="h-5 w-5" />
              </span>
            </span>
          </a>

          <a
            href="/registro/abogado"
            onClick={onClose}
            className="rounded-3xl bg-card px-5 py-5 ring-1 ring-border"
          >
            <span className="text-kicker text-muted-foreground">{audience.lawyerLabel}</span>
            <span className="mt-3 flex items-end justify-between gap-3">
              <span>
                <span className="flex items-center gap-2 text-display text-[1.55rem] leading-none text-foreground">
                  <Scale className="h-5 w-5 text-brand" strokeWidth={1.6} />
                  {header.ctaLawyer}
                </span>
                <span className="mt-2 block text-sm leading-snug text-muted-foreground">
                  {audience.lawyerTitle}
                </span>
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-brand">
                <ArrowRight className="h-5 w-5" />
              </span>
            </span>
          </a>
        </div>

        <nav className="mt-7">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between border-b border-border/70 py-3.5 text-ui text-[0.95rem] text-foreground"
            >
              {item.label}
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
          <a
            href={t.phoneHref}
            onClick={onClose}
            className="flex items-center justify-between py-3.5 text-ui text-[0.95rem] text-foreground"
          >
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand" strokeWidth={1.75} />
              {hero.callCta}
            </span>
            <span className="text-[0.7rem] text-muted-foreground">{header.phoneSub}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
