import { Icon } from "./Icons";

/**
 * Hero product composition. Static HTML — it calls nothing and stores nothing.
 * All names and numbers are fictional; the phone number is masked on purpose
 * so it can never be a real person's.
 */
export default function HeroVisual() {
  return (
    <figure className="relative" aria-label="Illustrative TripOS concept: an enquiry, its conversation, the customer and a draft quote in one workspace">
      <div className="tp-window tp-pop" style={{ animationDelay: "120ms" }}>
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-[var(--tp-line)] bg-[#fcfcfb] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-[#e3e5ea]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#e3e5ea]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#e3e5ea]" />
          </span>
          <span className="flex-1 truncate text-center text-[12px] text-[var(--tp-slate)]">Inbox · Sample agency workspace</span>
          <span className="tp-mock-label">Concept</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr]">
          {/* Conversation list */}
          <div className="hidden sm:block border-r border-[var(--tp-line)] bg-[#fcfcfb] p-2.5">
            <div className="mb-2 flex items-center gap-2 rounded-lg border border-[var(--tp-line)] bg-white px-2.5 py-1.5 text-[12px] text-[var(--tp-slate)]">
              <Icon name="search" size={14} /> Search
            </div>
            {[
              { n: "Ananya Sharma", p: "Bali, 5 nights for two…", t: "10:42", active: true, unread: true },
              { n: "Rohan Mehta", p: "Can we add one more day…", t: "09:15", unread: true },
              { n: "Kavya Iyer", p: "Thanks, the quote looks…", t: "Yest." },
            ].map((c) => (
              <div
                key={c.n}
                className={`mb-1 rounded-lg px-2.5 py-2 ${c.active ? "bg-white border border-[var(--tp-line)] shadow-[0_1px_2px_rgba(20,33,61,0.05)]" : "border border-transparent"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[12.5px] font-semibold text-[var(--tp-ink)]">{c.n}</span>
                  <span className="text-[11px] text-[var(--tp-slate)]">{c.t}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="truncate text-[12px] text-[var(--tp-slate)]">{c.p}</span>
                  {c.unread && <i className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--tp-gold)]" aria-hidden="true" />}
                </div>
              </div>
            ))}
          </div>

          {/* Active conversation */}
          <div className="flex min-h-[300px] flex-col p-4 sm:pb-[118px]">
            <div className="flex items-center justify-between gap-2 border-b border-[var(--tp-line)] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eef0f5] text-[12px] font-semibold text-[var(--tp-navy)]">AS</span>
                <div>
                  <div className="text-[13.5px] font-semibold text-[var(--tp-ink)]">Ananya Sharma</div>
                  <div className="text-[11.5px] text-[var(--tp-slate)]">WhatsApp · Bali · 2 adults · 5 nights</div>
                </div>
              </div>
              <span className="tp-pill tp-pill-core">Open</span>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 py-4 text-[13px] leading-snug">
              <p className="max-w-[85%] self-start rounded-2xl rounded-tl-md bg-[#f2f3f6] px-3.5 py-2.5 text-[var(--tp-ink)]">
                Hi! Planning Bali for two adults in March, around 5 nights. Could you share a quote?
              </p>
              <p className="max-w-[85%] self-end rounded-2xl rounded-tr-md bg-[var(--tp-navy)] px-3.5 py-2.5 text-white">
                Of course. Preparing a quote with Ubud and Seminyak stays now.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[var(--tp-line)] px-3 py-2 text-[12.5px] text-[var(--tp-slate)]">
              <span className="flex-1">Reply to Ananya…</span>
              <span className="rounded-md bg-[var(--tp-paper)] px-2 py-1 text-[11.5px] font-medium text-[var(--tp-ink)] border border-[var(--tp-line)]">
                Create quote
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating quote card */}
      <div
        className="tp-pop relative -mt-8 ml-auto mr-3 w-[min(270px,82%)] rounded-xl border border-[var(--tp-line)] bg-white p-4 shadow-[0_24px_50px_-24px_rgba(20,33,61,0.45)] sm:absolute sm:-bottom-10 sm:-right-5 sm:mt-0 sm:mr-0 sm:w-[290px]"
        style={{ animationDelay: "380ms" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-medium text-[var(--tp-slate)]">Quote Q-1042</span>
          <span className="tp-pill tp-pill-dev">Draft</span>
        </div>
        <div className="mt-2 text-[15px] font-semibold tracking-[-0.01em] text-[var(--tp-ink)]">Bali · 5 nights</div>
        <div className="text-[12.5px] text-[var(--tp-slate)]">Ananya Sharma · 2 adults</div>
        <div className="mt-3 flex items-center gap-1.5 whitespace-nowrap text-[11.5px] text-[var(--tp-slate)]">
          {["Enquiry", "Customer", "Quote", "Follow-up"].map((s, i) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className={i <= 2 ? "font-semibold text-[var(--tp-navy)]" : ""}>{s}</span>
              {i < 3 && <span aria-hidden="true" className="text-[var(--tp-line)]">—</span>}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="mt-4 text-left text-[12px] text-[var(--tp-slate)] sm:mt-5 sm:max-w-[calc(100%-310px)]">
        Illustrative concept with sample data. Not live product data.
      </figcaption>
    </figure>
  );
}
