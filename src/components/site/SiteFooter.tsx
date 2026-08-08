import { Logo } from "./Logo";

const cols = [
  {
    title: "Plataforma",
    links: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Beneficios", href: "#beneficios" },
      { label: "Precios", href: "#precios" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Guías", href: "#recursos" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-foreground/10 bg-ink py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-foreground/60">
            Plataforma que conecta abogados con clientes migratorios en tiempo real. Disponible 24/7,
            en español.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-display text-[0.65rem] tracking-[0.2em] text-brand">{c.title}</h3>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-brand-foreground/70 transition-colors hover:text-brand-foreground"
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
        <p className="text-xs text-brand-foreground/45">
          © {new Date().getFullYear()} D2LE2 Law. Plataforma legal. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}