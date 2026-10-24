import type { Metadata, Viewport } from "next";
import Nav from "@/components/tripos/Nav";
import HeroVisual from "@/components/tripos/HeroVisual";
import Showcase from "@/components/tripos/Showcase";
import EarlyAccessForm from "@/components/tripos/EarlyAccessForm";
import { Icon, Wordmark } from "@/components/tripos/Icons";
import { yearsOfService, FOUNDED_YEAR } from "@/lib/brand";
import {
  AUDIENCES,
  CAPABILITIES,
  CONTACT,
  FAQS,
  GT_SITE,
  NAV_LINKS,
  PROBLEMS,
  ROADMAP,
  STEPS,
  TRIPOS_PATH,
} from "@/lib/tripos/content";

// Static, re-rendered daily so the footer year rolls over without a deploy.
export const revalidate = 86400;

const TITLE = "TripOS — Travel Agency Management Software | Golden Travels";
const DESCRIPTION =
  "Discover TripOS, a travel agency platform being built to connect customer enquiries, conversations, quotations, and everyday travel business workflows.";

export const metadata: Metadata = {
  // `absolute` skips the root "%s | Golden Travels" template.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  // Resolves against metadataBase → https://www.goldentravels.co/tripos.
  // The apex goldentravels.co/tripos 308-redirects here (next.config.ts).
  alternates: { canonical: TRIPOS_PATH },
  robots: { index: true, follow: true },
  // Override the travel-services keywords inherited from the root layout.
  keywords: ["TripOS", "travel agency software", "travel agency management", "travel CRM India", "quotation software for travel agents"],
  openGraph: {
    type: "website",
    siteName: "TripOS by Golden Travels",
    title: "TripOS — Travel agency software, in development",
    description: DESCRIPTION,
    url: TRIPOS_PATH,
    // No TripOS-specific OG image exists yet; empty array stops the Golden
    // Travels coach photo from the root layout being inherited here.
    images: [],
  },
  twitter: {
    card: "summary",
    title: "TripOS — Travel agency software, in development",
    description: DESCRIPTION,
    images: [],
  },
};

export const viewport: Viewport = { themeColor: "#14213D" };

