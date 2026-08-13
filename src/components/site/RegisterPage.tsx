import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Scale, UserRound } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { Logo } from "./Logo";

export function RegisterShell({ children }: { children: React.ReactNode }) {
  const { locale, setLocale, t } = useLocale();
  const { header, register } = t;

  return (
    <div className="min-h-screen bg-ink text-brand-foreground">
      <header className="border-b border-brand-foreground/10 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Logo href="/" onDark />
          <div className="flex items-center gap-3">
            <div
              className="flex items-center rounded border border-brand-foreground/20 p-0.5 text-ui text-[0.7rem]"
              role="group"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => setLocale("es")}
                className={
                  locale === "es"
                    ? "rounded bg-brand px-2.5 py-1 text-brand-foreground"
                    : "px-2.5 py-1 text-brand-foreground/70"
                }
              >
                {header.langEs}
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={
                  locale === "en"
                    ? "rounded bg-brand px-2.5 py-1 text-brand-foreground"
                    : "px-2.5 py-1 text-brand-foreground/70"
                }
              >
                {header.langEn}
              </button>
            </div>
            <Link
              to="/"
              className="hidden text-ui text-xs text-brand-foreground/70 transition-colors hover:text-brand sm:inline"
            >
              {register.home}
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">{children}</main>
    </div>
  );
}

export function RegisterPicker() {
  const { t } = useLocale();
  const { register } = t;

  return (
    <div>
      <p className="text-kicker text-brand">{register.label}</p>
      <h1 className="mt-3 max-w-2xl text-display text-3xl leading-tight text-brand-foreground sm:text-5xl">
        {register.title}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-foreground/75 sm:text-base">{register.text}</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Link
          to="/registro/cliente"
          className="group flex h-full flex-col items-start rounded border border-brand/50 bg-brand/15 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand sm:p-8"
        >
          <UserRound className="h-6 w-6 text-brand" strokeWidth={1.5} />
          <h2 className="mt-5 text-display text-xl text-brand-foreground">{register.clientCard.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-foreground/75">{register.clientCard.text}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-ui text-xs text-brand">
            {register.clientCard.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          to="/registro/abogado"
          className="group flex h-full flex-col items-start rounded border border-brand-foreground/15 bg-brand-foreground/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 sm:p-8"
        >
          <Scale className="h-6 w-6 text-brand" strokeWidth={1.5} />
          <h2 className="mt-5 text-display text-xl text-brand-foreground">{register.lawyerCard.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-foreground/75">{register.lawyerCard.text}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-ui text-xs text-brand">
            {register.lawyerCard.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function readClientQuery() {
  if (typeof window === "undefined") return { zip: "", need: "" };
  const q = new URLSearchParams(window.location.search);
  return { zip: q.get("zip") ?? "", need: q.get("need") ?? "" };
}

export function RegisterForm({ role }: { role: "client" | "lawyer" }) {
  const { t } = useLocale();
  const { register } = t;
  const [sent, setSent] = useState(false);
  const fields = role === "lawyer" ? register.lawyerFields : register.clientFields;
  const card = role === "lawyer" ? register.lawyerCard : register.clientCard;
  const query = readClientQuery();
  const needText =
    role === "client" && query.need
      ? register.needPrefill[query.need as keyof typeof register.needPrefill]
      : "";
  const casePrefill = [query.zip ? register.zipNote.replace("{zip}", query.zip) : "", needText]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/registro"
        className="inline-flex items-center gap-2 text-ui text-xs text-brand-foreground/60 transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {register.back}
      </Link>
      <p className="mt-6 text-kicker text-brand">{register.label}</p>
      <h1 className="mt-3 text-display text-3xl leading-tight text-brand-foreground sm:text-4xl">{card.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-brand-foreground/75">{card.text}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="mt-8 rounded border border-brand-foreground/12 bg-brand-foreground/[0.04] p-5 sm:p-8"
      >
        {sent ? (
          <div className="animate-chatpop py-8 text-center">
            <p className="text-display text-lg text-brand-foreground">{register.doneTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-foreground/75">
              {role === "client" ? register.doneClient : register.doneLawyer}
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex text-ui text-xs text-brand transition-colors hover:text-brand-foreground"
            >
              {register.home} →
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <label key={f.label} className={"wide" in f && f.wide ? "block sm:col-span-2" : "block"}>
                  <span className="text-kicker text-brand-foreground/85">
                    {f.label}
                  </span>
                  {"multiline" in f && f.multiline ? (
                    <textarea
                      rows={4}
                      required
                      placeholder={f.ph}
                      defaultValue={casePrefill}
                      className="mt-2 w-full rounded border border-brand-foreground/15 bg-ink px-3 py-3 text-sm text-brand-foreground outline-none transition-colors placeholder:text-brand-foreground/35 focus:border-brand"
                    />
                  ) : (
                    <input
                      type={f.type}
                      required
                      placeholder={f.ph}
                      className="mt-2 w-full rounded border border-brand-foreground/15 bg-ink px-3 py-3 text-sm text-brand-foreground outline-none transition-colors placeholder:text-brand-foreground/35 focus:border-brand"
                    />
                  )}
                </label>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-brand-foreground/55">{register.disclaimer}</p>
            <button
              type="submit"
              className="mt-6 w-full rounded bg-brand px-5 py-4 text-ui text-sm text-brand-foreground shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              {role === "client" ? register.submitClient : register.submitLawyer}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
