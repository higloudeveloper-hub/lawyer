import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { useActiveSection } from "@/lib/use-active-section";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const primaryHrefs = ["#como-funciona", "#verificacion", "#abogados", "#precios", "#contacto"];
const mobileHrefs = ["#inicio", "#como-funciona", "#abogados", "#precios", "#contacto"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useActiveSection(primaryHrefs);
  const { locale, setLocale, t } = useLocale();
  const { header } = t;
  const primary = header.nav.filter((item) => primaryHrefs.includes(item.href));
  const mobileNav = header.nav.filter((item) => mobileHrefs.includes(item.href));

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
        className="absolute inset-x-0 bottom-0 z-10 h-[2px] origin-left bg-brand"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:h-16 sm:px-6">
        <Logo compact className="min-w-0" />

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
        <div className="border-t border-border bg-background max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-[calc(env(safe-area-inset-top)+3.5rem)] max-sm:z-40 max-sm:overflow-y-auto max-sm:border-0 max-sm:bg-background/96 max-sm:backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:px-6 sm:pb-4">
            {mobileNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-border/70 py-4 text-ui text-base transition-colors sm:hidden",
                  active === item.href ? "text-foreground" : "text-foreground/80 hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            ))}
            {header.nav.map((item) => (
              <a
                key={`full-${item.label}`}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "hidden border-b border-border/70 py-3.5 text-ui text-sm transition-colors sm:block",
                  active === item.href ? "text-foreground" : "text-foreground/80 hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-3 py-4 sm:hidden">
              <button
                type="button"
                onClick={() => setLocale("es")}
                className={cn(
                  "min-h-11 px-2 text-ui text-sm",
                  locale === "es" ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {header.langEs}
              </button>
              <span className="text-border">/</span>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={cn(
                  "min-h-11 px-2 text-ui text-sm",
                  locale === "en" ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {header.langEn}
              </button>
            </div>
            <div className="flex flex-col gap-2 pb-4 sm:pt-2">
              <a
                href="/registro/abogado"
                onClick={() => setOpen(false)}
                className="py-3 text-center text-ui text-xs text-muted-foreground max-sm:min-h-11 max-sm:text-sm"
              >
                {header.ctaLawyer}
              </a>
              <a
                href="/registro/cliente"
                onClick={() => setOpen(false)}
                className="rounded bg-brand px-5 py-3 text-center text-ui text-xs text-brand-foreground max-sm:rounded-full max-sm:text-sm"
              >
                {header.ctaClient}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
