import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  FileText,
  Globe,
  Heart,
  Phone,
  Scale,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import portrait from "@/assets/lawyers/lawyer-2.jpg";
import { useLocale } from "@/lib/locale";
import { useLiveCount } from "@/lib/live-count";

const statIcons = [Users, BadgeCheck, Clock3, Globe];
const areaIcons = [Scale, Heart, Shield, FileText];
const stepIcons = [FileText, BadgeCheck, Users, Zap];

export function MobileHome() {
  const { t } = useLocale();
  const { app, hero } = t;
  const clients = useLiveCount("clients");
  const lawyers = useLiveCount("lawyers");
  const [secs, setSecs] = useState(3);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecs((n) => (n >= 11 ? 2 : n + 1));
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#eef3f9] sm:hidden">
      <section id="inicio" className="relative isolate overflow-hidden px-4 pb-7 pt-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_88%_8%,oklch(0.78_0.08_255/0.55),transparent_58%),linear-gradient(180deg,#e8eef8_0%,#f6f8fb_72%)]"
        />
        <div className="relative grid grid-cols-[1fr_7.6rem] gap-3">
          <div className="m-rise min-w-0">
            <p className="text-kicker text-brand">{app.kicker}</p>
            <h1 className="mt-2 text-display text-[1.62rem] leading-[1.12] text-ink">
              {app.title}{" "}
              <span className="text-brand">{app.titleAccent}</span>
            </h1>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-muted-foreground">{app.text}</p>
            <p className="mt-3 flex items-center gap-1.5 text-[0.7rem] text-foreground">
              <Star className="h-3.5 w-3.5 fill-brand text-brand" />
              <span className="tabular-nums font-semibold">{hero.ratingScore}</span>
              <span className="text-muted-foreground">{hero.ratingCount}</span>
            </p>
          </div>
          <div className="relative h-[13.5rem]">
            <span
              aria-hidden
              className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,oklch(0.47_0.15_255/0.28),transparent_68%)]"
            />
            <img
              src={portrait}
              alt={app.photoAlt}
              className="relative h-full w-full object-cover object-[50%_12%] [mask-image:linear-gradient(180deg,black_62%,transparent)]"
            />
          </div>
        </div>

        <div className="m-rise relative z-10 -mt-8 max-w-[15.5rem] rounded-2xl bg-card/95 px-3 py-2.5 shadow-panel ring-1 ring-border backdrop-blur-md">
          <p className="flex items-center justify-between gap-2 text-[0.62rem] text-muted-foreground">
            <span>{app.liveAgo.replace(/\d+/, String(secs))}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-red-600">
              <span className="relative grid h-1.5 w-1.5 place-items-center">
                <span className="absolute inset-0 rounded-full bg-red-400/70 animate-livepulse" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-red-500" />
              </span>
              {app.liveNow}
            </span>
          </p>
          <p className="mt-1.5 text-[0.8rem] font-semibold text-foreground">{app.liveCase}</p>
          <p className="mt-0.5 text-[0.68rem] text-muted-foreground">{app.liveHidden}</p>
        </div>

        <div className="relative mt-5 grid gap-3">
          <a
            href="/registro"
            className="animate-ctapulse flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand text-ui text-[0.95rem] text-brand-foreground shadow-[0_12px_28px_-12px_oklch(0.47_0.15_255/0.7)]"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            {app.start}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href={t.phoneHref} className="flex items-center justify-center gap-2 rounded-2xl bg-card py-3 ring-1 ring-border">
            <Phone className="h-4 w-4 text-brand" strokeWidth={1.75} />
            <span>
              <span className="block text-ui text-[0.8rem] text-foreground">{app.talk}</span>
              <span className="block text-[0.65rem] text-muted-foreground">{app.talkSub}</span>
            </span>
          </a>
          <p className="flex items-center justify-center gap-3 text-[0.68rem] text-muted-foreground">
            <span>
              <span key={clients} className="animate-onlineflick tabular-nums font-semibold text-foreground">
                {clients.toLocaleString("en-US")}
              </span>{" "}
              {hero.onlineClients}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>
              <span key={lawyers} className="animate-onlineflick tabular-nums font-semibold text-foreground">
                {lawyers.toLocaleString("en-US")}
              </span>{" "}
              {hero.onlinePros}
            </span>
          </p>
        </div>
      </section>

      <section className="px-4">
        <ul className="grid grid-cols-2 gap-2.5">
          {app.stats.map((item, i) => {
            const Icon = statIcons[i] ?? Users;
            return (
              <li key={item.label} className="rounded-3xl bg-card px-3 py-4 text-center shadow-sm ring-1 ring-border">
                <span className="mx-auto grid h-9 w-9 place-items-center rounded-2xl bg-accent text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <p className="mt-2.5 text-display text-[1.35rem] leading-none text-ink">{item.value}</p>
                <p className="mt-1.5 text-[0.68rem] leading-snug text-muted-foreground">{item.label}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="abogados" className="px-4 pt-7">
        <ul className="grid grid-cols-2 gap-3">
          {app.areas.map((item, i) => {
            const Icon = areaIcons[i] ?? Scale;
            return (
              <li key={item.title}>
                <a
                  href={`/registro/cliente?need=${item.need}`}
                  className="flex h-full flex-col items-center rounded-3xl bg-card px-3 py-5 text-center shadow-sm ring-1 ring-border active:scale-[0.98]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[oklch(0.47_0.15_255/0.1)] text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <p className="mt-3 text-ui text-[0.9rem] text-foreground">{item.title}</p>
                  <p className="mt-1 text-[0.68rem] leading-snug text-muted-foreground">{item.text}</p>
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="/registro/cliente"
          className="mt-3 flex items-center justify-center rounded-2xl bg-card py-3.5 text-ui text-[0.8rem] text-brand ring-1 ring-border"
        >
          {app.moreAreas}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </a>
      </section>

      <section id="como-funciona" className="relative mt-8 overflow-hidden bg-ink px-4 pb-7 pt-9">
        <span id="precios" className="sr-only" />
        <span id="contacto" className="sr-only" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-brand/25 blur-3xl"
        />
        <p className="relative text-center text-kicker text-brand">{app.howLabel}</p>
        <h2 className="relative mt-2 text-center text-display text-[1.5rem] leading-tight text-brand-foreground">
          {app.howTitle}
        </h2>
        <ol className="relative mt-6 grid grid-cols-2 gap-3">
          {app.howSteps.map((step, i) => {
            const Icon = stepIcons[i] ?? FileText;
            return (
              <li key={step.n} className="rounded-3xl bg-white/6 px-3.5 py-4 ring-1 ring-white/8">
                <span className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-[0.72rem] font-semibold text-brand-foreground">
                    {step.n}
                  </span>
                  <Icon className="h-4 w-4 text-brand" strokeWidth={1.6} />
                </span>
                <p className="mt-3 text-ui text-[0.82rem] leading-snug text-brand-foreground">{step.title}</p>
                <p className="mt-1 text-[0.68rem] leading-snug text-brand-foreground/65">{step.text}</p>
              </li>
            );
          })}
        </ol>
        <div className="relative mt-6 rounded-3xl bg-white/6 px-4 py-4 ring-1 ring-white/8">
          <p className="flex items-center gap-2 text-ui text-[0.8rem] text-brand-foreground">
            <Shield className="h-4 w-4 text-brand" strokeWidth={1.6} />
            {app.secureTitle}
          </p>
          <p className="mt-1.5 text-[0.72rem] leading-relaxed text-brand-foreground/65">{app.secureText}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {app.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.58rem] font-semibold tracking-wide text-brand-foreground/85"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
