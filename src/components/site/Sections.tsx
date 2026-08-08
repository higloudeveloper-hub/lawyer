import { useState } from "react";
import {
  BarChart3,
  CircleDollarSign,
  FileCheck2,
  Handshake,
  LaptopMinimal,
  Lock,
  MessageCircle,
  MessagesSquare,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRound,
  UserRoundCheck,
  Wallet,
} from "lucide-react";
import { useLocale } from "@/lib/locale";
import { Counter, Reveal } from "./Reveal";

const trustIcons = [ShieldCheck, UserRoundCheck, LaptopMinimal, MessagesSquare, CircleDollarSign];
const benefitIcons = [UserRound, MessageCircle, ShieldCheck, BarChart3];
const clientAudienceIcons = [MessageCircle, Handshake, CircleDollarSign, ShieldCheck];
const lawyerAudienceIcons = [LaptopMinimal, Scale, Wallet, Lock];
const panelIcons = [LaptopMinimal, FileCheck2, Handshake];

export function TrustStrip() {
  const { t } = useLocale();
  const { trust } = t;

  return (
    <section className="bg-ink-soft py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-0 sm:px-6">
        <p className="px-4 text-center text-display text-[0.7rem] tracking-[0.2em] text-brand-foreground sm:px-0 sm:text-sm">
          {trust.tagline}
        </p>
        {/* Mobile: horizontal icon strip like reference */}
        <ul className="mt-5 flex gap-1 overflow-x-auto px-3 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 lg:divide-x lg:divide-brand-foreground/15 [&::-webkit-scrollbar]:hidden">
          {trust.items.map(({ lines }, i) => {
            const Icon = trustIcons[i] ?? ShieldCheck;
            return (
              <Reveal
                as="li"
                key={lines.join()}
                delay={i * 90}
                className="flex w-[4.75rem] shrink-0 flex-col items-center gap-2 px-1 text-center sm:w-auto sm:flex-row sm:justify-center sm:gap-3 sm:px-2 lg:text-left"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand-foreground/85 sm:h-6 sm:w-6" strokeWidth={1.5} />
                <span className="min-w-0 text-display text-[0.52rem] leading-snug tracking-wider text-brand-foreground/85 sm:text-[0.65rem]">
                  {lines[0]}
                  <br />
                  {lines[1]}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function AudiencePaths() {
  const { t } = useLocale();
  const { audience } = t;

  return (
    <section id={audience.id} className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:gap-8 sm:px-6 lg:grid-cols-2">
        <Reveal className="rounded border border-border bg-surface p-5 sm:p-8">
          <p className="text-display text-[0.65rem] tracking-[0.3em] text-brand sm:text-xs">
            {audience.clientLabel}
          </p>
          <h2 className="mt-2 text-display text-[1.65rem] leading-tight text-foreground sm:mt-3 sm:text-3xl">
            {audience.clientTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4">{audience.clientSub}</p>
          <ul className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
            {audience.clientCards.map((card, i) => {
              const Icon = clientAudienceIcons[i] ?? UserRound;
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
            href="#registro"
            className="mt-6 inline-flex w-full items-center justify-center rounded bg-brand px-6 py-3.5 text-display text-xs text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark sm:mt-8 sm:w-auto"
          >
            {audience.clientCta}
          </a>
        </Reveal>

        <Reveal delay={120} className="rounded border border-brand/30 bg-ink p-5 sm:p-8">
          <p className="text-display text-[0.65rem] tracking-[0.3em] text-brand sm:text-xs">
            {audience.lawyerLabel}
          </p>
          <h2 className="mt-2 text-display text-[1.65rem] leading-tight text-brand-foreground sm:mt-3 sm:text-3xl">
            {audience.lawyerTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-foreground/85 sm:mt-4">{audience.lawyerSub}</p>
          <ul className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
            {audience.lawyerCards.map((card, i) => {
              const Icon = lawyerAudienceIcons[i] ?? Scale;
              return (
                <li key={card.title} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-display text-sm text-brand-foreground">{card.title}</h3>
                    <p className="mt-1 text-sm text-brand-foreground/80">{card.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <a
            href="#registro"
            className="mt-6 inline-flex w-full items-center justify-center rounded border border-brand-foreground/25 px-6 py-3.5 text-display text-xs text-brand-foreground transition-colors hover:bg-brand-foreground/10 sm:mt-8 sm:w-auto"
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
    <section id="beneficios" className="bg-surface py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)]">
          <Reveal>
            <h2 className="text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
              {benefits.title}
              <br />
              {benefits.titleLine2}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:mt-4">
              {benefits.text}
            </p>
          </Reveal>
          {/* Mobile: horizontal scroll cards like reference "Real Results" */}
          <ul className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:gap-5 sm:overflow-visible sm:pb-0 sm:grid-cols-2 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {benefits.items.map(({ title, text }, i) => {
              const Icon = benefitIcons[i] ?? UserRound;
              return (
                <Reveal
                  as="li"
                  key={title}
                  delay={i * 110}
                  className="w-[78%] shrink-0 rounded border border-border bg-card p-5 text-center hover:shadow-panel sm:w-auto sm:p-6"
                >
                  <Icon className="mx-auto h-8 w-8 text-foreground" strokeWidth={1.5} />
                  <h3 className="mt-4 text-display text-sm text-brand">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-border pt-8">
          <span className="text-display text-[0.6rem] tracking-[0.2em] text-muted-foreground">
            {benefits.partnersLabel}
          </span>
          {benefits.partners.map((p) => (
            <span key={p} className="text-display text-sm text-foreground/80">
              {p}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t } = useLocale();
  const { how } = t;
  const [tab, setTab] = useState<"client" | "lawyer">("client");
  const steps = tab === "client" ? how.clientSteps : how.lawyerSteps;

  return (
    <section id="como-funciona" className="bg-gradient-ink py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-display text-[0.65rem] tracking-[0.3em] text-brand sm:text-xs">{how.label}</p>
        <Reveal>
          <h2 className="max-w-xl text-display text-[1.75rem] leading-tight text-brand-foreground sm:text-4xl">
            {how.title}
          </h2>
        </Reveal>

        <div className="mt-6 inline-flex w-full rounded border border-brand-foreground/20 p-1 sm:mt-8 sm:w-auto">
          <button
            type="button"
            onClick={() => setTab("client")}
            className={
              tab === "client"
                ? "flex-1 rounded bg-brand px-5 py-2.5 text-display text-xs text-brand-foreground sm:flex-none"
                : "flex-1 rounded px-5 py-2.5 text-display text-xs text-brand-foreground/75 transition-colors hover:text-brand-foreground sm:flex-none"
            }
          >
            {how.tabClient}
          </button>
          <button
            type="button"
            onClick={() => setTab("lawyer")}
            className={
              tab === "lawyer"
                ? "flex-1 rounded bg-brand px-5 py-2.5 text-display text-xs text-brand-foreground sm:flex-none"
                : "flex-1 rounded px-5 py-2.5 text-display text-xs text-brand-foreground/75 transition-colors hover:text-brand-foreground sm:flex-none"
            }
          >
            {how.tabLawyer}
          </button>
        </div>

        <ol className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={`${tab}-${s.n}`}
              delay={i * 130}
              className="relative rounded border border-brand-foreground/12 bg-brand-foreground/[0.04] p-5 sm:p-7"
            >
              <span className="text-display text-4xl text-brand">
                <Counter value={Number(s.n)} duration={900} pad={2} />
              </span>
              <h3 className="mt-4 text-display text-base text-brand-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-foreground/85">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <div id="panel" className="mt-14 grid gap-6 md:grid-cols-3">
          {how.panels.map(({ t: title, d }, i) => {
            const Icon = panelIcons[i] ?? LaptopMinimal;
            return (
              <Reveal key={title} delay={i * 110} className="flex gap-4">
                <span id={title === how.panels[2]?.t ? "soporte" : undefined} className="contents">
                  <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <h3 className="text-display text-sm text-brand-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-brand-foreground/85">{d}</p>
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
          <p className="text-display text-[0.65rem] tracking-[0.3em] text-brand sm:text-xs">{pricing.label}</p>
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
                  ? "w-[85%] shrink-0 rounded border border-brand bg-ink p-6 shadow-brand sm:w-auto sm:p-8"
                  : "w-[85%] shrink-0 rounded border border-border bg-card p-6 sm:w-auto sm:p-8"
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
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand px-3 py-1 text-display text-[0.6rem] text-brand-foreground">
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
                    ? "text-xs tracking-wider text-brand-foreground/80"
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
                href="#registro"
                className={
                  p.featured
                    ? "mt-8 block rounded bg-brand px-5 py-3 text-center text-display text-xs text-brand-foreground transition-colors hover:bg-brand-dark"
                    : "mt-8 block rounded border border-foreground/20 px-5 py-3 text-center text-display text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
        <p className="text-display text-[0.65rem] tracking-[0.3em] text-brand sm:text-xs">{resources.label}</p>
        <Reveal>
          <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:mt-3 sm:text-4xl">
            {resources.title}
          </h2>
        </Reveal>
        <div className="mt-8 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-12 sm:grid sm:gap-6 sm:overflow-visible sm:pb-0 md:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {resources.items.map((r, i) => (
            <Reveal key={r.title} delay={i * 120} className="w-[78%] shrink-0 sm:w-auto">
              <a
                href="#contacto"
                className="group flex h-full flex-col justify-between rounded border border-border bg-card p-5 transition-shadow hover:shadow-panel sm:p-7"
              >
                <span className="text-display text-[0.6rem] tracking-[0.2em] text-brand">{r.tag}</span>
                <h3 className="mt-4 text-display text-base leading-snug text-foreground">{r.title}</h3>
                <span className="mt-6 text-display text-[0.65rem] text-muted-foreground transition-colors group-hover:text-brand">
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

export function ContactCta() {
  const { t } = useLocale();
  const { contact } = t;
  const [role, setRole] = useState<"client" | "lawyer">("client");

  return (
    <section id="contacto" className="bg-ink py-12 sm:py-16 lg:py-24">
      <div
        id="registro"
        className="mx-auto grid max-w-7xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:items-center"
      >
        <Reveal>
          <p className="text-display text-[0.65rem] tracking-[0.3em] text-brand sm:text-xs">{contact.label}</p>
          <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-brand-foreground sm:mt-3 sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-foreground/85 sm:mt-5">
            {contact.text}
          </p>
          <a
            href={t.phoneHref}
            className="mt-8 inline-flex items-center gap-3 text-display text-xl text-brand-foreground"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand">
              <MessageCircle className="h-5 w-5 text-brand-foreground" />
            </span>
            {t.phone}
          </a>
        </Reveal>

        <Reveal delay={160}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded border border-brand-foreground/12 bg-brand-foreground/[0.04] p-5 sm:p-7"
          >
            <div className="mb-5 inline-flex rounded border border-brand-foreground/20 p-1">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={
                  role === "client"
                    ? "rounded bg-brand px-4 py-2 text-display text-xs text-brand-foreground"
                    : "rounded px-4 py-2 text-display text-xs text-brand-foreground/75"
                }
              >
                {contact.roleClient}
              </button>
              <button
                type="button"
                onClick={() => setRole("lawyer")}
                className={
                  role === "lawyer"
                    ? "rounded bg-brand px-4 py-2 text-display text-xs text-brand-foreground"
                    : "rounded px-4 py-2 text-display text-xs text-brand-foreground/75"
                }
              >
                {contact.roleLawyer}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: contact.fields.name, type: "text", ph: contact.fields.namePh },
                { label: contact.fields.email, type: "email", ph: contact.fields.emailPh },
                { label: contact.fields.phone, type: "tel", ph: contact.fields.phonePh },
                { label: contact.fields.state, type: "text", ph: contact.fields.statePh },
              ].map((f) => (
                <label key={f.label} className="block min-w-0">
                  <span className="text-display text-[0.6rem] tracking-widest text-brand-foreground/85">
                    {f.label}
                  </span>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    className="mt-2 w-full rounded border border-brand-foreground/15 bg-ink px-3 py-3 text-sm text-brand-foreground outline-none transition-colors placeholder:text-brand-foreground/35 focus:border-brand"
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="text-display text-[0.6rem] tracking-widest text-brand-foreground/85">
                {contact.fields.message}
              </span>
              <textarea
                rows={3}
                placeholder={contact.fields.messagePh}
                className="mt-2 w-full rounded border border-brand-foreground/15 bg-ink px-3 py-3 text-sm text-brand-foreground outline-none transition-colors placeholder:text-brand-foreground/35 focus:border-brand"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded bg-brand px-5 py-4 text-display text-xs text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark"
            >
              {role === "client" ? contact.submitClient : contact.submitLawyer}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
