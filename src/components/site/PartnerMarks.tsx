import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

function LawyersCom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 36" className={className} aria-hidden>
      <text
        x="0"
        y="26"
        fill="#0B3A6E"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="-0.04em"
      >
        Lawyers
        <tspan fill="#2F6DB5" fontWeight="600">
          .com
        </tspan>
      </text>
    </svg>
  );
}

function Avvo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 36" className={className} aria-hidden>
      <text
        x="0"
        y="27"
        fill="#00A651"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-0.06em"
      >
        avvo
      </text>
    </svg>
  );
}

function Martindale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 36" className={className} aria-hidden>
      <text
        x="0"
        y="25"
        fill="#1A2744"
        fontFamily="Source Serif 4, Source Serif, Georgia, serif"
        fontSize="20"
        fontWeight="600"
        letterSpacing="0.02em"
      >
        Martindale-Hubbell
      </text>
    </svg>
  );
}

function Justia({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 36" className={className} aria-hidden>
      <text
        x="0"
        y="26"
        fill="#1B4F9C"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="-0.03em"
      >
        Justia
      </text>
    </svg>
  );
}

const marks = [
  { name: "Lawyers.com", width: "w-[8.5rem] sm:w-[10rem]", Mark: LawyersCom },
  { name: "Avvo", width: "w-[4.5rem] sm:w-[5.25rem]", Mark: Avvo },
  { name: "Martindale-Hubbell", width: "w-[11.5rem] sm:w-[13.5rem]", Mark: Martindale },
  { name: "Justia", width: "w-[5.5rem] sm:w-[6.25rem]", Mark: Justia },
];

export function PartnerMarks() {
  const { t } = useLocale();
  const { benefits } = t;

  return (
    <Reveal className="mt-10 border-t border-border pt-10 sm:mt-16 sm:pt-14">
      <p className="text-center text-kicker text-muted-foreground">{benefits.partnersLabel}</p>
      <p className="mt-2 text-center text-display text-lg text-foreground sm:text-xl">{benefits.partnersUsa}</p>

      <ul className="mt-8 grid grid-cols-2 items-center gap-px overflow-hidden rounded-lg border border-border bg-border sm:mt-10 lg:grid-cols-4">
        {marks.map(({ name, width, Mark }, i) => (
          <li key={name}>
            <div
              className="flex h-[4.75rem] items-center justify-center bg-card px-4 transition-colors duration-300 hover:bg-surface sm:h-24"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Mark
                className={cn(
                  "h-7 opacity-80 grayscale transition-[filter,opacity,transform] duration-300 hover:scale-[1.03] hover:opacity-100 hover:grayscale-0 sm:h-8",
                  width,
                )}
              />
              <span className="sr-only">{name}</span>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
