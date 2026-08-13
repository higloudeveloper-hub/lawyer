import { useEffect, useRef, useState } from "react";
import { Bell, Check, RefreshCw } from "lucide-react";
import photo1 from "@/assets/lawyers/lawyer-1.jpg";
import photo2 from "@/assets/lawyers/lawyer-2.jpg";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

const photos = [photo1, photo2];

type Phase = "idle" | "type" | "send" | "ping" | "rest";

const PHASE_MS: Record<Phase, number> = {
  idle: 500,
  type: 1700,
  send: 720,
  ping: 1500,
  rest: 2200,
};

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
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
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useTyped(text: string, active: boolean, speed = 28) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) {
      setOut("");
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed]);
  return out;
}

type PulseCopy = ReturnType<typeof useLocale>["t"]["pulse"];
type PulseClient = PulseCopy["clients"][number];

function queueOf(clients: readonly PulseClient[], step: number, phase: Phase) {
  return clients.filter((_, i) => i < step || (i === step && phase !== "idle" && phase !== "type"));
}

function feedOf(clients: readonly PulseClient[], lawyer: number, step: number, phase: Phase) {
  return clients.filter((c, i) => {
    if (c.lawyer !== lawyer) return false;
    if (i < step) return true;
    return i === step && (phase === "ping" || phase === "rest");
  });
}

