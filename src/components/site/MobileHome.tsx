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
  Users,
  Zap,
} from "lucide-react";
import portrait from "@/assets/lawyers/lawyer-2.jpg";
import { useLocale } from "@/lib/locale";

const statIcons = [Users, BadgeCheck, Clock3, Globe];
const areaIcons = [Scale, Heart, Shield, FileText];
const stepIcons = [FileText, BadgeCheck, Users, Zap];

export function MobileHome() {
  const { t } = useLocale();
  const { app } = t;

  return (
    <div className="overflow-x-hidden bg-[#f4f7fb] sm:hidden">
      <section id="inicio" className="relative isolate overflow-hidden px-4 pb-6 pt-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_20%,oklch(0.82_0.06_255/0.55),transparent_70%),linear-gradient(180deg,#eef3f9_0%,#f7f9fc_100%)]"
        />
        <div className="relative pr-[7.5rem]">
          <p className="text-kicker text-brand">{app.kicker}</p>
          <h1 className="mt-2 text-display text-[1.55rem] leading-[1.15] text-ink">
            {app.title}{" "}
            <span className="text-brand">{app.titleAccent}</span>
          </h1>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-muted-foreground">{app.text}</p>
        </div>

        <div className="pointer-events-none absolute -right-2 top-6 h-52 w-40">
          <img
            src={portrait}
            alt={app.photoAlt}
            className="h-full w-full object-cover object-[50%_18%] [mask-image:linear-gradient(180deg,black_70%,transparent)]"
          />
        </div>

        <div className="relative mt-4 max-w-[13.5rem] rounded-2xl bg-card px-3 py-2.5 shadow-panel ring-1 ring-border">
          <p className="flex items-center justify-between gap-2 text-[0.62rem] text-muted-foreground">
            <span>{app.liveAgo}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {app.liveNow}
            </span>
          </p>
          <p className="mt-1.5 text-[0.78rem] font-semibold text-foreground">{app.liveCase}</p>
          <p className="mt-0.5 text-[0.68rem] text-muted-foreground">{app.liveHidden}</p>
        </div>

        <div className="relative mt-5 grid gap-2.5">
          <a
            href="/registro"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand text-ui text-[0.92rem] text-brand-foreground"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            {app.start}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href={t.phoneHref} className="flex items-center justify-center gap-2 py-2 text-center">
            <Phone className="h-4 w-4 text-brand" strokeWidth={1.75} />
            <span>
              <span className="block text-ui text-[0.78rem] text-foreground">{app.talk}</span>
              <span className="block text-[0.65rem] text-muted-foreground">{app.talkSub}</span>
            </span>
          </a>
        </div>
      </section>

      <section className="px-4">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border shadow-panel ring-1 ring-border">
          {app.stats.map((item, i) => {
            const Icon = statIcons[i] ?? Users;
            return (
              <li key={item.label} className="bg-card px-3 py-4 text-center">
                <Icon className="mx-auto h-5 w-5 text-brand" strokeWidth={1.6} />
                <p className="mt-2 text-display text-[1.25rem] leading-none text-ink">{item.value}</p>
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
                  className="flex h-full flex-col items-center rounded-2xl bg-card px-3 py-4 text-center shadow-sm ring-1 ring-border"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <p className="mt-3 text-ui text-[0.86rem] text-foreground">{item.title}</p>
                  <p className="mt-1 text-[0.68rem] leading-snug text-muted-foreground">{item.text}</p>
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="/registro/cliente"
          className="mt-3 flex items-center justify-center rounded-2xl bg-card py-3 text-ui text-[0.8rem] text-brand ring-1 ring-border"
        >
          {app.moreAreas}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </a>
      </section>

      <section id="como-funciona" className="mt-8 bg-ink px-4 pb-6 pt-8">
        <span id="precios" className="sr-only" />
        <span id="contacto" className="sr-only" />
        <p className="text-center text-kicker text-brand">{app.howLabel}</p>
        <h2 className="mt-2 text-center text-display text-[1.45rem] leading-tight text-brand-foreground">
          {app.howTitle}
        </h2>
        <ol className="mt-6 grid grid-cols-2 gap-3">
          {app.howSteps.map((step, i) => {
            const Icon = stepIcons[i] ?? FileText;
            return (
              <li key={step.n} className="rounded-2xl bg-white/5 px-3 py-3.5">
                <span className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-[0.7rem] font-semibold text-brand-foreground">
                    {step.n}
                  </span>
                  <Icon className="h-4 w-4 text-brand" strokeWidth={1.6} />
                </span>
                <p className="mt-3 text-ui text-[0.8rem] leading-snug text-brand-foreground">{step.title}</p>
                <p className="mt-1 text-[0.68rem] leading-snug text-brand-foreground/65">{step.text}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 rounded-2xl bg-white/6 px-3 py-3.5">
          <p className="flex items-center gap-2 text-ui text-[0.78rem] text-brand-foreground">
            <Shield className="h-4 w-4 text-brand" strokeWidth={1.6} />
            {app.secureTitle}
          </p>
          <p className="mt-1.5 text-[0.7rem] leading-relaxed text-brand-foreground/65">{app.secureText}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {app.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-white/15 px-2 py-0.5 text-[0.58rem] font-semibold tracking-wide text-brand-foreground/80"
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
