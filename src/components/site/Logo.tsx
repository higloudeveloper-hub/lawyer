export function Logo({
  className = "",
  href = "/",
  onDark = false,
  compact = false,
}: {
  className?: string;
  href?: string;
  onDark?: boolean;
  compact?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex min-w-0 items-center gap-2.5 ${className}`}
      aria-label="D2LE2 Law"
    >
      <span
        className={`relative grid shrink-0 place-items-center ${compact ? "h-8 w-7" : "h-9 w-8 sm:h-11 sm:w-10"}`}
      >
        <svg viewBox="0 0 40 46" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M2 3h36v27c0 8-9 12-18 15C11 42 2 38 2 30V3z"
            className="fill-brand"
          />
        </svg>
        <span className="relative text-ui text-[0.5rem] leading-[0.85] text-brand-foreground sm:text-[0.55rem]">
          D2
          <br />
          LE2
        </span>
      </span>
      <span className="min-w-0">
        <span
          className={`block truncate text-display leading-none ${compact ? "text-[1.05rem]" : "text-base sm:text-lg"} ${onDark ? "text-brand-foreground" : "text-foreground"}`}
        >
          D2LE2 Law
        </span>
        {!compact && (
          <span className={`mt-0.5 block truncate text-kicker ${onDark ? "text-brand-foreground/70" : "text-brand"}`}>
            Marketplace legal
          </span>
        )}
      </span>
    </a>
  );
}
