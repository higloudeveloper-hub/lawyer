import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import {
  Benefits,
  ContactCta,
  HowItWorks,
  Pricing,
  Resources,
  TrustStrip,
} from "@/components/site/Sections";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatWidget } from "@/components/site/ChatWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D2LE2 Law — Clientes migratorios en tiempo real" },
      {
        name: "description",
        content:
          "Plataforma para abogados: recibe clientes migratorios en tiempo real y decide a quién ayudar. Sin riesgos, sin compromisos, soporte en español 24/7.",
      },
      { property: "og:title", content: "D2LE2 Law — Clientes migratorios en tiempo real" },
      {
        property: "og:description",
        content:
          "Conectamos abogados con personas que necesitan ayuda migratoria. Tú decides a quién aceptar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <Benefits />
        <HowItWorks />
        <Pricing />
        <Resources />
        <ContactCta />
      </main>
      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
