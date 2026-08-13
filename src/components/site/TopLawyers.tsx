import { EyeOff, Lock, PenLine } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { Reveal } from "./Reveal";

export function TopLawyers() {
  const { t } = useLocale();
  const { privacy } = t;

  return (
    <section id="abogados" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-kicker text-brand">{privacy.label}</p>
          <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
            {privacy.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{privacy.text}</p>
        </Reveal>

        <div className="relative mt-10 grid gap-4 sm:mt-14 lg:grid-cols-2 lg:gap-6">
          <Reveal variant="left" className="rounded border border-border bg-card p-5 shadow-panel sm:p-7">
            <p className="flex items-center gap-2 text-kicker text-brand">
              <PenLine className="h-3.5 w-3.5" strokeWidth={1.75} />
              {privacy.youLabel}
            </p>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-[0.65rem] tracking-wide text-muted-foreground">{privacy.name}</dt>
                <dd className="mt-1 text-sm text-foreground">{privacy.youName}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] tracking-wide text-muted-foreground">{privacy.phone}</dt>
                <dd className="mt-1 text-sm text-foreground">{privacy.youPhone}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] tracking-wide text-muted-foreground">{privacy.matter}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-foreground">{privacy.youMatter}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] tracking-wide text-muted-foreground">{privacy.city}</dt>
                <dd className="mt-1 text-sm text-foreground">{privacy.youCity}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal variant="right" delay={120} className="relative rounded border border-border bg-ink p-5 sm:p-7">
            <p className="flex items-center gap-2 text-kicker text-brand">
              <EyeOff className="h-3.5 w-3.5" strokeWidth={1.75} />
              {privacy.themLabel}
            </p>
            <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded border border-brand/40 px-2 py-1 text-[0.6rem] font-semibold tracking-wider text-brand">
              <Lock className="h-3 w-3" strokeWidth={2} />
              {privacy.stamp}
            </span>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-[0.65rem] tracking-wide text-brand-foreground/50">{privacy.name}</dt>
                <dd className="mt-1 select-none text-sm tracking-[0.18em] text-brand-foreground/35">{privacy.themName}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] tracking-wide text-brand-foreground/50">{privacy.phone}</dt>
                <dd className="mt-1 select-none text-sm tracking-[0.18em] text-brand-foreground/35">{privacy.themPhone}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] tracking-wide text-brand-foreground/50">{privacy.matter}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-brand-foreground">{privacy.youMatter}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] tracking-wide text-brand-foreground/50">{privacy.city}</dt>
                <dd className="mt-1 text-sm text-brand-foreground">{privacy.youCity}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <a
          href="/registro/cliente"
          className="mt-8 inline-flex rounded bg-brand px-5 py-3 text-ui text-xs text-brand-foreground transition-colors hover:bg-brand-dark"
        >
          {privacy.cta} →
        </a>
      </div>
    </section>
  );
}
