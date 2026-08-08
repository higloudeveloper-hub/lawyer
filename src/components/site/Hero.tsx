import { ArrowRight, Scale, UserRound, Star } from "lucide-react";
import heroImage from "@/assets/hero-lawyer.jpg";
import { useLocale } from "@/lib/locale";
import { Counter, Reveal } from "./Reveal";

export function Hero() {
  const { t } = useLocale();
  const { hero } = t;

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-ink">
      <img
        src={heroImage}
        alt={hero.imageAlt}
        width={1408}
        height={1008}
        className="absolute inset-0 h-full w-full object-cover object-[68%_18%] opacity-75 contrast-[1.08] saturate-[1.1] sm:object-[70%_center] sm:opacity-90 md:opacity-100"
      />
      {/* Desktop side gradient */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,oklch(0.12_0.01_20/0.96)_0%,oklch(0.12_0.01_20/0.82)_38%,oklch(0.12_0.01_20/0.12)_64%,oklch(0.12_0.01_20/0.55)_100%)] md:block" />
      {/* Mobile bottom-up cinematic wash (reference-style) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.12_0.01_20/0.55)_0%,oklch(0.12_0.01_20/0.35)_28%,oklch(0.12_0.01_20/0.78)_62%,oklch(0.1_0.01_20/0.96)_100%)] md:hidden" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-center lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-display text-[0.65rem] tracking-[0.28em] text-brand sm:text-xs sm:tracking-[0.3em]">
            {hero.label}
          </p>
          <h1 className="mt-3 text-display text-[2.05rem] leading-[1.05] text-brand-foreground sm:mt-4 sm:text-5xl lg:text-6xl">
            {hero.title}
            <span className="mt-1.5 block text-brand sm:mt-2">{hero.titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-brand-foreground/90 sm:mt-6 sm:text-base">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a
              href="#registro"
              className="group inline-flex w-full items-center justify-center gap-3 rounded bg-brand px-6 py-4 text-display text-[0.72rem] text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark sm:w-auto sm:px-7 sm:text-sm"
            >
              <UserRound className="h-5 w-5 shrink-0" />
              <span className="min-w-0 text-center leading-tight">{hero.clientCta}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#registro"
              className="inline-flex w-full items-center justify-center gap-3 rounded border border-brand-foreground/30 bg-brand-foreground/5 px-6 py-4 text-display text-[0.72rem] text-brand-foreground backdrop-blur transition-colors hover:bg-brand-foreground/15 sm:w-auto sm:px-7 sm:text-sm"
            >
              <Scale className="h-4 w-4 shrink-0" />
              <span className="min-w-0 text-center leading-tight">{hero.lawyerCta}</span>
            </a>
          </div>

          {/* Desktop Trustpilot under CTAs */}
          <div className="mt-8 hidden flex-wrap items-center gap-3 text-sm text-brand-foreground/85 sm:flex">
            <span className="flex items-center gap-1.5 text-display text-xs text-emerald-400">
              <Star className="h-3.5 w-3.5 fill-current" /> {hero.ratingLabel}
            </span>
            <span className="flex gap-0.5 text-emerald-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="text-display text-sm text-brand-foreground">{hero.ratingScore}</span>
            <span className="text-xs">{hero.ratingCount}</span>
          </div>
        </Reveal>

        {/* Stats: flat 2x2 on mobile (reference), panel on desktop */}
        <Reveal
          delay={180}
          className="w-full border-t border-brand-foreground/15 pt-6 sm:border sm:border-brand/40 sm:bg-ink/80 sm:p-6 sm:pt-6 sm:backdrop-blur lg:w-72 lg:border-t-brand/40"
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-6 lg:grid-cols-1">
            {hero.stats.map((s) => (
              <div key={s.label} className="text-center sm:text-center">
                <p className="text-display text-[1.65rem] text-brand sm:text-3xl">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-display text-[0.55rem] leading-snug tracking-wider text-brand-foreground/85 sm:text-[0.6rem]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Trustpilot under stats */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-brand-foreground/10 pt-4 text-sm text-brand-foreground/85 sm:hidden">
            <span className="flex items-center gap-1.5 text-display text-[0.65rem] text-emerald-400">
              <Star className="h-3.5 w-3.5 fill-current" /> {hero.ratingLabel}
            </span>
            <span className="flex gap-0.5 text-emerald-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-display text-sm text-brand-foreground">{hero.ratingScore}</span>
            <span className="text-[0.7rem] text-brand-foreground/75">{hero.ratingCount}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
