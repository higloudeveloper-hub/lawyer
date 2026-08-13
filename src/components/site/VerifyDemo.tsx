import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Check, RefreshCw, ShieldCheck, UserRoundCheck, Lock } from "lucide-react";
import photo1 from "@/assets/lawyers/lawyer-1.jpg";
import photo2 from "@/assets/lawyers/lawyer-2.jpg";
import photo3 from "@/assets/lawyers/lawyer-3.jpg";
import photo4 from "@/assets/lawyers/lawyer-4.jpg";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

const photos = [photo1, photo2, photo3, photo4];
const SEAL_HOLD_MS = 1500;

const verifyIcons = [ShieldCheck, BadgeCheck, Lock, UserRoundCheck];

type Beat = "idle" | "scan" | "scanned" | "splash" | "splashOut" | "id" | "idOk" | "face" | "faceOk" | "sealed";

const BEAT_MS: Record<Beat, number> = {
  idle: 400,
  scan: 2200,
  scanned: 560,
  splash: 1400,
  splashOut: 400,
  id: 2000,
  idOk: 520,
  face: 1900,
  faceOk: 520,
  sealed: 0,
};

const NEXT: Record<Beat, Beat | null> = {
  idle: "scan",
  scan: "scanned",
  scanned: "splash",
  splash: "splashOut",
  splashOut: "id",
  id: "idOk",
  idOk: "face",
  face: "faceOk",
  faceOk: "sealed",
  sealed: null,
};

function showsStripe(who: number, total: number) {
  return who === 1 || who === total - 1;
}

function nextBeat(beat: Beat, who: number, total: number): Beat | null {
  if (beat === "scanned") return showsStripe(who, total) ? "splash" : "id";
  return NEXT[beat];
}

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
      { threshold: 0.16, rootMargin: "0px 0px -4% 0px" },
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

function useReadout(total: number, active: boolean, done: boolean, gap = 340) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (done) {
      setCount(total);
      return;
    }
    if (!active) {
      setCount(0);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return;
    }
    setCount(1);
    let n = 1;
    const id = window.setInterval(() => {
      n += 1;
      setCount(Math.min(total, n));
      if (n >= total) window.clearInterval(id);
    }, gap);
    return () => window.clearInterval(id);
  }, [active, done, total, gap]);

  return count;
}

function stageOf(beat: Beat) {
  if (beat === "idle" || beat === "scan" || beat === "scanned") return 1;
  if (beat === "splash" || beat === "splashOut" || beat === "id" || beat === "idOk") return 2;
  if (beat === "face" || beat === "faceOk") return 3;
  return 4;
}

function isSplash(beat: Beat) {
  return beat === "splash" || beat === "splashOut";
}

type VerifyCopy = ReturnType<typeof useLocale>["t"]["verify"];
type Applicant = VerifyCopy["applicants"][number];

const faceImg = "h-full w-full object-cover object-center";

function readsFor(verify: VerifyCopy, person: Applicant) {
  const license = verify.licenseReads.map((item, i) => {
    if (i === 1) return { ...item, done: person.name };
    if (i === 2) return { ...item, done: `${person.barState} ${person.barNo}` };
    return item;
  });
  const doc = verify.docReads.map((item, i) => {
    if (i === 1) return { ...item, done: person.name };
    if (i === 2) return { ...item, done: person.dob };
    if (i === 3) return { ...item, done: person.idNo };
    return item;
  });
  const selfie = verify.selfieReads.map((item, i) => (i === 2 ? { ...item, done: person.match } : item));
  return { license, doc, selfie };
}

