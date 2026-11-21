import type { Metadata, Viewport } from "next";
import CruiseFeature from "@/components/dubai-nye/CruiseFeature";
import Faq from "@/components/dubai-nye/Faq";
import Footer from "@/components/dubai-nye/Footer";
import Hero from "@/components/dubai-nye/Hero";
import Highlights from "@/components/dubai-nye/Highlights";
import Included from "@/components/dubai-nye/Included";
import Itinerary from "@/components/dubai-nye/Itinerary";
import PriceCountdown from "@/components/dubai-nye/PriceCountdown";
import Promise from "@/components/dubai-nye/Promise";
import Stay from "@/components/dubai-nye/Stay";
import StickyBar from "@/components/dubai-nye/StickyBar";
import TrackingLoader from "@/components/dubai-nye/TrackingLoader";
import { brand, faqs, hotel, included, itinerary, trip } from "@/components/dubai-nye/content";

export const dynamic = "force-static";

const PATH = "/dubai-new-year";
const URL = brand.pageUrl;
const TITLE = "Dubai New Year Package from Bangalore 2027 | New Year's Eve in Dubai | Golden Holidays";
const DESCRIPTION =
  "New Year in Dubai 2027 from Bengaluru: 5 nights / 6 days, 28 Dec 2026 to 2 Jan 2027. Return non-stop flights, Excelsior Hotel Deira, NYE fireworks canal cruise, Burj Khalifa Level 124, desert safari and more. ₹1,10,000 per person + GST.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Dubai New Year package from Bangalore",
    "New Year in Dubai 2027",
    "Dubai New Year's Eve cruise package",
    "Dubai tour package from Bengaluru",
    "Golden Holidays Dubai",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Golden Travels",
    title: "New Year's Eve in Dubai 2027 · Golden Holidays",
    description: "5 nights / 6 days from Bengaluru, with the NYE fireworks cruise. ₹1,10,000 per person + GST.",
    images: [{ url: "/images/dubai-nye/og.jpg", width: 1200, height: 630, alt: "New Year's Eve in Dubai 2027 by Golden Holidays" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Year's Eve in Dubai 2027 · Golden Holidays",
    description: "5 nights / 6 days from Bengaluru, with the NYE fireworks cruise.",
    images: ["/images/dubai-nye/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#12141F", colorScheme: "dark light" };

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${trip.name} 2027 · ${trip.duration}`,
    description: DESCRIPTION,
    url: URL,
    image: "https://www.goldentravels.co/images/dubai-nye/og.jpg",
    touristType: ["Couples", "Friends"],
    provider: {
      "@type": "TravelAgency",
      name: "Golden Travels (Golden Holidays)",
      url: "https://www.goldentravels.co",
      telephone: "+91-99029-33877",
      foundingDate: "1987",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Golden House, No.1697/36, Dr Rajkumar Rd, Prakash Nagar, Rajajinagar",
        addressLocality: "Bengaluru",
        postalCode: "560021",
        addressCountry: "IN",
      },
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: itinerary.length,
      itemListElement: itinerary.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        name: `Day ${d.day}, ${d.date}: ${d.title}`,
      })),
    },
    subjectOf: { "@type": "LodgingBusiness", name: hotel.name, address: "Deira, Dubai, United Arab Emirates" },
    offers: {
      "@type": "Offer",
      price: trip.priceNumber,
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: trip.priceNumber,
        priceCurrency: "INR",
        valueAddedTaxIncluded: false,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "person" },
      },
      availability: "https://schema.org/InStock",
      validFrom: "2026-11-01",
      validThrough: "2026-12-01T23:59:00+05:30",
      url: URL,
      description: included.join("; "),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function DubaiNewYearPage() {
  return (
    <main className="bg-night-900 font-dnye antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Promise />
      <CruiseFeature />
      <Highlights />
      <Stay />
      <Itinerary />
      <Included />
      <PriceCountdown />
      <Faq />
      <Footer />
      <StickyBar />
      <TrackingLoader />
    </main>
  );
}
