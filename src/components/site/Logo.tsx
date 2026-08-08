export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#inicio"
      className={`flex min-w-0 items-center gap-2 sm:gap-3 ${className}`}
      aria-label="D2LE2 Law"
    >
      <span className="relative grid h-9 w-8 shrink-0 place-items-center sm:h-11 sm:w-10">
        <svg viewBox="0 0 40 46" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M2 3h36v27c0 8-9 12-18 15C11 42 2 38 2 30V3z"
            fill="oklch(0.5 0.2 27)"
            stroke="oklch(0.85 0.06 40)"
            strokeWidth="1.5"
          />
        </svg>
        <span className="relative text-display text-[0.5rem] leading-[0.85] text-brand-foreground sm:text-[0.6rem]">
          D2
          <br />
          LE2
        </span>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-display text-base leading-none text-brand-foreground sm:text-lg">
          D2LE2 Law
        </span>
        <span className="mt-0.5 block truncate text-display text-[0.52rem] tracking-[0.22em] text-brand sm:text-[0.6rem] sm:tracking-[0.28em]">
          Marketplace legal
        </span>
      </span>
    </a>
  );
}