export function PulseDesk() {
  const { t } = useLocale();
  const { pulse } = t;
  const { ref, inView } = useInView<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);
  const last = pulse.clients.length - 1;
  const person = pulse.clients[step] ?? pulse.clients[0];
  const typing = useTyped(person.title, phase === "type" && !reduced, 22);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStep(last);
      setPhase("rest");
    }
  }, [inView, reduced, last]);

  useEffect(() => {
    if (!inView || reduced) return;
    const tmr = window.setTimeout(() => {
      if (phase === "idle") {
        setPhase("type");
        return;
      }
      if (phase === "type") {
        setPhase("send");
        return;
      }
      if (phase === "send") {
        setPhase("ping");
        return;
      }
      if (phase === "ping") {
        if (step >= last) {
          setPhase("rest");
          return;
        }
        setStep((n) => n + 1);
        setPhase("type");
        return;
      }
      setStep(0);
      setPhase("type");
      setRunId((n) => n + 1);
    }, PHASE_MS[phase]);
    return () => window.clearTimeout(tmr);
  }, [inView, reduced, phase, step, last, runId]);

  const replay = () => {
    setStep(0);
    setPhase(reduced ? "rest" : "type");
    setRunId((n) => n + 1);
  };

  const queued = reduced ? pulse.clients : queueOf(pulse.clients, step, phase);
  const toast = !reduced && phase === "ping" ? person : null;

  return (
    <section id={pulse.id} className="hidden bg-background py-12 sm:block sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-kicker text-brand">{pulse.label}</p>
            <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
              {pulse.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{pulse.text}</p>
          </div>
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-brand sm:self-auto"
          >
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.75} />
            {pulse.replay}
          </button>
        </Reveal>

        <div ref={ref} className="relative mt-8 grid items-stretch gap-4 sm:mt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-5">
          {phase === "send" && (
            <span
              aria-hidden
              className="animate-paperin pointer-events-none absolute top-[42%] left-[28%] z-10 hidden rounded border border-brand/30 bg-card px-3 py-2 text-xs text-foreground shadow-panel lg:block"
            >
              {person.title}
            </span>
          )}
          <ClientDesk
            pulse={pulse}
            person={person}
            phase={phase}
            typing={typing}
            queued={queued}
            reduced={reduced}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {pulse.lawyers.map((lawyer, i) => (
              <LawyerDesk
                key={lawyer.name}
                pulse={pulse}
                lawyer={lawyer}
                photo={photos[i]}
                feed={reduced ? pulse.clients.filter((c) => c.lawyer === i) : feedOf(pulse.clients, i, step, phase)}
                toast={toast?.lawyer === i ? toast : null}
                pinging={!reduced && phase === "ping" && person.lawyer === i}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted-foreground">{pulse.note}</p>
      </div>
    </section>
  );
}

function ClientDesk({
  pulse,
  person,
  phase,
  typing,
  queued,
  reduced,
}: {
  pulse: PulseCopy;
  person: PulseClient;
  phase: Phase;
  typing: string;
  queued: readonly PulseClient[];
  reduced: boolean;
}) {
  const writing = !reduced && phase === "type";
  const sending = !reduced && phase === "send";
  const title = writing ? typing : reduced || phase === "idle" ? "" : person.title;

  return (
    <article className="flex min-h-[28rem] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="text-sm text-foreground">{pulse.clientDesk}</p>
          <p className="text-xs text-muted-foreground">{pulse.free}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[0.65rem] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-livepulse" />
          {pulse.online}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div
          className={cn(
            "rounded-md border bg-surface p-4 transition-colors duration-300",
            sending ? "border-brand/40" : "border-border",
          )}
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs text-accent-foreground">
              {person.initials}
            </span>
            <div>
              <p className="text-sm text-foreground">{person.name}</p>
              <p className="text-xs text-muted-foreground">
                {writing ? pulse.drafting : sending ? pulse.posting : pulse.posted}
              </p>
            </div>
          </div>

          <label className="mt-4 block">
            <span className="text-[0.65rem] text-muted-foreground">{pulse.fieldArea}</span>
            <p className="mt-1 min-h-[1.35rem] text-sm text-foreground">
              {title}
              {writing && <span className="animate-typecaret ml-0.5 text-brand">|</span>}
            </p>
          </label>
          <label className="mt-3 block">
            <span className="text-[0.65rem] text-muted-foreground">{pulse.fieldCity}</span>
            <p className="mt-1 text-sm text-foreground">{writing && !title ? "" : person.loc}</p>
          </label>

          <div
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 rounded px-3 py-2 text-ui text-[0.7rem] text-brand-foreground transition-all duration-300",
              sending ? "scale-[0.98] bg-brand-dark" : "bg-brand",
            )}
          >
            {sending || queued.length > 0 ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : null}
            {sending ? pulse.posting : pulse.publish}
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <p className="text-[0.65rem] text-muted-foreground">{pulse.queue}</p>
          {queued.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">{pulse.emptyQueue}</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {queued.map((item) => (
                <li
                  key={item.name}
                  className="animate-queuein flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">{item.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.area} · {item.loc}
                    </p>
                  </div>
                  <Check className="h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={2} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

function LawyerDesk({
  pulse,
  lawyer,
  photo,
  feed,
  toast,
  pinging,
}: {
  pulse: PulseCopy;
  lawyer: PulseCopy["lawyers"][number];
  photo: string;
  feed: readonly PulseClient[];
  toast: PulseClient | null;
  pinging: boolean;
}) {
  return (
    <article
      className={cn(
        "relative flex min-h-[22rem] flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-[border-color,box-shadow] duration-300",
        pinging ? "animate-deskflash border-brand/40" : "border-border",
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b border-border bg-ink px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <img src={photo} alt="" className="h-8 w-8 rounded-full object-cover object-center" />
          <div className="min-w-0">
            <p className="truncate text-xs text-brand-foreground">{lawyer.name}</p>
            <p className="truncate text-[0.65rem] text-brand-foreground/65">
              {pulse.online} · {lawyer.loc}
            </p>
          </div>
        </div>
        <span className="relative shrink-0 text-brand-foreground">
          <Bell className={cn("h-4 w-4", pinging && "animate-bellpop")} strokeWidth={1.75} />
          {feed.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[0.55rem] text-brand-foreground">
              {feed.length}
            </span>
          )}
        </span>
      </header>

      {toast && (
        <div className="animate-toastin absolute left-3 right-3 top-14 z-10 rounded-md border border-border bg-card px-3 py-2.5 shadow-panel">
          <p className="text-[0.65rem] text-brand">{pulse.toastTitle}</p>
          <p className="mt-0.5 text-sm text-foreground">{toast.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {toast.hidden} · {pulse.hidden}
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-3">
        <p className="mb-2 text-[0.65rem] text-muted-foreground">{pulse.lawyerDesk}</p>
        {feed.length === 0 ? (
          <p className="mt-6 text-center text-sm text-muted-foreground">{pulse.emptyFeed}</p>
        ) : (
          <ul className="space-y-2">
            {[...feed].reverse().map((item) => (
              <li key={item.name} className="animate-leadin rounded-md border border-border bg-surface px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.65rem] text-brand">{pulse.fresh}</span>
                  <span className="text-[0.65rem] text-muted-foreground">{pulse.cost}</span>
                </div>
                <p className="mt-1 text-sm text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.hidden} · {item.area}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
