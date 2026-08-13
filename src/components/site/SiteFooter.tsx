import { useLocale } from "@/lib/locale";
import { Logo } from "./Logo";

export function SiteFooter() {
  const { t } = useLocale();
  const { footer } = t;

  return (
    <footer id="aviso-legal" className="border-t border-brand-foreground/10 bg-ink py-12 max-sm:hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
        <div>
          <Logo onDark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-foreground/75">{footer.blurb}</p>
        </div>
        {footer.cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-kicker text-brand">{c.title}</h3>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-brand-foreground/75 transition-colors hover:text-brand-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-brand-foreground/10 px-4 pt-6 sm:px-6">
        <p className="max-w-3xl text-xs leading-relaxed text-brand-foreground/50">{footer.disclaimer}</p>
        <p className="mt-4 text-xs text-brand-foreground/40">
          © {new Date().getFullYear()} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
