import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/locale";

/** Mobile-only sticky CTA bar matching law-firm reference pattern */
export function StickyMobileCta() {
  const { t } = useLocale();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:hidden">
      <div className="pointer-events-auto bg-brand px-0 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.55)]">
        <a
          href="#registro"
          className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-display text-[0.72rem] text-brand-foreground transition-colors active:bg-brand-dark"
        >
          {t.hero.clientCta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
