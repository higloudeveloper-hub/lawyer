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
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-80 contrast-[1.08] saturate-[1.1] md:opacity-100"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.12_0.01_20/0.96)_0%,oklch(0.12_0.01_20/0.82)_38%,oklch(0.12_0.01_20/0.12)_64%,oklch(0.12_0.01_20/0.55)_100%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-center lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-display text-xs tracking-[0.3em] text-brand">{hero.label}</p>
          <h1 className="mt-4 text-display text-4xl leading-[1.05] text-brand-foreground sm:text-5xl lg:text-6xl">
            {hero.title}
            <span className="mt-2 block text-brand">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-brand-foreground/90">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#registro"
              className="group inline-flex items-center justify-center gap-3 rounded bg-brand px-7 py-4 text-display text-sm text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark"
            >
              <UserRound className="h-5 w-5" />
              {hero.clientCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#registro"
              className="inline-flex items-center justify-center gap-3 rounded border border-brand-foreground/30 bg-brand-foreground/5 px-7 py-4 text-display text-sm text-brand-foreground backdrop-blur transition-colors hover:bg-brand-foreground/15"
            >
              <Scale className="h-4 w-4" />
              {hero.lawyerCta}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-brand-foreground/85">
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

        <Reveal delay={180} className="w-full border border-brand/40 bg-ink/80 p-6 backdrop-blur lg:w-72">
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
      </div>
    </section>
  );
}
