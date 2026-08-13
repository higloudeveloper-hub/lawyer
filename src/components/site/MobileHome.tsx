import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Briefcase,
  Gavel,
  Globe,
  MapPin,
  MessageCircle,
  Scale,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-hall.jpg";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

const needIcons = [Globe, Scale, Users, Gavel, Briefcase, MessageCircle];
const cardLooks = [
  { crop: "object-[18%_center]", wash: "bg-ink/35" },
  { crop: "object-[55%_center]", wash: "bg-ink/45" },
  { crop: "object-[72%_20%]", wash: "bg-[oklch(0.28_0.04_40/0.4)]" },
  { crop: "object-[40%_70%]", wash: "bg-[oklch(0.26_0.05_255/0.45)]" },
];

export function MobileHome() {
  const { t } = useLocale();
  const { hero, app, live, audience } = t;
  const [zip, setZip] = useState("");
  const [error, setError] = useState(false);

  const go = (need?: string) => {
    const q = new URLSearchParams();
    if (zip.length === 5) q.set("zip", zip);
    if (need) q.set("need", need);
    window.location.assign(`/registro/cliente${q.toString() ? `?${q}` : ""}`);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (zip.length !== 5) {
      setError(true);
      return;
    }
    go();
  };

  return (
    <div className="sm:hidden">
      <section id="inicio" className="relative isolate h-40 overflow-hidden bg-ink">
        <img
          src={heroImage}
          alt={hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.23_0.055_255/0.5)_0%,oklch(0.23_0.055_255/0.84)_100%)]" />
        <div className="relative flex h-full flex-col justify-end px-4 pb-5">
          <p className="text-kicker text-brand-foreground/70">{hero.label}</p>
          <h1 className="mt-1 text-display text-[1.4rem] leading-tight text-brand-foreground">
            {hero.titleAccent}
          </h1>
        </div>
      </section>

      <div className="-mt-5 px-4">
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-panel ring-1 ring-border"
        >
          <MapPin className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
          <label className="sr-only" htmlFor="app-zip">
            {hero.zipLabel}
          </label>
          <input
            id="app-zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder={hero.zipPlaceholder}
            value={zip}
            onChange={(event) => {
              setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
              setError(false);
            }}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground"
            aria-label={hero.zipSearch}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className={cn("mt-2 px-1 text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {error ? hero.zipError : hero.zipHint}
        </p>
      </div>

      <section className="px-4 pt-6">
        <p className="text-ui text-[0.78rem] text-foreground">{hero.needPrompt}</p>
        <ul className="mt-3 grid grid-cols-2 gap-2.5">
          {hero.needs.map((item, i) => {
            const Icon = needIcons[i] ?? MessageCircle;
            return (
              <li key={item.need}>
                <button
                  type="button"
                  onClick={() => go(item.need)}
                  className="flex w-full flex-col items-start gap-3 rounded-2xl bg-card px-3.5 py-3.5 text-left ring-1 ring-border"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="text-ui text-[0.84rem] leading-snug text-foreground">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="abogados" className="px-4 pt-5">
        <a
          href="/registro/cliente"
          className="block overflow-hidden rounded-2xl bg-ink text-brand-foreground shadow-panel"
        >
          <span className="block px-4 pt-4">
            <span className="inline-flex rounded-full bg-brand px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-wide">
              {app.free}
            </span>
            <p className="mt-2 text-display text-[1.35rem] leading-tight">{app.featured}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-foreground/75">{app.featuredText}</p>
            <span className="mt-3 mb-4 inline-flex items-center gap-1.5 text-ui text-xs text-brand">
              {audience.clientCta}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </span>
        </a>
      </section>

      <section id="tablero" className="px-4 pb-5 pt-6">
        <span id="como-funciona" className="sr-only" />
        <span id="precios" className="sr-only" />
        <span id="contacto" className="sr-only" />
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-display text-[1.35rem] text-foreground">{app.near}</h2>
          <a href="/registro/cliente" className="text-ui text-[0.7rem] text-brand">
            {live.cta}
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-2.5">
          {live.items.map((item, i) => {
            const look = cardLooks[i] ?? cardLooks[0];
            return (
              <li key={item.title}>
                <a href="/registro/cliente" className="block overflow-hidden rounded-2xl bg-card ring-1 ring-border">
                  <div className="relative aspect-[5/3] overflow-hidden bg-ink">
                    <img
                      src={heroImage}
                      alt=""
                      className={cn("h-full w-full object-cover", look.crop)}
                    />
                    <div className={cn("absolute inset-0", look.wash)} />
                    <span className="absolute left-2 top-2 rounded-full bg-card px-2 py-0.5 text-[0.58rem] font-semibold text-foreground">
                      {item.area}
                    </span>
                  </div>
                  <div className="px-2.5 pb-2.5 pt-2">
                    <p className="line-clamp-2 min-h-[2.35rem] text-[0.8rem] font-semibold leading-snug text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1 truncate text-[0.68rem] text-muted-foreground">
                      {item.loc} · {live.hidden}
                    </p>
                    <p className="mt-0.5 text-[0.65rem] tabular-nums text-brand">{item.time}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
