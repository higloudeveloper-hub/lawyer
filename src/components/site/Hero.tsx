import { ArrowRight, Phone, Scale, UserRound, Star } from "lucide-react";
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
        className="absolute inset-0 h-full w-full object-cover object-[82%_12%] opacity-90 contrast-[1.08] saturate-[1.08] sm:object-[75%_center] sm:opacity-95 md:object-[70%_center] md:opacity-100"
      />
      {/* Desktop: side wash keeps lawyer visible on the right */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,oklch(0.12_0.01_20/0.96)_0%,oklch(0.12_0.01_20/0.82)_38%,oklch(0.12_0.01_20/0.12)_64%,oklch(0.12_0.01_20/0.55)_100%)] md:block" />
      {/* Mobile: left text panel + soft bottom so lawyer stays on the right like the reference */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,oklch(0.1_0.01_20/0.92)_0%,oklch(0.1_0.01_20/0.72)_42%,oklch(0.1_0.01_20/0.18)_68%,oklch(0.1_0.01_20/0.45)_100%)] md:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent,oklch(0.1_0.01_20/0.88))] md:hidden" />

      <div className="relative mx-auto grid max-w-7xl gap-6 px-4 pb-6 pt-10 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-center lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-display text-[0.62rem] tracking-[0.28em] text-brand sm:text-xs sm:tracking-[0.3em]">
            {hero.label}
          </p>
          <h1 className="mt-3 text-display text-[1.85rem] leading-[1.06] text-brand-foreground sm:mt-4 sm:text-5xl lg:text-6xl">
            {hero.title}
            <span className="mt-1.5 block text-brand sm:mt-2">{hero.titleAccent}</span>
          </h1>
          <p className="mt-3 max-w-[20rem] text-[0.9rem] leading-relaxed text-brand-foreground/90 sm:mt-6 sm:max-w-md sm:text-base">
            {hero.subtitle}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <a
              href="#registro"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded bg-brand px-5 py-3.5 text-display text-[0.7rem] text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark sm:w-auto sm:gap-3 sm:px-7 sm:py-4 sm:text-sm"
            >
              <UserRound className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              <span className="min-w-0 text-center leading-tight">{hero.clientCta}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={t.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded border border-brand-foreground/35 bg-ink/50 px-5 py-3.5 text-display text-[0.7rem] text-brand-foreground backdrop-blur transition-colors hover:bg-brand-foreground/15 sm:hidden"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="min-w-0 text-center leading-tight">{hero.callCta}</span>
            </a>
            <a
              href="#registro"
              className="hidden w-full items-center justify-center gap-3 rounded border border-brand-foreground/30 bg-brand-foreground/5 px-7 py-4 text-display text-sm text-brand-foreground backdrop-blur transition-colors hover:bg-brand-foreground/15 sm:inline-flex sm:w-auto"
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

        {/* Desktop stats panel */}
        <Reveal
          delay={180}
          className="hidden w-full border border-brand/40 bg-ink/80 p-6 backdrop-blur sm:block lg:w-72"
        >
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
            {hero.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-display text-3xl text-brand">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-display text-[0.6rem] leading-snug tracking-wider text-brand-foreground/85">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile: single-row stats + Trustpilot (Harrison reference) */}
        <Reveal delay={120} className="w-full sm:hidden">
          <div className="rounded-sm bg-ink/70 px-1 py-4 backdrop-blur-sm">
            <div className="grid grid-cols-4 divide-x divide-brand-foreground/15">
              {hero.stats.map((s) => (
                <div key={s.label} className="px-1.5 text-center">
                  <p className="text-display text-[1.05rem] leading-none text-brand">
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-1.5 whitespace-pre-line text-display text-[0.42rem] leading-[1.15] tracking-wider text-brand-foreground/85">
                    {s.labelShort}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 border-t border-brand-foreground/10 pt-3 text-brand-foreground/85">
              <span className="flex items-center gap-1 text-display text-[0.58rem] text-emerald-400">
                <Star className="h-3 w-3 fill-current" /> {hero.ratingLabel}
              </span>
              <span className="flex gap-0.5 text-emerald-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
              <span className="text-display text-[0.75rem] text-brand-foreground">{hero.ratingScore}</span>
              <span className="text-[0.62rem] text-brand-foreground/75">{hero.ratingCount}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
