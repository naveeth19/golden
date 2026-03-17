import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import AboutSection from "@/components/sections/AboutSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ClientLogos from "@/components/sections/ClientLogos";
import FleetScroll from "@/components/sections/FleetScroll";
import PackagesGrid from "@/components/sections/PackagesGrid";
import Testimonials from "@/components/sections/Testimonials";
import CtaBanner from "@/components/sections/CtaBanner";

export const dynamic = 'force-dynamic';

const tickerItems = [
  "Outstation Rentals",
  "Airport Services",
  "City Taxi",
  "Enterprise Transport",
  "Event Management",
  "Pilgrimage Tours",
  "Corporate Travel",
  "Wedding Transport",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Scrolling Ticker */}
      <div className="bg-[var(--gt-navy)] py-4 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-white/30 text-sm mx-8 uppercase tracking-widest font-light">
              {item}
            </span>
          ))}
        </div>
      </div>

      <AboutSection />
      <ServicesGrid />
      <WhyUsSection />
      <ClientLogos />
      <FleetScroll />
      <PackagesGrid />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
