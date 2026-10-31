import Nav from "./Nav";
import Footer from "./Footer";
import { LEGAL, TRIPOS_PATH } from "@/lib/tripos/content";

/** Shell for the TripOS legal pages: TripOS nav and footer around a readable column. */
export default function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[14px] focus:shadow"
      >
        Skip to content
      </a>
      <Nav base={TRIPOS_PATH} />

      <main id="main" className="mx-auto max-w-[760px] px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
        <p className="tp-eyebrow">Legal</p>
        <h1 className="tp-h2 mt-3 text-[var(--tp-navy)]">{title}</h1>
        <p className="mt-3 text-[14px] text-[var(--tp-slate)]">Last updated: {LEGAL.updated}</p>
        <div className="tp-lede mt-6">{intro}</div>
        <article className="tp-legal mt-10 border-t border-[var(--tp-line)] pt-4">{children}</article>
      </main>

      <Footer base={TRIPOS_PATH} />
    </>
  );
}