export function VerifyDemo() {
  const { t } = useLocale();
  const { verify } = t;
  const { ref, inView } = useInView<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const [beat, setBeat] = useState<Beat>("idle");
  const [runId, setRunId] = useState(0);
  const [who, setWho] = useState(0);
  const roster = verify.applicants;
  const person = roster[who] ?? roster[0];
  const photo = photos[who] ?? photos[0];
  const last = who >= roster.length - 1;
  const { license: licenseItems, doc: docItems, selfie: selfieItems } = readsFor(verify, person);

  useEffect(() => {
    if (!inView) return;
    if (reduced) setBeat("sealed");
  }, [inView, reduced]);

  useEffect(() => {
    if (!inView || reduced) return;
    const next = nextBeat(beat, who, roster.length);
    if (!next) return;
    const tmr = window.setTimeout(() => setBeat(next), BEAT_MS[beat]);
    return () => window.clearTimeout(tmr);
  }, [inView, reduced, beat, runId, who, roster.length]);

  useEffect(() => {
    if (!inView || reduced || beat !== "sealed" || last) return;
    const tmr = window.setTimeout(() => {
      setWho((n) => n + 1);
      setBeat("idle");
      setRunId((n) => n + 1);
    }, SEAL_HOLD_MS);
    return () => window.clearTimeout(tmr);
  }, [inView, reduced, beat, last, runId]);

  const startAt = (index: number, nextBeat: Beat = "idle") => {
    setWho(index);
    setBeat(reduced ? "sealed" : nextBeat);
    setRunId((n) => n + 1);
  };

  const replay = () => startAt(0);

  const nextLawyer = () => startAt(Math.min(who + 1, roster.length - 1));

  const stage = stageOf(beat);

  const jump = (n: number) => {
    const map: Beat[] = ["idle", showsStripe(who, roster.length) ? "splash" : "id", "face", "sealed"];
    setBeat(map[n - 1] ?? "scan");
    setRunId((x) => x + 1);
  };

  const closeSplash = () => {
    if (!isSplash(beat)) return;
    setBeat("id");
    setRunId((n) => n + 1);
  };

  const advance = () => {
    if (reduced) return;
    if (isSplash(beat)) {
      closeSplash();
      return;
    }
    if (beat === "sealed") {
      if (last) replay();
      else nextLawyer();
      return;
    }
    if (stage === 1) jump(2);
    else if (stage === 2) jump(3);
    else jump(4);
  };

  const actionLabel =
    beat === "sealed"
      ? last
        ? verify.replay
        : verify.ui.nextLawyer
      : isSplash(beat)
        ? verify.ui.stripeContinue
        : stage === 3
          ? verify.ui.nextSeal
          : stage === 2
            ? verify.ui.nextFace
            : verify.ui.nextDoc;
  const licenseDone = beat === "scanned" || stage > 1;
  const docDone = beat === "idOk" || stage > 2;
  const faceDone = beat === "faceOk" || stage > 3;
  const licenseReads = useReadout(licenseItems.length, beat === "scan", licenseDone, 380);
  const docReads = useReadout(docItems.length, beat === "id", docDone, 360);
  const faceReads = useReadout(selfieItems.length, beat === "face", faceDone, 400);
  const sealedReads = verify.checks.map((item) => ({ label: item.title, done: item.done }));
  const reads =
    stage === 4 ? sealedReads : stage === 3 ? selfieItems : stage === 2 ? docItems : licenseItems;
  const readCount = stage === 4 ? reads.length : stage === 3 ? faceReads : stage === 2 ? docReads : licenseReads;
  const readDone = stage === 4 || (stage === 3 ? faceDone : stage === 2 ? docDone : licenseDone);
  const readoutTitle =
    stage === 4
      ? verify.ui.resultReady
      : stage === 3
        ? verify.ui.liveCapture
        : stage === 2
          ? verify.ui.extracting
          : verify.ui.querying;

  return (
    <section id="verificacion" className="hidden bg-surface py-12 sm:block sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-kicker text-brand">{verify.label}</p>
            <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
              {verify.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{verify.text}</p>
          </div>
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-brand sm:self-auto"
          >
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.75} />
            {verify.replay}
          </button>
        </Reveal>

        <div ref={ref} className="relative mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm sm:mt-12">
          {isSplash(beat) && (
            <StripeSplash
              verify={verify}
              person={person}
              photo={photo}
              closing={beat === "splashOut"}
              onContinue={closeSplash}
            />
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-ink px-4 py-2.5 text-brand-foreground sm:px-5">
            <p className="text-kicker">{verify.desk}</p>
            <p className="font-mono text-[0.65rem] text-brand-foreground/70">{person.sessionId}</p>
          </div>

          <ol className="grid grid-cols-4 gap-px bg-border">
            {verify.stages.map((item, i) => {
              const n = i + 1;
              const done = stage > n;
              const active = stage === n;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => jump(n)}
                    className={cn(
                      "w-full px-2 py-3 text-left transition-colors sm:px-4",
                      active ? "bg-accent" : "bg-card",
                    )}
                  >
                    <span className={cn("block text-xs sm:text-sm", active || done ? "text-foreground" : "text-muted-foreground")}>
                      {done ? "✓ " : `${n}. `}
                      {item.title}
                    </span>
                    <span className="mt-0.5 hidden text-[0.65rem] text-muted-foreground sm:block">{item.hint}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="relative h-0.5 bg-muted">
            <div
              className="h-full bg-brand transition-[width] duration-500 ease-out"
              style={{ width: `${((who + stage / 4) / roster.length) * 100}%` }}
            />
          </div>

          <ul className="grid grid-cols-4 gap-px bg-border">
            {roster.map((item, i) => {
              const active = i === who;
              const done = i < who || (i === who && beat === "sealed");
              return (
                <li key={item.sessionId}>
                  <button
                    type="button"
                    onClick={() => startAt(i)}
                    className={cn(
                      "flex w-full items-center gap-2 px-2 py-2 text-left transition-colors sm:px-3 sm:py-2.5",
                      active ? "bg-accent" : "bg-card",
                    )}
                  >
                    <span className="relative shrink-0">
                      <img
                        src={photos[i]}
                        alt=""
                        className="h-9 w-9 rounded-sm object-cover object-center sm:h-10 sm:w-10"
                      />
                      {done && (
                        <BadgeCheck className="absolute -right-1 -bottom-1 h-3.5 w-3.5 text-brand" strokeWidth={1.75} />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block truncate text-xs", active || done ? "text-foreground" : "text-muted-foreground")}>
                        {item.name.split(" ")[0]}
                      </span>
                      <span className="hidden truncate text-[0.65rem] text-muted-foreground sm:block">
                        {item.barState} · {item.role}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="grid bg-surface lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="relative h-[26rem] p-3 sm:h-[32rem] sm:p-5">
              <div
                className={cn(
                  "absolute inset-4 transition-opacity duration-500 ease-out sm:inset-6",
                  stage === 1 ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <BigLicense
                  key={`${who}-${runId}-lic`}
                  verify={verify}
                  person={person}
                  photo={photo}
                  scanning={beat === "scan"}
                  scanned={licenseDone}
                  seen={licenseReads}
                  onActivate={advance}
                />
              </div>
              <div
                className={cn(
                  "absolute inset-4 transition-opacity duration-500 ease-out sm:inset-6",
                  stage === 2 ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <StripeDoc
                  key={`${who}-${runId}-id`}
                  verify={verify}
                  person={person}
                  photo={photo}
                  scanning={beat === "id"}
                  scanned={docDone}
                  seen={docReads}
                  onActivate={advance}
                />
              </div>
              <div
                className={cn(
                  "absolute inset-4 transition-opacity duration-500 ease-out sm:inset-6",
                  stage === 3 ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <BigFace
                  key={`${who}-${runId}-face`}
                  verify={verify}
                  person={person}
                  photo={photo}
                  scanning={beat === "face"}
                  confirmed={faceDone}
                  seen={faceReads}
                  onActivate={advance}
                />
              </div>
              <div
                className={cn(
                  "absolute inset-4 transition-opacity duration-500 ease-out sm:inset-6",
                  stage === 4 ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <ApprovalSeal
                  key={`${who}-${runId}-seal`}
                  verify={verify}
                  person={person}
                  photo={photo}
                  onReplay={last ? replay : nextLawyer}
                />
              </div>
            </div>
            <Readout
              title={readoutTitle}
              session={`${verify.ui.refLabel} ${person.sessionId}`}
              hint={verify.ui.rosterHint}
              items={reads}
              count={readCount}
              allDone={readDone}
              found={verify.ui.found}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-5">
            <p className="text-xs text-muted-foreground">{isSplash(beat) ? verify.ui.stripeOpen : verify.ui.tapHint}</p>
            <button
              type="button"
              onClick={advance}
              className="animate-ctapulse inline-flex items-center rounded bg-brand px-4 py-2 text-ui text-xs text-brand-foreground transition-colors hover:bg-brand-dark"
            >
              {actionLabel}
            </button>
          </div>
        </div>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {verify.items.map((item, i) => {
            const Icon = verifyIcons[i] ?? ShieldCheck;
            const lit = stage > Math.min(i + 1, 3);
            return (
              <Reveal as="li" key={item.title} delay={i * 80} className="border-t border-foreground/15 pt-5">
                <Icon className={cn("h-5 w-5", lit ? "text-brand" : "text-foreground/30")} strokeWidth={1.5} />
                <h3 className="mt-3 text-display text-sm text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:mt-10 sm:flex-row sm:items-center">
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">{verify.note}</p>
          <a
            href="/registro/abogado"
            className="inline-flex items-center gap-2 rounded bg-brand px-5 py-3 text-ui text-xs text-brand-foreground transition-colors hover:bg-brand-dark"
          >
            {verify.cta} →
          </a>
        </div>
      </div>
    </section>
  );
}

function StripeSplash({
  verify,
  person,
  photo,
  closing,
  onContinue,
}: {
  verify: VerifyCopy;
  person: Applicant;
  photo: string;
  closing: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink/55 p-4">
      <button
        type="button"
        onClick={onContinue}
        className={cn(
          "w-full max-w-[22rem] rounded-xl border border-border bg-card p-5 text-left shadow-panel sm:p-6",
          closing ? "animate-stripeout" : "animate-stripein",
        )}
      >
        <p className="text-ui text-[0.7rem] tracking-tight text-muted-foreground">
          <span className="font-semibold text-[#635BFF]">stripe</span>
          <span className="ml-1 text-foreground/70">Identity</span>
        </p>
        <p className="mt-4 text-ui text-base font-medium text-foreground">{verify.ui.stripeVerify}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{verify.ui.stripeNote}</p>
        <div className="mt-5 flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
          <img src={photo} alt="" className="h-10 w-10 rounded-full object-cover object-center" />
          <div className="min-w-0">
            <p className="truncate text-sm text-foreground">{person.name}</p>
            <p className="truncate text-xs text-muted-foreground">{person.loc}</p>
          </div>
        </div>
        <span className="mt-5 flex w-full items-center justify-center rounded-lg bg-[#635BFF] px-4 py-2.5 text-ui text-xs text-white">
          {verify.ui.stripeContinue}
        </span>
        <p className="mt-3 text-center text-[0.65rem] text-muted-foreground">{verify.ui.stripeSecure}</p>
      </button>
    </div>
  );
}

function BigLicense({
  verify,
  person,
  photo,
  scanning,
  scanned,
  seen,
  onActivate,
}: {
  verify: VerifyCopy;
  person: Applicant;
  photo: string;
  scanning: boolean;
  scanned: boolean;
  seen: number;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 sm:px-5">
        <div className="min-w-0">
          <p className="truncate text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">{person.issuer}</p>
          <p className="truncate text-sm text-foreground">{verify.ui.barPortal}</p>
        </div>
        <span className="shrink-0 font-mono text-[0.65rem] tabular-nums text-muted-foreground">
          {person.barState} {person.barNo}
        </span>
      </header>
      <div className="h-0.5 bg-muted">
        <div
          className={cn("h-full bg-brand", scanning ? "animate-barquery" : scanned ? "w-full" : "w-0")}
        />
      </div>

      <div className="flex flex-1 gap-4 p-4 sm:gap-5 sm:p-5">
        <img
          src={photo}
          alt=""
          className={cn(
            "h-[5.5rem] w-[5.5rem] shrink-0 rounded-sm object-cover object-center ring-1 ring-border sm:h-28 sm:w-28",
            "transition-opacity duration-500 ease-out",
            seen >= 1 ? "opacity-100" : "opacity-35",
          )}
        />
        <div className="min-w-0 flex-1">
          <p className={cn("text-display text-xl leading-tight text-foreground transition-opacity duration-500 sm:text-2xl", seen >= 2 ? "opacity-100" : "opacity-30")}>
            {person.name}
          </p>
          <p className={cn("mt-1 text-sm text-muted-foreground transition-opacity duration-500", seen >= 2 ? "opacity-100" : "opacity-30")}>
            {person.role} · {person.loc}
          </p>
          <p className={cn("mt-3 font-mono text-sm tabular-nums text-foreground transition-opacity duration-500", seen >= 3 ? "opacity-100" : "opacity-25")}>
            {person.barState} {person.barNo}
          </p>
          <p
            className={cn(
              "mt-3 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[0.7rem] transition-opacity duration-500",
              seen >= 4 ? "border-brand/25 bg-accent text-foreground opacity-100" : "border-border text-muted-foreground opacity-30",
            )}
          >
            <i className={cn("h-1.5 w-1.5 rounded-full", seen >= 4 ? "bg-brand" : "bg-muted-foreground/40")} />
            {verify.ui.eligible}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-px border-t border-border bg-border">
        <div className="bg-card px-4 py-3">
          <dt className="text-[0.65rem] text-muted-foreground">{verify.ui.admittedLabel}</dt>
          <dd className={cn("mt-1 text-sm text-foreground transition-opacity duration-500", seen >= 4 ? "opacity-100" : "opacity-25")}>
            {person.admitted}
          </dd>
        </div>
        <div className="bg-card px-4 py-3">
          <dt className="text-[0.65rem] text-muted-foreground">{verify.ui.discipline}</dt>
          <dd className={cn("mt-1 text-sm text-foreground transition-opacity duration-500", seen >= 5 || scanned ? "opacity-100" : "opacity-25")}>
            {verify.ui.disciplineNone}
          </dd>
        </div>
      </dl>

      <footer className="flex items-center justify-between border-t border-border px-4 py-2.5 text-sm">
        <span className="inline-flex items-center gap-1.5 text-foreground">
          {scanned && <Check className="h-4 w-4 text-brand" />}
          {scanned ? verify.ui.barFound : verify.ui.querying}
        </span>
        <span className="text-[0.65rem] text-muted-foreground">{verify.ui.standing}</span>
      </footer>
    </button>
  );
}

const idTone: Record<string, string> = {
  TX: "bg-[oklch(0.42_0.12_25)]",
  FL: "bg-[oklch(0.40_0.09_85)]",
  IN: "bg-[oklch(0.36_0.08_252)]",
  CA: "bg-[oklch(0.38_0.10_350)]",
};

function StripeDoc({
  verify,
  person,
  photo,
  scanning,
  scanned,
  seen,
  onActivate,
}: {
  verify: VerifyCopy;
  person: Applicant;
  photo: string;
  scanning: boolean;
  scanned: boolean;
  seen: number;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-[oklch(0.13_0.02_255)] text-left"
    >
      <div className="flex items-center justify-between px-4 py-2.5 text-brand-foreground">
        <span className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.16em] uppercase">
          <i className={cn("h-1.5 w-1.5 rounded-full", scanning ? "animate-livepulse bg-red-400" : "bg-emerald-400")} />
          {scanning ? verify.ui.placeIdFrame : verify.ui.documentVerified}
        </span>
        <span className="font-mono text-[0.65rem] text-brand-foreground/55">{person.stripeSession}</span>
      </div>

      <div className="relative mx-3 flex flex-1 items-center justify-center overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_30%,oklch(0.24_0.03_255),oklch(0.10_0.02_255))] ring-1 ring-white/10">
        <span className="pointer-events-none absolute left-4 top-4 h-7 w-7 rounded-tl-md border-l-2 border-t-2 border-brand-foreground/70" />
        <span className="pointer-events-none absolute right-4 top-4 h-7 w-7 rounded-tr-md border-r-2 border-t-2 border-brand-foreground/70" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 rounded-bl-md border-b-2 border-l-2 border-brand-foreground/70" />
        <span className="pointer-events-none absolute right-4 bottom-4 h-7 w-7 rounded-br-md border-b-2 border-r-2 border-brand-foreground/70" />

        <div className="relative w-[min(100%,28rem)] overflow-hidden rounded-sm bg-[oklch(0.93_0.02_90)] text-[oklch(0.22_0.03_255)] shadow-[0_24px_44px_-16px_oklch(0_0_0/0.65)]">
          <div className={cn("flex items-center justify-between px-3 py-1.5 text-brand-foreground", idTone[person.barState] ?? idTone.TX)}>
            <p className="text-[0.58rem] font-semibold tracking-[0.18em] uppercase">{person.barState} · {verify.ui.idType}</p>
            <p className="text-[0.58rem] tracking-[0.14em]">{person.barState}</p>
          </div>
          <div className="flex gap-3 p-3 sm:p-4">
            <img
              src={photo}
              alt=""
              className={cn(
                "h-[6.2rem] w-[6.2rem] object-cover object-center ring-1 ring-black/15 transition-opacity duration-700 ease-out sm:h-[7.2rem] sm:w-[7.2rem]",
                seen >= 1 ? "opacity-100" : "opacity-30",
              )}
            />
            <div className="min-w-0 flex-1">
              <p className={cn("text-[0.58rem] uppercase tracking-[0.16em] text-black/45 transition-opacity duration-700 ease-out", seen >= 2 ? "opacity-100" : "opacity-25")}>
                {verify.ui.idType}
              </p>
              <p className={cn("mt-1 text-display text-lg leading-tight transition-opacity duration-700 ease-out sm:text-xl", seen >= 2 ? "opacity-100" : "opacity-20")}>
                {person.name}
              </p>
              <p className={cn("mt-2 text-xs transition-opacity duration-700 ease-out", seen >= 3 ? "opacity-100" : "opacity-20")}>
                {verify.ui.dobLabel} {person.dob}
              </p>
              <p className={cn("mt-1 font-mono text-sm tabular-nums transition-opacity duration-700 ease-out", seen >= 4 ? "opacity-100" : "opacity-20")}>
                {person.barState} {person.idNo}
              </p>
              <p className={cn("mt-1 text-[0.65rem] text-black/50 transition-opacity duration-700 ease-out", seen >= 4 ? "opacity-100" : "opacity-20")}>
                {person.loc}
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 border-t border-black/8 px-3 py-2">
            <span className="h-4 flex-1 bg-[repeating-linear-gradient(90deg,oklch(0.2_0.02_255)_0_2px,transparent_2px_4px)] opacity-70" />
            <span className="font-mono text-[0.52rem] text-black/40">{person.stripeSession}</span>
          </div>
          {scanning && (
            <span
              aria-hidden
              className="animate-licensescan pointer-events-none absolute inset-x-0 top-0 h-12 bg-[linear-gradient(180deg,transparent,oklch(0.72_0.1_250/0.45),transparent)]"
            />
          )}
        </div>
        {scanned && <span aria-hidden className="animate-shutterflash pointer-events-none absolute inset-0 bg-white" />}
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 text-brand-foreground">
        <p className="text-xs">{scanned ? verify.ui.documentVerified : verify.ui.extracting}</p>
        {scanned && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
            <Check className="h-3.5 w-3.5" />
            {verify.ui.captured}
          </span>
        )}
      </div>
    </button>
  );
}

function BigFace({
  verify,
  person,
  photo,
  scanning,
  confirmed,
  seen,
  onActivate,
}: {
  verify: VerifyCopy;
  person: Applicant;
  photo: string;
  scanning: boolean;
  confirmed: boolean;
  seen: number;
  onActivate: () => void;
}) {
  const prompt =
    confirmed || seen >= 4
      ? verify.ui.idConfirmed
      : seen >= 3
        ? verify.ui.blinkOnce
        : seen >= 2
          ? verify.ui.holdStill
          : verify.ui.lookCamera;
  const ring = Math.min(100, seen * 25);

  return (
    <button type="button" onClick={onActivate} className="relative h-full w-full overflow-hidden rounded-lg bg-ink">
      <img src={photo} alt="" className={faceImg} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_34%,oklch(0.10_0.03_255/0.62)_80%)]" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-2.5 text-brand-foreground">
        <span className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.16em] uppercase">
          <i className="animate-livepulse h-1.5 w-1.5 rounded-full bg-red-400" />
          {verify.ui.liveTag}
        </span>
        <span className="text-[0.65rem]">{verify.ui.stripeSelfie}</span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] h-52 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[50%] sm:h-64 sm:w-52"
        style={{
          background: `conic-gradient(oklch(0.78 0.1 250) ${ring}%, oklch(1 0 0 / 0.18) 0)`,
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
        }}
      />
      {confirmed && <span aria-hidden className="animate-shutterflash pointer-events-none absolute inset-0 bg-white" />}

      <div className="absolute inset-x-0 bottom-0 bg-ink/90 px-4 py-3 text-left text-brand-foreground">
        <p className="text-sm">{prompt}</p>
        <p className="mt-0.5 text-[0.65rem] text-brand-foreground/65">{verify.ui.compareHint}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-center">
              <img src={photo} alt="" className="h-10 w-10 rounded-sm object-cover object-center ring-1 ring-brand-foreground/25" />
              <span className="mt-1 block text-[0.58rem] text-brand-foreground/55">{verify.ui.idShot}</span>
            </span>
            <span className="text-center">
              <img
                src={photo}
                alt=""
                className={cn(
                  "h-10 w-10 rounded-sm object-cover object-center ring-1 ring-brand-foreground/40 transition-opacity",
                  seen >= 2 ? "opacity-100" : "opacity-30",
                )}
              />
              <span className="mt-1 block text-[0.58rem] text-brand-foreground/55">{verify.ui.liveShot}</span>
            </span>
          </div>
          <p
            className={cn(
              "text-display text-xl tabular-nums transition-opacity",
              seen >= 4 || confirmed ? "opacity-100" : "opacity-0",
            )}
          >
            {person.match}
          </p>
        </div>
      </div>
    </button>
  );
}

function Readout({
  title,
  session,
  hint,
  items,
  count,
  allDone,
  found,
}: {
  title: string;
  session: string;
  hint: string;
  items: readonly { label: string; done: string }[];
  count: number;
  allDone: boolean;
  found: string;
}) {
  return (
    <aside className="border-t border-border bg-card p-4 sm:p-5 lg:border-l lg:border-t-0">
      <p className="text-kicker text-brand">{title}</p>
      <p className="mt-1 font-mono text-[0.65rem] tabular-nums text-muted-foreground/80">{session}</p>
      <p className="mt-1 text-[0.65rem] text-muted-foreground/70">{hint}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, i) => {
          const on = allDone || i < count;
          const current = !allDone && i === count - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-start justify-between gap-3">
              <span className={cn("text-sm", on ? "text-foreground" : "text-muted-foreground/50")}>{item.label}</span>
              <span className={cn("shrink-0 font-mono text-[0.7rem] tabular-nums", on ? "text-brand" : "text-muted-foreground/40")}>
                {on ? (current && !allDone ? "…" : item.done) : "—"}
              </span>
            </li>
          );
        })}
      </ul>
      {allDone && (
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-brand">
          <Check className="h-3.5 w-3.5" />
          {found}
        </p>
      )}
    </aside>
  );
}

function ApprovalSeal({
  verify,
  person,
  photo,
  onReplay,
}: {
  verify: VerifyCopy;
  person: Applicant;
  photo: string;
  onReplay: () => void;
}) {
  const rows = [
    { label: verify.ui.checkBar, value: verify.ui.eligible },
    { label: verify.ui.checkId, value: verify.ui.verified },
    { label: verify.ui.checkLive, value: verify.ui.statusPassed },
    { label: verify.ui.checkMatch, value: person.match },
  ];

  return (
    <button
      type="button"
      onClick={onReplay}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left"
    >
      <header className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
        <img src={photo} alt="" className="h-12 w-12 rounded-sm object-cover object-center" />
        <div className="min-w-0">
          <p className="truncate text-sm text-foreground">{person.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {person.role} · {person.loc}
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-sm bg-accent px-2 py-1 text-[0.65rem] text-foreground">
          <Check className="h-3.5 w-3.5 text-brand" />
          {verify.ui.verified}
        </span>
      </header>

      <div className="flex flex-1 flex-col justify-center px-4 py-4 sm:px-5">
        <p className="text-kicker text-brand">{verify.ui.resultReady}</p>
        <p className="mt-1 text-sm text-muted-foreground">{verify.ui.unlock}</p>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-3 py-2.5">
              <span className="inline-flex items-center gap-2 text-sm text-foreground">
                <Check className="h-3.5 w-3.5 text-brand" />
                {row.label}
              </span>
              <span className="font-mono text-[0.7rem] tabular-nums text-muted-foreground">{row.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[0.65rem] text-muted-foreground sm:px-5">
        <span>
          {person.barState} {person.barNo}
        </span>
        <span>{verify.ui.verifiedBy}</span>
      </footer>
    </button>
  );
}
