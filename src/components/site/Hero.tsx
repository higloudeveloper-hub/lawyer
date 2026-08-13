import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-hall.jpg";
import { useLocale } from "@/lib/locale";
import { useLiveCount } from "@/lib/live-count";
import { cn } from "@/lib/utils";
import { Counter, Reveal } from "./Reveal";
import { TrustpilotRating } from "./Trustpilot";

export function Hero() {
  const { t } = useLocale();
  const { hero } = t;

  return (
    <section id="inicio" className="relative isolate min-h-[calc(100svh-7.25rem)] overflow-hidden bg-ink sm:min-h-[36rem] lg:min-h-[40rem]">
      <img
        src={heroImage}
        alt={hero.imageAlt}
        width={1408}
        height={792}
        className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.23_0.055_255/0.92)_0%,oklch(0.23_0.055_255/0.62)_40%,oklch(0.23_0.04_255/0.18)_68%,oklch(0.23_0.04_255/0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,oklch(0.23_0.055_255/0.4))] md:hidden" />

      <div className="relative mx-auto grid max-w-7xl gap-6 px-4 pb-6 pt-8 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-center lg:py-28">
        <Reveal className="max-w-3xl">
          <p className="text-kicker text-brand-foreground/70">
            {hero.label}
          </p>
          <h1 className="mt-3 text-display leading-[1.12] text-brand-foreground sm:mt-4">
            <span className="block whitespace-nowrap text-[clamp(1.2rem,3.4vw+0.55rem,2.85rem)]">
              {hero.title}
            </span>
            <span className="mt-1 block text-[clamp(1.2rem,3.4vw+0.55rem,2.85rem)] sm:mt-1.5">
              {hero.titleAccent}
            </span>
          </h1>
          <p className="mt-3 max-w-[22rem] text-[0.95rem] leading-7 text-brand-foreground/92 sm:mt-6 sm:max-w-md sm:text-lg sm:leading-8">
            {hero.subtitle}
          </p>

          <LiveOnline clientsLabel={hero.onlineClients} prosLabel={hero.onlinePros} />

          <ZipSearch />

          <div className="mt-8 hidden items-center gap-4 sm:flex">
            <TrustpilotRating score={hero.ratingScore} count={hero.ratingCount} />
            <span className="text-brand-foreground/30">·</span>
            <a
              href="/registro/abogado"
              className="text-ui text-[0.75rem] text-brand-foreground/65 transition-colors hover:text-brand-foreground"
            >
              {hero.lawyerCta}
            </a>
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
                  <p className="mt-1.5 whitespace-pre-line text-ui text-[0.58rem] leading-snug text-brand-foreground/85">
                    {s.labelShort}
                  </p>
                </div>
              ))}
            </div>
            <TrustpilotRating
              size="sm"
              score={hero.ratingScore}
              count={hero.ratingCount}
              className="mt-3.5 justify-center border-t border-brand-foreground/10 pt-3"
            />
          </div>
        </Reveal>

        <Reveal
          delay={180}
          className="hidden w-full rounded-lg border border-border bg-card p-6 shadow-panel sm:block lg:w-72"
        >
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
            {hero.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-display text-3xl text-foreground">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-ui text-[0.7rem] leading-snug text-muted-foreground">
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

function LiveDot() {
  return (
    <span className="relative grid h-1.5 w-1.5 place-items-center">
      <span className="absolute inset-0 rounded-full bg-emerald-400/70 animate-livepulse" />
      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </span>
  );
}

function LiveCount({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LiveDot />
      <span key={value} className="animate-onlineflick tabular-nums text-brand-foreground">
        {value.toLocaleString("en-US")}
      </span>
      {label}
    </span>
  );
}

function LiveOnline({ clientsLabel, prosLabel }: { clientsLabel: string; prosLabel: string }) {
  const clients = useLiveCount("clients");
  const pros = useLiveCount("lawyers");

  return (
    <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-ui text-[0.75rem] text-brand-foreground/75 sm:mt-6">
      <LiveCount value={clients} label={clientsLabel} />
      <span className="text-brand-foreground/30">·</span>
      <LiveCount value={pros} label={prosLabel} />
    </p>
  );
}

function ZipSearch() {
  const { t } = useLocale();
  const { hero } = t;
  const [zip, setZip] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (zip.length !== 5) {
      setError(true);
      return;
    }
    window.location.assign(`/registro/cliente?zip=${zip}`);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-md sm:mt-8">
      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded bg-card shadow-panel ring-1 ring-transparent transition-[box-shadow,ring-color]",
          error ? "ring-destructive/50" : "focus-within:ring-brand/35",
        )}
      >
        <label className="sr-only" htmlFor="hero-zip">
          {hero.zipLabel}
        </label>
        <input
          id="hero-zip"
          name="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder={hero.zipPlaceholder}
          value={zip}
          onChange={(event) => {
            setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
            setError(false);
          }}
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-ui text-base tracking-[0.12em] text-foreground outline-none placeholder:tracking-normal placeholder:text-muted-foreground sm:px-5 sm:py-4 sm:text-sm"
        />
        <button
          type="submit"
          className="inline-flex min-h-12 shrink-0 items-center gap-1.5 bg-brand px-4 text-ui text-[0.8rem] text-brand-foreground transition-colors hover:bg-brand-dark sm:min-h-0 sm:px-5 sm:text-[0.75rem]"
        >
          {hero.zipSearch}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className={cn("mt-2.5 text-xs", error ? "text-red-300" : "text-brand-foreground/70")}>
        {error ? hero.zipError : hero.zipHint}
      </p>
      <p className="mt-4 text-kicker text-brand-foreground/55">{hero.needPrompt}</p>
      <div className="-mx-1 mt-2.5 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {hero.needs.map((item) => (
          <a
            key={item.need}
            href={
              zip.length === 5
                ? `/registro/cliente?zip=${zip}&need=${item.need}`
                : `/registro/cliente?need=${item.need}`
            }
            className="shrink-0 rounded-full border border-brand-foreground/20 bg-brand-foreground/8 px-3.5 py-2 text-ui text-[0.7rem] text-brand-foreground/90 transition-colors hover:border-brand-foreground/45 hover:bg-brand-foreground/12"
          >
            {item.label}
          </a>
        ))}
      </div>
    </form>
  );
}
