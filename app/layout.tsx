import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Weight 900 (Playfair) and 300 (DM Sans) were declared but used nowhere in
// the codebase — three extra font files, ~110KB, on every page load.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://www.goldentravels.co";
const SITE_DESCRIPTION =
  "Golden Travels offers premium outstation rentals, airport transfers, pilgrimage tours, and corporate transport across South India since 1987. Based in Bengaluru.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Golden Travels",
    default: "Golden Travels — Premium Road Travel Since 1987 | Bengaluru",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "golden travels",
    "car rental bengaluru",
    "outstation cab bengaluru",
    "tirupati package bengaluru",
    "airport transfer bengaluru",
    "tempo traveller bengaluru",
  ],
  // NOTE: no `alternates.canonical` here on purpose. Metadata is inherited,
  // so a canonical set at the root makes every page declare itself a
  // duplicate of the homepage. Each route sets its own below.
  openGraph: {
    siteName: "Golden Travels",
    locale: "en_IN",
    type: "website",
    url: SITE_URL,
    title: "Golden Travels — Premium Road Travel Since 1987 | Bengaluru",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Golden Travels — Premium Road Travel Since 1987",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Travels — Premium Road Travel Since 1987 | Bengaluru",
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Golden Travels",
    description:
      "Premium road travel services since 1987. Outstation rentals, airport transfers, pilgrimage tours, and corporate transport across South India.",
    url: "https://www.goldentravels.co",
    telephone: "+919845033877",
    email: "naveeth@goldentravels.co",
    foundingDate: "1987",
    founder: {
      "@type": "Person",
      name: "Mr Lakshmana K Amin",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "No.1697/36, Dr Rajkumar Rd, Rajajinagar",
      addressLocality: "Bengaluru",
      postalCode: "560021",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9906",
      longitude: "77.5527",
    },
    image: "https://www.goldentravels.co/og-image.jpg",
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
        <Toaster />
        <JsonLd />
      </body>
    </html>
  );
}