export default function TriposPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[14px] focus:shadow"
      >
        Skip to content
      </a>
      <Nav />

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section id="top" className="relative overflow-hidden">
          <div aria-hidden="true" className="tp-hero-bg pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_1.08fr] lg:gap-14 lg:pb-28 lg:pt-20">
            <div className="tp-rise">
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--tp-line)] bg-white px-3 py-1 text-[13px] font-medium text-[var(--tp-ink)]">
                <span className="tp-pulse h-1.5 w-1.5 rounded-full bg-[var(--tp-gold)]" aria-hidden="true" />
                Currently in development
              </p>
              <h1 className="mt-6 text-[clamp(2.5rem,1.6rem+4vw,4.4rem)] font-[680] leading-[1.02] tracking-[-0.045em] text-[var(--tp-navy)] [text-wrap:balance]">
                Run your travel agency with less chaos.
              </h1>
              <p className="tp-lede mt-6 max-w-[34rem] !text-[18px]">
                Meet TripOS, a travel agency operating platform being built to bring customer enquiries, conversations,
                quotes, and day-to-day sales workflows into one connected workspace.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#early-access" className="tp-btn tp-btn-primary !min-h-[48px] !px-6">
                  Get Early Access <Icon name="arrow" size={16} />
                </a>
                <a href="#product" className="tp-btn tp-btn-ghost !min-h-[48px] !px-6">
                  Explore the Product
                </a>
              </div>
              <p className="mt-8 text-[13.5px] text-[var(--tp-slate)]">
                Built from real travel operations experience at{" "}
                <a href={GT_SITE} className="font-medium text-[var(--tp-ink)] underline decoration-[var(--tp-line)] underline-offset-4 hover:decoration-[var(--tp-gold)]">
                  Golden Travels
                </a>
                , in travel since {FOUNDED_YEAR}.
              </p>
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* ── Problem ──────────────────────────────────────────────── */}
        <section aria-labelledby="problem-h" className="border-t border-[var(--tp-line)] bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="tp-eyebrow">The problem</p>
              <h2 id="problem-h" className="tp-h2 mt-3 text-[var(--tp-navy)]">Your agency deserves better than disconnected tools.</h2>
              <p className="tp-lede mt-4">
                For many travel businesses, the work behind each trip is spread across chats, spreadsheets and
                documents. Some of this may sound familiar.
              </p>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROBLEMS.map((p) => (
                <li key={p.title} className="tp-card p-6">
                  <span className="tp-icon"><Icon name={p.icon} /></span>
                  <h3 className="mt-5 text-[16.5px] font-semibold tracking-[-0.01em] text-[var(--tp-ink)]">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--tp-slate)]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Approach / workflow ──────────────────────────────────── */}
        <section id="workflows" aria-labelledby="workflow-h" className="tp-dark py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="tp-eyebrow">The TripOS approach</p>
              <h2 id="workflow-h" className="tp-h2 mt-3 text-white">One connected workflow, from enquiry to quote.</h2>
              <p className="tp-lede mt-4">
                TripOS starts where most agency work starts: a customer conversation. Each step carries its context into
                the next, so nothing has to be copied across tools.
              </p>
            </div>

            <ol className="relative mt-14 grid gap-4 lg:grid-cols-4 lg:gap-5">
              {/* connector: vertical on mobile, horizontal on desktop */}
              <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-[var(--tp-gold)] via-white/20 to-white/5 lg:hidden" />
              <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-[27px] hidden h-px bg-gradient-to-r from-[var(--tp-gold)] via-white/25 to-white/10 lg:block" />
              {STEPS.map((s, i) => (
                <li key={s.n} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                  <span
                    className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border text-[14px] font-semibold ${
                      i === 0 ? "border-[var(--tp-gold)] bg-[var(--tp-gold)] text-[#1b1405]" : "border-white/15 bg-[#1b2a4b] text-white"
                    }`}
                  >
                    {s.n}
                  </span>
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:mt-5 lg:w-full">
                    <h3 className="text-[17px] font-semibold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#a7b0c2]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-[13.5px] text-[#8e98ad]">
              Channel integrations are being built one at a time, starting with WhatsApp. Not every channel connects
              today.
            </p>
          </div>
        </section>

        {/* ── Capabilities ─────────────────────────────────────────── */}
        <section id="product" aria-labelledby="product-h" className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="tp-eyebrow">Product</p>
                <h2 id="product-h" className="tp-h2 mt-3 text-[var(--tp-navy)]">Built around the way travel agencies actually work.</h2>
              </div>
              <ul className="flex flex-wrap gap-2 text-[12px]" aria-label="Status key">
                <li className="tp-pill tp-pill-core">Built in TripOS today</li>
                <li className="tp-pill tp-pill-dev">In development</li>
                <li className="tp-pill tp-pill-roadmap">Roadmap</li>
              </ul>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((c) => (
                <li
                  key={c.title}
                  className={`tp-card tp-card-hover flex flex-col p-6 ${c.tone === "roadmap" ? "border-dashed bg-transparent" : ""}`}
                >
                  <span className="tp-icon"><Icon name={c.icon} /></span>
                  <h3 className="mt-5 text-[16.5px] font-semibold tracking-[-0.01em] text-[var(--tp-ink)]">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[var(--tp-slate)]">{c.body}</p>
                  <span className={`tp-pill tp-pill-${c.tone} mt-5 self-start`}>{c.status}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13.5px] text-[var(--tp-slate)]">
              &ldquo;Built in TripOS today&rdquo; means the capability exists in the application under development. It
              does not mean TripOS is generally available.
            </p>
          </div>
        </section>

        {/* ── Showcase ─────────────────────────────────────────────── */}
        <section aria-labelledby="showcase-h" className="border-y border-[var(--tp-line)] bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="tp-eyebrow">Inside TripOS</p>
              <h2 id="showcase-h" className="tp-h2 mt-3 text-[var(--tp-navy)]">See how the pieces fit together.</h2>
              <p className="tp-lede mt-4">
                One customer, one conversation, one quote, connected. These are concept views with fictional data, and
                the shipped interface may differ.
              </p>
            </div>
            <Showcase />
          </div>
        </section>

        {/* ── Audience ─────────────────────────────────────────────── */}
        <section aria-labelledby="audience-h" className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="tp-eyebrow">Who it&apos;s for</p>
              <h2 id="audience-h" className="tp-h2 mt-3 text-[var(--tp-navy)]">Designed for travel businesses that want to work smarter.</h2>
              <p className="tp-lede mt-4">
                TripOS is initially focused on travel businesses that sell trips through conversations and quotes.
                Capabilities will broaden as development progresses.
              </p>
            </div>
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {AUDIENCES.map((a, i) => (
                <li key={a.title} className="tp-card p-7">
                  <span className="tp-icon"><Icon name={["agency", "compass", "user"][i]} /></span>
                  <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.015em] text-[var(--tp-ink)]">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--tp-slate)]">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Roadmap ──────────────────────────────────────────────── */}
        <section id="roadmap" aria-labelledby="roadmap-h" className="border-t border-[var(--tp-line)] bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
              <div>
                <p className="tp-eyebrow">Roadmap</p>
                <h2 id="roadmap-h" className="tp-h2 mt-3 text-[var(--tp-navy)]">A bigger operating system for travel.</h2>
                <p className="tp-lede mt-4">
                  Beyond enquiries and quotes, this is where we want TripOS to go. Priorities will be shaped by
                  feedback from agencies.
                </p>
                <p className="mt-6 inline-flex items-start gap-2 rounded-xl border border-dashed border-[#d5d8df] px-4 py-3 text-[13.5px] font-medium text-[var(--tp-ink)]">
                  <Icon name="spark" size={16} className="mt-0.5 shrink-0 text-[var(--tp-gold-ink)]" />
                  Product roadmap. Planned capabilities, subject to development.
                </p>
              </div>
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--tp-line)] bg-[var(--tp-line)] sm:grid-cols-2">
                {ROADMAP.map((r) => (
                  <li key={r.title} className="bg-[var(--tp-paper)] p-5">
                    <div className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full border-[1.5px] border-[var(--tp-slate)]" />
                      <h3 className="text-[15.5px] font-semibold text-[var(--tp-ink)]">{r.title}</h3>
                    </div>
                    <p className="mt-1.5 pl-[18px] text-[14.5px] leading-relaxed text-[var(--tp-slate)]">{r.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Why / About ──────────────────────────────────────────── */}
        <section id="about" aria-labelledby="about-h" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <p className="tp-eyebrow">Why we&apos;re building TripOS</p>
              <h2 id="about-h" className="tp-h2 mt-3 text-[var(--tp-navy)]">Built from real travel operations experience.</h2>
              <div className="mt-6 space-y-4 text-[17px] leading-[1.7] text-[#3d4a60]">
                <p>
                  Travel is a people business, but the work behind every journey can become unnecessarily complicated.
                  Customer conversations, quotations, follow-ups, and operational details often end up scattered across
                  different tools.
                </p>
                <p>
                  Golden Travels has spent decades working in the travel industry. TripOS is being built from the belief
                  that travel businesses deserve software designed around the way they actually operate.
                </p>
                <p>
                  Our goal is to help agencies bring more of their everyday workflow into one connected workspace, while
                  keeping the human relationships that make travel personal.
                </p>
              </div>
            </div>
            <div className="tp-card self-start p-7">
              <div className="text-[13px] font-medium text-[var(--tp-slate)]">The company behind TripOS</div>
              <div className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-[var(--tp-navy)]">Golden Travels</div>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--tp-slate)]">
                A Bengaluru travel business operating since {FOUNDED_YEAR}: airport transfers, outstation travel,
                pilgrimage tours and corporate transportation.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--tp-line)] bg-[var(--tp-line)]">
                <div className="bg-white p-4">
                  <dt className="text-[12.5px] text-[var(--tp-slate)]">In travel since</dt>
                  <dd className="mt-0.5 text-[20px] font-semibold text-[var(--tp-ink)]">{FOUNDED_YEAR}</dd>
                </div>
                <div className="bg-white p-4">
                  <dt className="text-[12.5px] text-[var(--tp-slate)]">Years of operation</dt>
                  <dd className="mt-0.5 text-[20px] font-semibold text-[var(--tp-ink)]">{yearsOfService()}</dd>
                </div>
              </dl>
              <a href={GT_SITE} className="tp-btn tp-btn-ghost mt-6 w-full">
                Visit goldentravels.co <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Early access ─────────────────────────────────────────── */}
        <section id="early-access" aria-labelledby="ea-h" className="tp-dark py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <p className="tp-eyebrow">Early access</p>
              <h2 id="ea-h" className="tp-h2 mt-3 text-white">Help shape the future of travel agency software.</h2>
              <div className="tp-lede mt-5 space-y-4">
                <p>
                  TripOS is actively being developed, and we&apos;re interested in hearing from travel agencies that want
                  a more connected way to manage enquiries and quotations.
                </p>
                <p>
                  Tell us about your business and the workflows you&apos;d most like to improve. We&apos;ll use that
                  feedback to help shape the product.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 p-5">
                <div className="text-[14px] font-semibold text-white">Prefer to talk first?</div>
                <p className="mt-1 text-[14px] text-[#a7b0c2]">Reach the Golden Travels team directly.</p>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <a href={CONTACT.waHref} className="tp-btn tp-btn-ghost-dark" target="_blank" rel="noopener noreferrer">
                    Talk to Golden Travels <span className="sr-only">on WhatsApp (opens in a new tab)</span>
                  </a>
                  <a href={CONTACT.mailHref} className="tp-btn tp-btn-ghost-dark">
                    Email us
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#101b33] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-8">
              <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-white">Request early access</h3>
              <p className="mb-6 mt-1 text-[14px] text-[#a7b0c2]">Takes about a minute.</p>
              <EarlyAccessForm />
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-h" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="tp-eyebrow">FAQ</p>
              <h2 id="faq-h" className="tp-h2 mt-3 text-[var(--tp-navy)]">Questions, answered honestly.</h2>
            </div>
            <div className="divide-y divide-[var(--tp-line)] border-y border-[var(--tp-line)]">
              {FAQS.map((f) => (
                <details key={f.q} className="tp-faq group">
                  <summary className="flex min-h-[60px] items-center justify-between gap-6 py-5 text-[16.5px] font-semibold text-[var(--tp-ink)]">
                    {f.q}
                    <span className="tp-chev grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--tp-line)] text-[var(--tp-slate)] group-hover:text-[var(--tp-ink)]">
                      <Icon name="plus" size={16} />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-12 text-[15.5px] leading-relaxed text-[var(--tp-slate)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
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
                  <a href={l.href} className="text-[var(--tp-slate)] hover:text-[var(--tp-ink)]">{l.label}</a>
                </li>
              ))}
              <li><a href="#early-access" className="text-[var(--tp-slate)] hover:text-[var(--tp-ink)]">Early access</a></li>
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
            <span>© {year} Golden Travels. All rights reserved.</span>
            <span>TripOS is in development. Features and availability may change.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
