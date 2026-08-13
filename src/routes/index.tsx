import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import {
  AudiencePaths,
  Benefits,
  ClientNeed,
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
import { ScrollRail } from "@/components/site/ScrollRail";
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
    <div className="min-h-screen bg-background scroll-smooth pb-[calc(4.15rem+env(safe-area-inset-bottom))] sm:pb-0">
      <SiteHeader />
      <ScrollRail />
      <main>
        <Hero />
        <TrustStrip />
        <ClientNeed />
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
      <div className="hidden sm:contents">
        <ChatWidget />
      </div>
      <StickyMobileCta />
    </div>
  );
}
