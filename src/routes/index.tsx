import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import {
  AudiencePaths,
  Benefits,
  CaseBoard,
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
import { MobileHome } from "@/components/site/MobileHome";
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
    <div className="min-h-screen bg-background scroll-smooth pb-[calc(5.75rem+env(safe-area-inset-bottom))] max-sm:overflow-x-hidden sm:pb-0">
      <SiteHeader />
      <main>
        <MobileHome />
        <div className="hidden sm:contents">
          <Hero />
          <TrustStrip />
          <ClientNeed />
          <AudiencePaths />
          <PracticeAreas />
          <HowItWorks />
          <VerificationBand />
          <TopLawyers />
          <PulseBand />
          <CaseBoard />
          <LiveCases />
          <Benefits />
          <Pricing />
          <Resources />
          <Contact />
        </div>
      </main>
      <div className="hidden sm:block">
        <SiteFooter />
      </div>
      <div className="hidden sm:contents">
        <ChatWidget />
      </div>
      <StickyMobileCta />
    </div>
  );
}
