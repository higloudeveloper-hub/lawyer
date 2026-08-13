import { useEffect, useRef, useState, type ReactNode } from "react";
import { BadgeCheck, Check, RefreshCw, Unlock, Wallet } from "lucide-react";
import lawyerPhoto from "@/assets/lawyers/lawyer-1.jpg";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Beat =
  | "idle"
  | "drafting"
  | "posted"
  | "arrives"
  | "reading"
  | "unlocking"
  | "unlocked"
  | "accepting"
  | "matched"
  | "chat";

const BEAT_MS: Record<Beat, number> = {
  idle: 0,
  drafting: 1100,
  posted: 350,
  arrives: 650,
  reading: 500,
  unlocking: 380,
  unlocked: 650,
  accepting: 320,
  matched: 400,
  chat: 0,
};

const NEXT: Record<Beat, Beat | null> = {
  idle: "drafting",
  drafting: "posted",
  posted: "arrives",
  arrives: "reading",
  reading: "unlocking",
  unlocking: "unlocked",
  unlocked: "accepting",
  accepting: "matched",
  matched: "chat",
  chat: null,
};

const CHAT_TYPE_MS = 520;
const CHAT_HOLD_MS = 420;

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
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
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

function useTyped(text: string, active: boolean, speed = 42) {
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

function stageOf(beat: Beat) {
  if (beat === "idle" || beat === "drafting" || beat === "posted") return 1;
  if (beat === "arrives" || beat === "reading" || beat === "unlocking") return 2;
  if (beat === "unlocked" || beat === "accepting") return 3;
  return 4;
}

type MatchCopy = ReturnType<typeof useLocale>["t"]["match"];

export function MatchLive() {
  const { t } = useLocale();
  const { match, live } = t;
  const { ref, inView } = useInView<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const [beat, setBeat] = useState<Beat>("idle");
  const [runId, setRunId] = useState(0);
  const [msgs, setMsgs] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setBeat("chat");
      setMsgs(match.thread.length);
      setTyping(false);
      return;
    }
    if (beat === "idle") setBeat("drafting");
  }, [inView, reduced, beat, match.thread.length]);

  useEffect(() => {
    if (!inView || reduced) return;
    const next = NEXT[beat];
    if (!next) return;
    const tmr = window.setTimeout(() => setBeat(next), BEAT_MS[beat]);
    return () => window.clearTimeout(tmr);
  }, [inView, reduced, beat, runId]);

  useEffect(() => {
    if (beat !== "chat") {
      setMsgs(0);
      setTyping(false);
      return;
    }
    if (reduced) {
      setMsgs(match.thread.length);
      setTyping(false);
      return;
    }

    let cancelled = false;
    let timer = 0;
    setMsgs(0);
    setTyping(true);

    const play = (index: number) => {
      if (cancelled) return;
      setTyping(true);
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setTyping(false);
        setMsgs(index + 1);
        if (index + 1 >= match.thread.length) return;
        timer = window.setTimeout(() => play(index + 1), CHAT_HOLD_MS);
      }, CHAT_TYPE_MS);
    };

    play(0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [beat, runId, reduced, match.thread.length]);

  const replay = () => {
    if (reduced) {
      setBeat("chat");
      setMsgs(match.thread.length);
      return;
    }
    setMsgs(0);
    setTyping(false);
    setBeat("drafting");
    setRunId((n) => n + 1);
  };

  const jumpStage = (n: number) => {
    const map: Beat[] = ["drafting", "arrives", "unlocked", "matched"];
    setBeat(map[n - 1] ?? "drafting");
    setRunId((x) => x + 1);
  };

  const stage = stageOf(beat);
  const unlocked = beat === "unlocked" || beat === "accepting" || beat === "matched" || beat === "chat";
  const matched = beat === "matched" || beat === "chat";
  const nextSpeaker = match.thread[msgs]?.from;
  const showTyping = beat === "chat" && typing && msgs < match.thread.length;
  const typedTitle = useTyped(match.case.title, beat === "drafting", 16);
  const titleShown = beat === "idle" ? "" : beat === "drafting" ? typedTitle : match.case.title;

  return (
    <section id="casos" className="bg-surface py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-kicker text-brand">{match.label}</p>
            <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
              {match.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{match.text}</p>
          </div>
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-brand sm:self-auto"
          >
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.75} />
            {match.replay}
          </button>
        </Reveal>

        <ol className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-4 sm:gap-3">
          {match.stages.map((item, i) => {
            const n = i + 1;
            const done = stage > n;
            const active = stage === n;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => jumpStage(n)}
                  className={cn(
                    "w-full rounded border px-3 py-2.5 text-left transition-colors duration-500",
                    active ? "border-brand/35 bg-card" : done ? "border-border bg-card" : "border-border",
                  )}
                >
                  <span className={cn("block text-sm", active || done ? "text-foreground" : "text-muted-foreground")}>
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{item.hint}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div ref={ref} className="relative mt-6 grid items-stretch gap-5 lg:mt-8 lg:grid-cols-2">
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-1/2 top-[28%] z-10 hidden h-0.5 w-12 -translate-x-1/2 rounded-full bg-brand lg:block",
              beat === "posted" || beat === "arrives" ? "animate-connectpulse" : "opacity-0",
            )}
          />
          <ClientPane
            match={match}
            beat={beat}
            matched={matched}
            msgs={msgs}
            typing={showTyping && nextSpeaker === "client"}
            typedTitle={titleShown}
          />
          <LawyerPane
            match={match}
            beat={beat}
            unlocked={unlocked}
            matched={matched}
            msgs={msgs}
            typing={showTyping && nextSpeaker === "lawyer"}
            reduced={reduced}
          />
        </div>

        <ul className="mt-8 divide-y divide-border rounded border border-border bg-card sm:mt-10">
          {live.items.map((item) => (
            <li key={item.title} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-5">
              <div>
                <p className="text-sm text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.area} · {item.loc}
                </p>
              </div>
              <small className="text-xs text-muted-foreground">{item.time}</small>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">{match.note}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/registro/cliente"
              className="inline-flex items-center rounded bg-brand px-5 py-3 text-ui text-xs text-brand-foreground transition-colors hover:bg-brand-dark"
            >
              {match.ctaClient} →
            </a>
            <a
              href="/registro/abogado"
              className="inline-flex items-center rounded border border-border px-5 py-3 text-ui text-xs text-foreground transition-colors hover:bg-accent"
            >
              {match.ctaLawyer}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FadeIn({
  show,
  children,
  className,
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1.5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ClientPane({
  match,
  beat,
  matched,
  msgs,
  typing,
  typedTitle,
}: {
  match: MatchCopy;
  beat: Beat;
  matched: boolean;
  msgs: number;
  typing: boolean;
  typedTitle: string;
}) {
  const drafting = beat === "idle" || beat === "drafting";
  const showMeta = beat !== "idle" && beat !== "drafting";
  const status =
    beat === "idle" || beat === "drafting"
      ? match.ui.drafting
      : beat === "posted"
        ? match.ui.posting
        : matched
          ? match.ui.matched
          : beat === "arrives" || beat === "reading" || beat === "unlocking"
            ? match.ui.waiting
            : match.ui.reviewing;

  return (
    <article className="flex min-h-[34rem] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm text-accent-foreground">
            {match.client.initials}
          </span>
          <div>
            <p className="text-sm text-foreground">{match.client.name}</p>
            <p className="text-xs text-muted-foreground">{match.ui.myCase}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{match.ui.free}</span>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div
          className={cn(
            "min-h-[8.5rem] rounded-md border bg-surface p-4 transition-colors duration-300",
            beat === "posted" ? "border-brand/40" : "border-border",
          )}
        >
          <p className="text-xs text-muted-foreground">
            {drafting ? match.ui.drafting : beat === "posted" ? match.ui.posting : match.ui.posted}
          </p>
          <p className="mt-2 min-h-[1.5rem] text-sm text-foreground">
            {typedTitle}
            {drafting && <span className="animate-typecaret ml-0.5 text-brand">|</span>}
          </p>
          <FadeIn show={showMeta}>
            <p className="mt-1 text-xs text-muted-foreground">
              {match.case.area} · {match.case.loc}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{match.case.detail}</p>
          </FadeIn>
        </div>

        <p className="min-h-[2.75rem] text-sm leading-relaxed text-muted-foreground transition-opacity duration-300">
          {status}
        </p>

        <FadeIn show={matched} className="min-h-[4.25rem]">
          <div className="flex items-center gap-3 rounded-md border border-border p-3">
            <img src={lawyerPhoto} alt="" className="h-11 w-11 rounded-full object-cover object-top" />
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-sm text-foreground">
                {match.lawyer.name}
                <BadgeCheck className="h-3.5 w-3.5 text-brand" strokeWidth={1.75} />
              </p>
              <p className="text-xs text-muted-foreground">
                {match.lawyer.area} · {match.lawyer.loc}
              </p>
            </div>
          </div>
        </FadeIn>

        <Thread match={match} msgs={msgs} typing={typing} perspective="client" />
      </div>
    </article>
  );
}

function useCountedWallet(target: number, reduced: boolean) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (reduced || fromRef.current === target) {
      setValue(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 280);
      setValue(Math.round(from + (target - from) * t));
      if (t < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced]);

  return value;
}

function LawyerPane({
  match,
  beat,
  unlocked,
  matched,
  msgs,
  typing,
  reduced,
}: {
  match: MatchCopy;
  beat: Beat;
  unlocked: boolean;
  matched: boolean;
  msgs: number;
  typing: boolean;
  reduced: boolean;
}) {
  const wallet = useCountedWallet(Number(unlocked ? match.lawyer.walletAfter : match.lawyer.wallet), reduced);
  const onDesk = beat !== "idle" && beat !== "drafting" && beat !== "posted";
  const showDeal = onDesk;
  const showContact = onDesk;
  const pressingUnlock = beat === "unlocking";
  const pressingAccept = beat === "accepting";
  const aboutToUnlock = beat === "arrives" || beat === "reading";
  const justLanded = beat === "arrives";

  return (
    <article className="flex min-h-[34rem] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <img src={lawyerPhoto} alt="" className="h-9 w-9 rounded-full object-cover object-top" />
          <div>
            <p className="flex items-center gap-1 text-sm text-foreground">
              {match.lawyer.name}
              <BadgeCheck className="h-3.5 w-3.5 text-brand" strokeWidth={1.75} />
            </p>
            <p className="text-xs text-muted-foreground">{match.ui.cases}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs tabular-nums text-foreground">
          <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
          {wallet} {match.ui.wallet}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="relative min-h-[16.5rem]">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-md border border-dashed border-border transition-opacity duration-300",
              onDesk ? "pointer-events-none opacity-0" : "opacity-100",
            )}
          >
            <p className="text-sm text-muted-foreground">{match.ui.emptyDesk}</p>
          </div>

          <div
            className={cn(
              "rounded-md border p-4",
              onDesk ? "opacity-100" : "pointer-events-none opacity-0",
              justLanded && "animate-paperin",
              onDesk && !justLanded && "translate-x-0",
              !onDesk && "-translate-x-6 translate-y-2",
              beat === "reading" || pressingUnlock || justLanded
                ? "border-brand/40 bg-accent/70"
                : "border-border bg-surface",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">{match.case.id}</span>
              <StatusChip match={match} beat={beat} />
            </div>
            <p className="mt-2 text-sm text-foreground">{match.case.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {match.case.area} · {match.case.loc}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{match.case.detail}</p>

            <FadeIn show={showContact} className="mt-3 space-y-1.5 text-sm">
              <Field reserved={!unlocked} hidden={match.client.hidden} value={match.client.name} />
              <Field reserved={!unlocked} hidden={match.client.phoneHidden} value={match.client.phone} />
              <Field reserved={!unlocked} hidden={match.client.emailHidden} value={match.client.email} muted />
            </FadeIn>

            <FadeIn show={showDeal}>
              <DealStrip match={match} unlocked={unlocked} matched={matched} highlight={aboutToUnlock || pressingUnlock} />
            </FadeIn>
          </div>
        </div>

        <FadeIn show={onDesk} className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded px-3 py-2 text-xs transition-[transform,box-shadow,background-color] duration-300",
              unlocked
                ? "bg-muted text-muted-foreground"
                : pressingUnlock
                  ? "scale-[0.98] bg-brand-dark text-brand-foreground"
                  : aboutToUnlock
                    ? "bg-brand text-brand-foreground ring-2 ring-brand/25"
                    : "bg-brand text-brand-foreground",
            )}
          >
            {unlocked ? <Check className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {pressingUnlock ? match.ui.unlocking : unlocked ? match.ui.unlockedDone : `${match.ui.unlock} · ${match.case.cost}`}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded px-3 py-2 text-xs transition-transform duration-300",
              matched
                ? "bg-muted text-muted-foreground"
                : pressingAccept
                  ? "scale-[0.98] bg-brand-dark text-brand-foreground"
                  : beat === "unlocked"
                    ? "bg-brand text-brand-foreground"
                    : "bg-muted text-muted-foreground",
            )}
          >
            {pressingAccept ? match.ui.accepting : matched ? match.ui.matched : match.ui.accept}
          </span>
        </FadeIn>

        <Thread match={match} msgs={msgs} typing={typing} perspective="lawyer" />
      </div>
    </article>
  );
}

function Field({
  reserved,
  hidden,
  value,
  muted,
}: {
  reserved: boolean;
  hidden: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <p className={cn("relative min-h-[1.25rem] text-sm", muted ? "text-muted-foreground" : "text-foreground")}>
      <span
        className={cn(
          "absolute inset-0 text-muted-foreground transition-opacity duration-300",
          reserved ? "opacity-100" : "opacity-0",
        )}
      >
        {hidden}
      </span>
      <span className={cn("transition-opacity duration-300", reserved ? "opacity-0" : "opacity-100")}>{value}</span>
    </p>
  );
}

function DealStrip({
  match,
  unlocked,
  matched,
  highlight,
}: {
  match: MatchCopy;
  unlocked: boolean;
  matched: boolean;
  highlight: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-4 rounded-md border px-3 py-3 transition-colors duration-700",
        highlight ? "border-brand/40 bg-card" : "border-border/80 bg-card/60",
      )}
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[0.65rem] text-muted-foreground">{match.ui.unlockUsdLabel}</p>
          <p
            className={cn(
              "mt-0.5 text-display text-xl tabular-nums",
              unlocked ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {match.case.unlockUsd}
          </p>
          <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
            {unlocked ? match.ui.spentNote : match.ui.debitNote}
          </p>
        </div>
        <div>
          <p className="text-[0.65rem] text-muted-foreground">{match.ui.earnUsdLabel}</p>
          <p
            className={cn(
              "mt-0.5 text-display text-xl tabular-nums text-foreground",
              highlight && "animate-earnpop",
            )}
          >
            {match.case.earnUsd}
          </p>
          <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
            {matched ? match.ui.acceptReceipt : match.ui.earnHint}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusChip({ match, beat }: { match: MatchCopy; beat: Beat }) {
  const label =
    beat === "matched" || beat === "chat"
      ? match.ui.matched
      : beat === "unlocked" || beat === "accepting"
        ? match.ui.held
        : beat === "unlocking"
          ? match.ui.unlocking
          : beat === "reading"
            ? match.ui.readingCase
            : beat === "arrives"
              ? match.ui.arrived
              : match.ui.available;
  return <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{label}</span>;
}

function Thread({
  match,
  msgs,
  typing,
  perspective,
}: {
  match: MatchCopy;
  msgs: number;
  typing: boolean;
  perspective: "client" | "lawyer";
}) {
  const shown = match.thread.slice(0, msgs);

  return (
    <div className="mt-auto min-h-[8.25rem] space-y-2.5">
      {shown.map((m) => {
        const mine = m.from === perspective;
        return (
          <div
            key={`${m.time}-${m.text}`}
            className={cn("flex animate-chatpop", mine ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[88%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                mine ? "rounded-br-md bg-brand text-brand-foreground" : "rounded-bl-md bg-muted text-foreground",
              )}
            >
              <p>{m.text}</p>
              <p className={cn("mt-1 text-right text-[0.65rem]", mine ? "text-brand-foreground/70" : "text-muted-foreground")}>
                {m.time}
              </p>
            </div>
          </div>
        );
      })}
      {typing && (
        <div className={cn("flex", match.thread[msgs]?.from === perspective ? "justify-end" : "justify-start")}>
          <span className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">{match.ui.typing}</span>
        </div>
      )}
    </div>
  );
}
