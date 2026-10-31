import { Wordmark } from "./Icons";
import { CONTACT, DATA_DELETION_PATH, GT_SITE, NAV_LINKS, PRIVACY_PATH } from "@/lib/tripos/content";

/**
 * TripOS footer, shared by the landing page and the legal pages. `base` is
 * prefixed to the in-page anchors so they still reach /tripos from a subpage.
 */
export default function Footer({ base = "" }: { base?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--tp-line)] bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-[var(--tp-slate)]">
            TripOS is a travel business platform under development by{" "}
            <a href={GT_SITE} className="font-medium text-[var(--tp-ink)] underline decoration-[var(--tp-line)] underline-offset-4 hover:decoration-[var(--tp-gold)]">
              Golden Travels
            </a>
            .
          </p>
        </div>
        <nav aria-label="Footer">
          <div className="text-[13px] font-semibold text-[var(--tp-ink)]">Product</div>
          <ul className="mt-3 space-y-2 text-[14.5px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={`${base}${l.href}`} className="text-[var(--tp-slate)] hover:text-[var(--tp-ink)]">{l.label}</a>
              </li>
            ))}
            <li><a href={`${base}#early-access`} className="text-[var(--tp-slate)] hover:text-[var(--tp-ink)]">Early access</a></li>
          </ul>
        </nav>
        <div>
          <div className="text-[13px] font-semibold text-[var(--tp-ink)]">Contact</div>
          <ul className="mt-3 space-y-2 text-[14.5px] text-[var(--tp-slate)]">
            <li><a href={CONTACT.mailHref} className="hover:text-[var(--tp-ink)]">{CONTACT.email}</a></li>
            <li><a href={CONTACT.telHref} className="hover:text-[var(--tp-ink)]">{CONTACT.phoneDisplay}</a></li>
            <li><a href={GT_SITE} className="hover:text-[var(--tp-ink)]">goldentravels.co</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--tp-line)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-6 text-[13px] text-[var(--tp-slate)] sm:flex-row sm:justify-between sm:px-6">
          <span>
            © {year} Golden Travels. All rights reserved.
            <span aria-hidden="true"> · </span>
            <a href={PRIVACY_PATH} className="hover:text-[var(--tp-ink)] underline-offset-4 hover:underline">Privacy Policy</a>
            <span aria-hidden="true"> · </span>
            <a href={DATA_DELETION_PATH} className="hover:text-[var(--tp-ink)] underline-offset-4 hover:underline">Data Deletion</a>
          </span>
          <span>TripOS is in development. Features and availability may change.</span>
        </div>
      </div>
    </footer>
  );
}
