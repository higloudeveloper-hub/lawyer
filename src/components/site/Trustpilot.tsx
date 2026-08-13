import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

function StarBox({ size, lit, delay }: { size: number; lit: boolean; delay: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      className={cn(lit ? "animate-truststar" : "opacity-0")}
      style={{ animationDelay: lit ? `${delay}ms` : undefined }}
    >
      <rect width="24" height="24" rx="3" fill="#00B67A" />
      <path
        fill="#fff"
        d="M12 4.55 14.12 9.4l5.28.48-4.02 3.46 1.22 5.16L12 15.92 7.4 18.5l1.22-5.16-4.02-3.46 5.28-.48z"
      />
    </svg>
  );
}

function Wordmark({ size }: { size: "sm" | "md" }) {
  const icon = size === "sm" ? 14 : 16;
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" width={icon} height={icon} aria-hidden>
        <path
          fill="#00B67A"
          d="M12 2.2 15.09 8.9l7.21.66-5.5 4.72 1.66 7.04L12 17.8 5.54 21.32l1.66-7.04-5.5-4.72 7.21-.66z"
        />
      </svg>
      <span
        className={cn(
          "font-medium tracking-tight text-brand-foreground",
          size === "sm" ? "text-[0.7rem]" : "text-[0.82rem]",
        )}
      >
        Trustpilot
      </span>
    </span>
  );
}

export function TrustpilotRating({
  score,
  count,
  size = "md",
  className,
}: {
  score: string;
  count: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const box = size === "sm" ? 16 : 20;

  return (
    <div ref={ref} className={cn("flex flex-wrap items-center gap-2.5", className)}>
      <Wordmark size={size} />
      <span className="flex items-center gap-[2px]" aria-label={`${score} / 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarBox key={i} size={box} lit={inView} delay={80 + i * 110} />
        ))}
      </span>
      <span
        className={cn(
          "tabular-nums text-brand-foreground",
          size === "sm" ? "text-[0.75rem]" : "text-sm",
        )}
      >
        {score}
      </span>
      <span className={cn("text-brand-foreground/70", size === "sm" ? "text-[0.62rem]" : "text-xs")}>
        {count}
      </span>
    </div>
  );
}
