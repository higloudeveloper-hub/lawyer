import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  CircleDollarSign,
  FileCheck2,
  Gavel,
  Globe,
  Handshake,
  HeartPulse,
  LaptopMinimal,
  Lock,
  MessageCircle,
  MessagesSquare,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRound,
  UserRoundCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { Counter, Reveal } from "./Reveal";
import { VerifyDemo } from "./VerifyDemo";
import { MatchLive } from "./MatchLive";
import { PulseDesk } from "./PulseDesk";
import { PartnerMarks } from "./PartnerMarks";

const trustIcons = [CircleDollarSign, Lock, UserRoundCheck, MessagesSquare, ShieldCheck];
const benefitIcons = [CircleDollarSign, Lock, ShieldCheck, Handshake];
const clientAudienceIcons = [MessageCircle, Handshake, CircleDollarSign, ShieldCheck];
const lawyerAudienceIcons = [LaptopMinimal, Scale, Wallet, Lock];
const panelIcons = [LaptopMinimal, FileCheck2, Handshake];

export function TrustStrip() {
  const { t } = useLocale();
  const { trust } = t;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-b border-border bg-background py-5 sm:py-8">
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <p
          className={cn(
            "hidden text-center text-kicker text-muted-foreground transition-[opacity,transform] duration-500 ease-out sm:block",
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          {trust.tagline}
        </p>
        <ul className="grid grid-cols-5 gap-0 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:divide-x lg:divide-border">
          {trust.items.map(({ lines }, i) => {
            const Icon = trustIcons[i] ?? ShieldCheck;
            return (
              <li
                key={lines.join()}
                style={{ transitionDelay: inView ? `${140 + i * 180}ms` : "0ms" }}
                className={cn(
                  "flex flex-col items-center gap-1.5 px-0.5 text-center transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:flex-row sm:justify-center sm:gap-3 sm:px-2 lg:text-left",
                  inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <Icon
                  className="h-[1.15rem] w-[1.15rem] shrink-0 text-brand sm:h-6 sm:w-6"
                  strokeWidth={1.75}
                />
                <span className="min-w-0 text-ui text-[0.55rem] leading-snug text-foreground sm:text-xs">
                  {lines[0]}
                  <br />
                  {lines[1]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ClientNeed() {
  const { t } = useLocale();
  const { need } = t;

  return (
    <section id={need.id} className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-kicker text-brand">{need.label}</p>
          <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
            {need.title}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-4">{need.text}</p>
        </Reveal>
        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5">
          {need.items.map((item, i) => (
            <Reveal as="li" key={item.need} delay={i * 90}>
              <a
                href={`/registro/cliente?need=${item.need}`}
                className="group flex h-full flex-col justify-between rounded border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-panel sm:p-7"
              >
                <div>
                  <h3 className="text-display text-lg leading-snug text-foreground sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
                <span className="mt-5 text-ui text-xs text-brand transition-transform duration-300 group-hover:translate-x-1">
                  {need.cta} →
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AudiencePaths() {
  const { t } = useLocale();
  const { audience } = t;

  return (
    <section id={audience.id} className="bg-surface py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:gap-8 sm:px-6 lg:grid-cols-2">
        <Reveal variant="left" className="rounded border border-brand/30 bg-ink p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
          <p className="text-kicker text-brand">
            {audience.clientLabel}
          </p>
          <h2 className="mt-2 text-display text-[1.65rem] leading-tight text-brand-foreground sm:mt-3 sm:text-3xl">
            {audience.clientTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-foreground/80 sm:mt-4">{audience.clientSub}</p>
          <ul className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
            {audience.clientCards.map((card, i) => {
              const Icon = clientAudienceIcons[i] ?? UserRound;
              return (
                <li key={card.title} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-display text-sm text-brand-foreground">{card.title}</h3>
                    <p className="mt-1 text-sm text-brand-foreground/75">{card.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <a
            href="/registro/cliente"
            className="mt-6 inline-flex w-full items-center justify-center rounded bg-brand px-6 py-3.5 text-ui text-xs text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark sm:mt-8 sm:w-auto"
          >
            {audience.clientCta}
          </a>
        </Reveal>

        <Reveal variant="right" delay={140} className="rounded border border-border bg-card p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
          <p className="text-kicker text-brand">
            {audience.lawyerLabel}
          </p>
          <h2 className="mt-2 text-display text-[1.65rem] leading-tight text-foreground sm:mt-3 sm:text-3xl">
            {audience.lawyerTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4">{audience.lawyerSub}</p>
          <ul className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
            {audience.lawyerCards.map((card, i) => {
              const Icon = lawyerAudienceIcons[i] ?? Scale;
              return (
                <li key={card.title} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-display text-sm text-brand">{card.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{card.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <a
            href="/registro/abogado"
            className="mt-6 inline-flex w-full items-center justify-center rounded border border-foreground/20 px-6 py-3.5 text-ui text-xs text-foreground transition-colors hover:bg-accent sm:mt-8 sm:w-auto"
          >
            {audience.lawyerCta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Benefits() {
  const { t } = useLocale();
  const { benefits } = t;

  return (
    <section id="beneficios" className="bg-background py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)]">
          <Reveal>
            <h2 className="text-display text-[1.7rem] leading-tight text-foreground sm:text-4xl">
              {benefits.title}{" "}
              <span className="text-brand">{benefits.titleLine2}</span>
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:mt-4">
              {benefits.text}
            </p>
          </Reveal>
          {/* Mobile: horizontal result-style cards */}
          <ul className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:gap-5 sm:overflow-visible sm:pb-0 sm:grid-cols-2 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {benefits.items.map(({ title, text }, i) => {
              const Icon = benefitIcons[i] ?? UserRound;
              return (
                <Reveal
                  as="li"
                  key={title}
                  delay={i * 110}
                  className="w-[72%] shrink-0 rounded border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-panel sm:w-auto sm:p-6 sm:text-center"
                >
                  <Icon className="mb-3 h-6 w-6 text-brand sm:mx-auto sm:mb-0 sm:h-8 sm:w-8 sm:text-foreground" strokeWidth={1.5} />
                  <h3 className="mt-1 text-display text-base text-brand sm:mt-4 sm:text-sm">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3">{text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <PartnerMarks />
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t } = useLocale();
  const { how } = t;
  const [tab, setTab] = useState<"client" | "lawyer">("client");
  const [lineOn, setLineOn] = useState(false);
  const stepsRef = useRef<HTMLOListElement | null>(null);
  const steps = tab === "client" ? how.clientSteps : how.lawyerSteps;

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLineOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="bg-ink py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-kicker text-brand-foreground/80">{how.label}</p>
        <Reveal>
          <h2 className="max-w-xl text-display text-[1.75rem] leading-tight text-brand-foreground sm:text-4xl">
            {how.title}
          </h2>
        </Reveal>

        <div className="mt-6 inline-flex w-full rounded bg-brand-foreground/15 p-1 sm:mt-8 sm:w-auto">
          <button
            type="button"
            onClick={() => setTab("client")}
            className={
              tab === "client"
                ? "flex-1 rounded bg-card px-5 py-2.5 text-ui text-xs text-foreground sm:flex-none"
                : "flex-1 rounded px-5 py-2.5 text-ui text-xs text-brand-foreground/80 transition-colors hover:text-brand-foreground sm:flex-none"
            }
          >
            {how.tabClient}
          </button>
          <button
            type="button"
            onClick={() => setTab("lawyer")}
            className={
              tab === "lawyer"
                ? "flex-1 rounded bg-card px-5 py-2.5 text-ui text-xs text-foreground sm:flex-none"
                : "flex-1 rounded px-5 py-2.5 text-ui text-xs text-brand-foreground/80 transition-colors hover:text-brand-foreground sm:flex-none"
            }
          >
            {how.tabLawyer}
          </button>
        </div>

        <ol ref={stepsRef} className="relative mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          <span
            aria-hidden
            className="pointer-events-none absolute top-[2.35rem] right-[16%] left-[16%] hidden h-px overflow-hidden md:block"
          >
            <span
              className={cn(
                "block h-full origin-left bg-brand/35 transition-transform duration-1000 ease-out",
                lineOn ? "scale-x-100" : "scale-x-0",
              )}
            />
          </span>
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={`${tab}-${s.n}`}
              delay={i * 140}
              variant={i === 0 ? "left" : i === 2 ? "right" : "up"}
              className="relative rounded-lg bg-card p-5 shadow-panel transition-transform duration-300 hover:-translate-y-1 sm:p-7"
            >
              <span className="text-display text-4xl text-brand">
                <Counter value={Number(s.n)} duration={900} pad={2} />
              </span>
              <h3 className="mt-4 text-display text-base text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <div id="panel" className="mt-14 grid gap-6 md:grid-cols-3">
          {how.panels.map(({ t: title, d }, i) => {
            const Icon = panelIcons[i] ?? LaptopMinimal;
            return (
              <Reveal key={title} delay={i * 110} className="flex gap-4">
                <span id={title === how.panels[2]?.t ? "soporte" : undefined} className="contents">
                  <Icon className="h-6 w-6 shrink-0 text-brand-foreground" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <h3 className="text-display text-sm text-brand-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-brand-foreground/80">{d}</p>
                  </div>
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const { t } = useLocale();
  const { pricing } = t;

  return (
    <section id="precios" className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <p className="text-kicker text-brand">{pricing.label}</p>
          <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:mt-3 sm:text-4xl">
            {pricing.title}
          </h2>
        </Reveal>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-12 sm:grid sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {pricing.plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 130}
              className={
                p.featured
                  ? "w-[85%] shrink-0 rounded border border-brand bg-ink p-6 shadow-brand transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:p-8"
                  : "w-[85%] shrink-0 rounded border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:p-8"
              }
            >
              <div className="flex items-center justify-between gap-3">
                <h3
                  className={
                    p.featured
                      ? "text-display text-sm text-brand-foreground"
                      : "text-display text-sm text-foreground"
                  }
                >
                  {p.name}
                </h3>
                {p.featured && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand px-3 py-1 text-kicker text-brand-foreground">
                    <Sparkles className="h-3 w-3" /> {pricing.popular}
                  </span>
                )}
              </div>
              <p
                className={
                  p.featured
                    ? "mt-6 text-display text-4xl text-brand"
                    : "mt-6 text-display text-4xl text-foreground"
                }
              >
                {p.price.startsWith("$") && p.price.slice(1).match(/^\d+$/) ? (
                  <Counter value={Number(p.price.slice(1))} prefix="$" duration={1200} />
                ) : (
                  p.price
                )}
              </p>
              <p
                className={
                  p.featured
                    ? "text-xs tracking-wider text-brand-foreground/70"
                    : "text-xs tracking-wider text-muted-foreground"
                }
              >
                {p.note}
              </p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={
                      p.featured
                        ? "flex gap-2 text-sm text-brand-foreground/80"
                        : "flex gap-2 text-sm text-muted-foreground"
                    }
                  >
                    <FileCheck2 className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={
                  p.role === "client"
                    ? "/registro/cliente"
                    : p.featured
                      ? "/registro/abogado"
                      : "#contacto"
                }
                className={
                  p.featured
                    ? "mt-8 block rounded bg-brand px-5 py-3 text-center text-ui text-xs text-brand-foreground transition-colors hover:bg-brand-dark"
                    : "mt-8 block rounded border border-foreground/20 px-5 py-3 text-center text-ui text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                }
              >
                {p.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Resources() {
  const { t } = useLocale();
  const { resources } = t;

  return (
    <section id="recursos" className="bg-surface py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-kicker text-brand">{resources.label}</p>
        <Reveal>
          <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:mt-3 sm:text-4xl">
            {resources.title}
          </h2>
        </Reveal>
        <div className="mt-8 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-12 sm:grid sm:gap-6 sm:overflow-visible sm:pb-0 md:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {resources.items.map((r, i) => (
            <Reveal key={r.title} delay={i * 120} className="w-[78%] shrink-0 sm:w-auto">
              <a
                href="/registro/cliente"
                className="group flex h-full flex-col justify-between rounded border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-panel sm:p-7"
              >
                <span className="text-kicker text-brand">{r.tag}</span>
                <h3 className="mt-4 text-display text-base leading-snug text-foreground">{r.title}</h3>
                <span className="mt-6 text-ui text-xs text-muted-foreground transition-colors group-hover:text-brand">
                  {resources.download}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const areaIcons = [Globe, Scale, Users, Gavel, Briefcase, HeartPulse];

export function PracticeAreas() {
  const { t } = useLocale();
  const { areas } = t;

  return (
    <section id="areas" className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-kicker text-brand">{areas.label}</p>
          <h2 className="mt-2 max-w-xl text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
            {areas.title}
          </h2>
        </Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {areas.items.map((item, i) => {
            const Icon = areaIcons[i] ?? Globe;
            return (
              <Reveal as="li" key={item.title} delay={i * 70}>
                <a
                  href={`/registro/cliente?need=${item.need}`}
                  className="flex h-full flex-col items-start rounded border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-panel sm:p-5"
                >
                  <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} />
                  <h3 className="mt-3 text-display text-sm text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.count}</p>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function PulseBand() {
  return <PulseDesk />;
}

export function VerificationBand() {
  return <VerifyDemo />;
}

export function LiveCases() {
  return <MatchLive />;
}
