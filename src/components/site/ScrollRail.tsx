import { useLocale } from "@/lib/locale";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

const chapters = ["#inicio", "#como-funciona", "#verificacion", "#abogados", "#precios", "#contacto"] as const;

export function ScrollRail() {
  const { t } = useLocale();
  const active = useActiveSection(chapters);
  const labels = t.header.nav.filter((item) => chapters.includes(item.href as (typeof chapters)[number]));

  return (
    <nav
      aria-label="Secciones"
      className="pointer-events-none fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {labels.map((item) => {
          const on = active === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                title={item.label}
                aria-current={on ? "true" : undefined}
                className="group flex items-center gap-2.5"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-500",
                    on ? "h-5 w-1 bg-brand" : "h-1 w-1 bg-foreground/25 group-hover:bg-foreground/55",
                  )}
                />
                <span
                  className={cn(
                    "text-ui text-[0.62rem] tracking-wide transition-opacity duration-300",
                    on ? "text-foreground opacity-100" : "opacity-0 group-hover:opacity-70",
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
