import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Golden Travels",
    default: "Golden Travels — Premium Road Travel Since 1987 | Bengaluru",
  },
  description:
    "Golden Travels offers premium outstation rentals, airport transfers, pilgrimage tours, and corporate transport across South India since 1987. Based in Bengaluru.",
  keywords: [
    "golden travels",
    "car rental bengaluru",
    "outstation cab bengaluru",
    "tirupati package bengaluru",
    "airport transfer bengaluru",
    "tempo traveller bengaluru",
  ],
  openGraph: {
    siteName: "Golden Travels",
    locale: "en_IN",
    type: "website",
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
    email: "goldentravels@rediffmail.com",
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
