import {
  BarChart3,
  CircleDollarSign,
  FileCheck2,
  Handshake,
  LaptopMinimal,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  UserRound,
  UserRoundCheck,
} from "lucide-react";
import { Counter, Reveal } from "./Reveal";

const strip = [
  { icon: ShieldCheck, lines: ["Sin riesgos", "Sin compromisos"] },
  { icon: UserRoundCheck, lines: ["Clientes", "verificados"] },
  { icon: LaptopMinimal, lines: ["Panel inteligente", "en tiempo real"] },
  { icon: MessagesSquare, lines: ["Soporte en", "español 24/7"] },
  { icon: CircleDollarSign, lines: ["Conexión", "sin costo inicial"] },
];

export function TrustStrip() {
  return (
    <section className="bg-ink-soft py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-display text-sm tracking-[0.2em] text-brand-foreground">
          Conecta. Ayuda. Haz crecer tu práctica.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-brand-foreground/15">
          {strip.map(({ icon: Icon, lines }, i) => (
            <Reveal
              as="li"
              key={lines.join()}
              delay={i * 90}
              className="flex items-center justify-center gap-3 px-2 text-center lg:text-left"
            >
              <Icon className="h-6 w-6 shrink-0 text-brand-foreground/70" strokeWidth={1.5} />
              <span className="min-w-0 text-display text-[0.65rem] leading-snug tracking-wider text-brand-foreground/85">
                {lines[0]}
                <br />
                {lines[1]}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: UserRound,
    title: "Clientes reales",
    text: "Personas buscando ayuda migratoria ahora.",
  },
  { icon: MessageCircle, title: "Tú decides", text: "Acepta solo los casos que te interesan." },
  {
    icon: ShieldCheck,
    title: "Sin compromiso",
    text: "Habla con el cliente antes de desbloquear el contacto.",
  },
  {
    icon: BarChart3,
    title: "Haz crecer tu práctica",
    text: "Más casos, más clientes, más resultados.",
  },
];

const partners = ["Abogados de todo USA", "Lawyers.com", "Avvo", "Martindale-Hubbell", "Justia"];

export function Benefits() {
  return (
    <section id="beneficios" className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)]">
          <Reveal>
            <h2 className="text-display text-3xl leading-tight text-foreground sm:text-4xl">
              Más clientes.
              <br />
              Más casos.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Únete a una plataforma diseñada para que abogados como tú conecten con más personas y
              hagan crecer su práctica.
            </p>
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }, i) => (
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
            ))}
          </ul>
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-border pt-8">
          <span className="text-display text-[0.6rem] tracking-[0.2em] text-muted-foreground">
            Con la confianza de
          </span>
          {partners.map((p) => (
            <span key={p} className="text-display text-sm text-foreground/60">
              {p}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    title: "Crea tu perfil",
    text: "Regístrate gratis y cuéntanos tus áreas de práctica y estados donde ejerces.",
  },
  {
    n: "02",
    title: "Recibe casos en vivo",
    text: "Verás solicitudes de clientes migratorios en tu panel, en tiempo real.",
  },
  {
    n: "03",
    title: "Acepta y contacta",
    text: "Desbloquea solo los casos que te interesen y habla con el cliente.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-gradient-ink py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-display text-xs tracking-[0.3em] text-brand">Cómo funciona</p>
        <Reveal>
          <h2 className="max-w-xl text-display text-3xl leading-tight text-brand-foreground sm:text-4xl">
            Tres pasos para tu próximo caso
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 130}
              className="relative rounded border border-brand-foreground/12 bg-brand-foreground/[0.04] p-7"
            >
              <span className="text-display text-4xl text-brand/70">
                <Counter value={Number(s.n)} duration={900} pad={2} />
              </span>
              <h3 className="mt-4 text-display text-base text-brand-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-foreground/70">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <div id="panel" className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: LaptopMinimal, t: "Panel inteligente", d: "Filtra casos por estado, idioma y tipo de trámite." },
            { icon: FileCheck2, t: "Casos verificados", d: "Validamos cada solicitud antes de mostrarla." },
            { icon: Handshake, t: "Soporte dedicado", d: "Un equipo en español acompaña tu operación 24/7." },
          ].map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 110} className="flex gap-4">
              <span id={t === "Soporte dedicado" ? "soporte" : undefined} className="contents">
              <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.5} />
              <div className="min-w-0">
                <h3 className="text-display text-sm text-brand-foreground">{t}</h3>
                <p className="mt-1 text-sm text-brand-foreground/65">{d}</p>
              </div>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Conexión",
    price: "$0",
    note: "para empezar",
    features: ["Perfil verificado", "Casos ilimitados en el panel", "Sin cuota mensual"],
    cta: "Regístrate gratis",
    featured: false,
  },
  {
    name: "Práctica",
    price: "$149",
    note: "por mes",
    features: ["Casos prioritarios", "Panel en tiempo real", "Soporte 24/7 en español", "Reportes de conversión"],
    cta: "Empezar ahora",
    featured: true,
  },
  {
    name: "Firma",
    price: "A medida",
    note: "equipos y firmas",
    features: ["Múltiples abogados", "Asignación por estado", "Gerente de cuenta", "Integraciones"],
    cta: "Hablar con ventas",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="precios" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <p className="text-display text-xs tracking-[0.3em] text-brand">Precios</p>
          <h2 className="mt-3 text-display text-3xl leading-tight text-foreground sm:text-4xl">
            Paga solo por los casos que aceptas
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
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
                    <Sparkles className="h-3 w-3" /> Popular
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
                {p.price.startsWith("$") ? (
                  <Counter value={Number(p.price.slice(1))} prefix="$" duration={1200} />
                ) : (
                  p.price
                )}
              </p>
              <p
                className={
                  p.featured
                    ? "text-xs tracking-wider text-brand-foreground/60"
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

const resources = [
  { tag: "Guía", title: "Cómo calificar un caso migratorio en 5 minutos" },
  { tag: "Plantilla", title: "Checklist de documentos para asilo" },
  { tag: "Webinar", title: "Convierte consultas en clientes que pagan" },
];

export function Resources() {
  return (
    <section id="recursos" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-display text-xs tracking-[0.3em] text-brand">Recursos</p>
        <Reveal>
          <h2 className="mt-3 text-display text-3xl leading-tight text-foreground sm:text-4xl">
            Material para tu práctica
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resources.map((r, i) => (
            <Reveal key={r.title} delay={i * 120}>
              <a
              key={r.title}
              href="#contacto"
              className="group flex h-full flex-col justify-between rounded border border-border bg-card p-7 transition-shadow hover:shadow-panel"
            >
              <span className="text-display text-[0.6rem] tracking-[0.2em] text-brand">{r.tag}</span>
              <h3 className="mt-4 text-display text-base leading-snug text-foreground">{r.title}</h3>
              <span className="mt-6 text-display text-[0.65rem] text-muted-foreground transition-colors group-hover:text-brand">
                Descargar →
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
  return (
    <section id="contacto" className="bg-ink py-16 lg:py-24">
      <div
        id="registro"
        className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center"
      >
        <Reveal>
          <p className="text-display text-xs tracking-[0.3em] text-brand">Contacto</p>
          <h2 className="mt-3 text-display text-3xl leading-tight text-brand-foreground sm:text-4xl">
            Regístrate gratis y recibe tu primer caso
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-foreground/70">
            Sin cuotas iniciales ni compromisos. Nuestro equipo te acompaña en español para
            configurar tu perfil.
          </p>
          <a
            href="tel:+13059870000"
            className="mt-8 inline-flex items-center gap-3 text-display text-xl text-brand-foreground"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand">
              <MessageCircle className="h-5 w-5 text-brand-foreground" />
            </span>
            (305) 987-0000
          </a>
        </Reveal>

        <Reveal delay={160}>
          <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded border border-brand-foreground/12 bg-brand-foreground/[0.04] p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Nombre", type: "text", ph: "Nombre y apellido" },
              { label: "Correo", type: "email", ph: "tu@correo.com" },
              { label: "Teléfono", type: "tel", ph: "(305) 000-0000" },
              { label: "Estado", type: "text", ph: "Florida" },
            ].map((f) => (
              <label key={f.label} className="block min-w-0">
                <span className="text-display text-[0.6rem] tracking-widest text-brand-foreground/70">
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
            <span className="text-display text-[0.6rem] tracking-widest text-brand-foreground/70">
              Mensaje
            </span>
            <textarea
              rows={3}
              placeholder="Cuéntanos sobre tu práctica"
              className="mt-2 w-full rounded border border-brand-foreground/15 bg-ink px-3 py-3 text-sm text-brand-foreground outline-none transition-colors placeholder:text-brand-foreground/35 focus:border-brand"
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded bg-brand px-5 py-4 text-display text-xs text-brand-foreground shadow-brand transition-colors hover:bg-brand-dark"
          >
            Regístrate gratis
          </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}