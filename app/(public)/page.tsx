import HomeHero from "@/components/home/HomeHero";
import ProofStrip from "@/components/home/ProofStrip";
import ServicesEditorial from "@/components/home/ServicesEditorial";
import FleetRail from "@/components/home/FleetRail";
import ExperiencesBlock from "@/components/home/ExperiencesBlock";
import StoryQuote from "@/components/home/StoryQuote";
import ClosingCta from "@/components/home/ClosingCta";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage.
 *
 * The previous 11-section layout is intentionally preserved in
 * components/sections/ — nothing was deleted. Content that no longer appears
 * here is still reachable: AboutSection via /about, PackagesGrid via
 * /packages, and the client logos are folded into StoryQuote.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProofStrip />
      <ServicesEditorial />
      <FleetRail />
      <ExperiencesBlock />
      <StoryQuote />
      <ClosingCta />
    </>
  );
}
