import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const primaryHrefs = ["#como-funciona", "#verificacion", "#abogados", "#precios", "#contacto"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const { header } = t;
  const primary = header.nav.filter((item) => primaryHrefs.includes(item.href));

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo compact className="min-w-0" />

        <nav className="hidden items-center gap-8 lg:flex">
          {primary.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ui text-[0.8rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
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
            className="p-1 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {header.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/70 py-3.5 text-ui text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-3 py-4 sm:hidden">
              <button
                type="button"
                onClick={() => setLocale("es")}
                className={cn(
                  "text-ui text-xs",
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
                  "text-ui text-xs",
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
      )}
    </header>
  );
}
