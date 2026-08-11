/**
 * Landing route group layout.
 *
 * Deliberately bare: no site Nav, no Footer. Every navigation link on a paid
 * landing page is an exit. The page renders its own minimal header (logo +
 * tap-to-call) and closing footer. The root layout still applies — fonts,
 * Toaster, LocalBusiness JSON-LD — which is intended.
 */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
