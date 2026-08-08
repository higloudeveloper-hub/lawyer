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
    <section className="bg-ink-soft py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-display text-sm tracking-[0.2em] text-brand-foreground">
          {trust.tagline}
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-brand-foreground/15">
          {trust.items.map(({ lines }, i) => {
            const Icon = trustIcons[i] ?? ShieldCheck;
            return (
              <Reveal
                as="li"
                key={lines.join()}
                delay={i * 90}
                className="flex items-center justify-center gap-3 px-2 text-center lg:text-left"
              >
                <Icon className="h-6 w-6 shrink-0 text-brand-foreground/85" strokeWidth={1.5} />
                <span className="min-w-0 text-display text-[0.65rem] leading-snug tracking-wider text-brand-foreground/85">
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
    <section id={audience.id} className="bg-background py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal className="rounded border border-border bg-surface p-8">
          <p className="text-display text-xs tracking-[0.3em] text-brand">{audience.clientLabel}</p>
          <h2 className="mt-3 text-display text-3xl leading-tight text-foreground">
            {audience.clientTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{audience.clientSub}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
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
            className="mt-8 inline-flex rounded bg-brand px-6 py-3 text-display text-xs text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark"
          >
            {audience.clientCta}
          </a>
        </Reveal>

        <Reveal delay={120} className="rounded border border-brand/30 bg-ink p-8">
          <p className="text-display text-xs tracking-[0.3em] text-brand">{audience.lawyerLabel}</p>
          <h2 className="mt-3 text-display text-3xl leading-tight text-brand-foreground">
            {audience.lawyerTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-foreground/85">{audience.lawyerSub}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
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
            className="mt-8 inline-flex rounded border border-brand-foreground/25 px-6 py-3 text-display text-xs text-brand-foreground transition-colors hover:bg-brand-foreground/10"
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
    <section id="beneficios" className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)]">
          <Reveal>
            <h2 className="text-display text-3xl leading-tight text-foreground sm:text-4xl">
              {benefits.title}
              <br />
              {benefits.titleLine2}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {benefits.text}
            </p>
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.items.map(({ title, text }, i) => {
              const Icon = benefitIcons[i] ?? UserRound;
              return (
                <Reveal
                  as="li"
                  key={title}
                  delay={i * 110}
                  className="rounded border border-border bg-card p-6 text-center hover:shadow-panel"
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
    <section id="como-funciona" className="bg-gradient-ink py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-display text-xs tracking-[0.3em] text-brand">{how.label}</p>
        <Reveal>
          <h2 className="max-w-xl text-display text-3xl leading-tight text-brand-foreground sm:text-4xl">
            {how.title}
          </h2>
        </Reveal>

        <div className="mt-8 inline-flex rounded border border-brand-foreground/20 p-1">
          <button
            type="button"
            onClick={() => setTab("client")}
            className={
              tab === "client"
                ? "rounded bg-brand px-5 py-2 text-display text-xs text-brand-foreground"
                : "rounded px-5 py-2 text-display text-xs text-brand-foreground/75 transition-colors hover:text-brand-foreground"
            }
          >
            {how.tabClient}
          </button>
          <button
            type="button"
            onClick={() => setTab("lawyer")}
            className={
              tab === "lawyer"
                ? "rounded bg-brand px-5 py-2 text-display text-xs text-brand-foreground"
                : "rounded px-5 py-2 text-display text-xs text-brand-foreground/75 transition-colors hover:text-brand-foreground"
            }
          >
            {how.tabLawyer}
          </button>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={`${tab}-${s.n}`}
              delay={i * 130}
              className="relative rounded border border-brand-foreground/12 bg-brand-foreground/[0.04] p-7"
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
    <section id="precios" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <p className="text-display text-xs tracking-[0.3em] text-brand">{pricing.label}</p>
          <h2 className="mt-3 text-display text-3xl leading-tight text-foreground sm:text-4xl">
            {pricing.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricing.plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 130}
              className={
                p.featured
                  ? "rounded border border-brand bg-ink p-8 shadow-brand"
                  : "rounded border border-border bg-card p-8"
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
    <section id="recursos" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-display text-xs tracking-[0.3em] text-brand">{resources.label}</p>
        <Reveal>
          <h2 className="mt-3 text-display text-3xl leading-tight text-foreground sm:text-4xl">
            {resources.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resources.items.map((r, i) => (
            <Reveal key={r.title} delay={i * 120}>
              <a
                href="#contacto"
                className="group flex h-full flex-col justify-between rounded border border-border bg-card p-7 transition-shadow hover:shadow-panel"
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
    <section id="contacto" className="bg-ink py-16 lg:py-24">
      <div
        id="registro"
        className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center"
      >
        <Reveal>
          <p className="text-display text-xs tracking-[0.3em] text-brand">{contact.label}</p>
          <h2 className="mt-3 text-display text-3xl leading-tight text-brand-foreground sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-foreground/85">
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
            className="rounded border border-brand-foreground/12 bg-brand-foreground/[0.04] p-7"
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
