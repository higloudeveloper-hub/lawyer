import { BadgeCheck, Star } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { Reveal } from "./Reveal";
import photo1 from "@/assets/lawyers/lawyer-1.jpg";
import photo2 from "@/assets/lawyers/lawyer-2.jpg";
import photo3 from "@/assets/lawyers/lawyer-3.jpg";
import photo4 from "@/assets/lawyers/lawyer-4.jpg";

const photos = [photo1, photo2, photo3, photo4];

export function TopLawyers() {
  const { t } = useLocale();
  const { lawyers } = t;

  return (
    <section id="abogados" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-kicker text-brand">{lawyers.label}</p>
            <h2 className="mt-2 text-display text-[1.75rem] leading-tight text-foreground sm:text-4xl">
              {lawyers.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{lawyers.text}</p>
          </div>
          <a
            href="/registro/cliente"
            className="text-ui text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            {lawyers.cta} →
          </a>
        </Reveal>

        <ul className="mt-10 grid gap-px bg-border sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {lawyers.items.map((lawyer, i) => (
            <Reveal as="li" key={lawyer.name} delay={i * 90} className="bg-background">
              <a href="/registro/cliente" className="group block h-full">
                <div className="overflow-hidden">
                  <img
                    src={photos[i]}
                    alt={lawyer.name}
                    width={640}
                    height={800}
                    className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-1 pt-5 pb-6 sm:px-2">
                  <h3 className="flex items-center gap-1.5 text-display text-sm text-foreground">
                    {lawyer.name}
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={1.75} />
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{lawyer.area}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-foreground">
                    <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                    <span className="tabular-nums">{lawyer.rating}</span>
                    <span className="text-muted-foreground">
                      · {lawyer.reviews} {lawyers.reviews}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {lawyer.years} · {lawyer.loc}
                  </p>
                  <span className="mt-4 inline-block text-ui text-xs text-brand transition-transform duration-300 group-hover:translate-x-1">
                    {lawyers.profile} →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
