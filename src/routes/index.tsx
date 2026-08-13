import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import {
  AudiencePaths,
  Benefits,
  HowItWorks,
  LiveCases,
  PracticeAreas,
  PulseBand,
  Pricing,
  Resources,
  TrustStrip,
  VerificationBand,
} from "@/components/site/Sections";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatWidget } from "@/components/site/ChatWidget";
import { StickyMobileCta } from "@/components/site/StickyMobileCta";
import { TopLawyers } from "@/components/site/TopLawyers";
import { Contact } from "@/components/site/Contact";
import { content } from "@/lib/content";

const meta = content.es.meta;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.ogTitle },
      { property: "og:description", content: meta.ogDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background scroll-smooth pb-[4.25rem] sm:pb-0">
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <AudiencePaths />
        <PracticeAreas />
        <HowItWorks />
        <VerificationBand />
        <TopLawyers />
        <PulseBand />
        <LiveCases />
        <Benefits />
        <Pricing />
        <Resources />
        <Contact />
      </main>
      <SiteFooter />
      <ChatWidget />
      <StickyMobileCta />
    </div>
  );
}
