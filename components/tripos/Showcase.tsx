"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icons";

/**
 * Interface showcase. Static, illustrative mockups switched with client state.
 * Nothing here calls an API. Controls inside the mockups are plain <span>s
 * styled as UI, never buttons, so nothing looks clickable and does nothing.
 */

const TABS = [
  { id: "inbox", label: "Inbox", icon: "chat" },
  { id: "customers", label: "Customers", icon: "user" },
  { id: "quotes", label: "Quotes", icon: "doc" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Showcase() {
  const [active, setActive] = useState<TabId>("inbox");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: React.KeyboardEvent, i: number) {
    const last = TABS.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(TABS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product views"
        className="mx-auto mb-6 flex w-fit gap-1 rounded-xl border border-[var(--tp-line)] bg-white p-1"
      >
        {TABS.map((t, i) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`tp-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`tp-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex min-h-[40px] items-center gap-2 rounded-lg px-3.5 text-[14px] font-medium transition-colors sm:px-5 ${
                selected ? "bg-[var(--tp-navy)] text-white" : "text-[var(--tp-slate)] hover:text-[var(--tp-ink)] hover:bg-[var(--tp-paper)]"
              }`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="tp-window">
        <div className="flex items-center justify-between border-b border-[var(--tp-line)] bg-[#fcfcfb] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-[#e3e5ea]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#e3e5ea]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#e3e5ea]" />
          </span>
          <span className="tp-mock-label">Illustrative concept · sample data</span>
        </div>

        {TABS.map((t) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`tp-panel-${t.id}`}
            aria-labelledby={`tp-tab-${t.id}`}
            hidden={active !== t.id}
            tabIndex={0}
            className="tp-fade focus-visible:!outline-offset-[-2px]"
          >
            {t.id === "inbox" && <InboxView />}
            {t.id === "customers" && <CustomerView />}
            {t.id === "quotes" && <QuotesView />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Views ───────────────────────────────────────────────────────────── */

const CONVOS = [
  { n: "Ananya Sharma", p: "Bali, 5 nights for two adults in March", t: "10:42", s: "Open", unread: true },
  { n: "Rohan Mehta", p: "Can we add one more day in Dubai?", t: "09:15", s: "Open", unread: true },
  { n: "Kavya Iyer", p: "Thanks, the Kerala quote looks good", t: "Yesterday", s: "Replied" },
  { n: "Arjun Nair", p: "Is the Coorg homestay available in May?", t: "Mon", s: "Replied" },
];

function InboxView() {
  return (
    <div className="grid md:grid-cols-[300px_1fr]">
      <ul className="border-b border-[var(--tp-line)] md:border-b-0 md:border-r">
        {CONVOS.map((c, i) => (
          <li
            key={c.n}
            className={`flex gap-3 border-b border-[var(--tp-line)] px-4 py-3 last:border-b-0 ${i === 0 ? "bg-[var(--tp-paper)]" : ""} ${i > 1 ? "hidden md:flex" : ""}`}
          >
            <Avatar name={c.n} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[14px] font-semibold text-[var(--tp-ink)]">{c.n}</span>
                <span className="shrink-0 text-[12px] text-[var(--tp-slate)]">{c.t}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="truncate text-[13px] text-[var(--tp-slate)]">{c.p}</span>
                {c.unread && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[var(--tp-gold)]" aria-label="Unread" />}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--tp-line)] pb-3">
          <div className="flex items-center gap-3">
            <Avatar name="Ananya Sharma" />
            <div>
              <div className="text-[14.5px] font-semibold text-[var(--tp-ink)]">Ananya Sharma</div>
              <div className="text-[12.5px] text-[var(--tp-slate)]">WhatsApp conversation · linked to customer</div>
            </div>
          </div>
          <span className="tp-pill tp-pill-core">Open</span>
        </div>
        <div className="flex flex-col gap-3 py-5 text-[14px] leading-snug">
          <p className="max-w-[85%] self-start rounded-2xl rounded-tl-md bg-[#f2f3f6] px-4 py-2.5">
            Hi! Planning Bali for two adults in March, around 5 nights. Could you share a quote?
          </p>
          <p className="max-w-[85%] self-end rounded-2xl rounded-tr-md bg-[var(--tp-navy)] px-4 py-2.5 text-white">
            Of course. Any preference between Ubud and the beach side?
          </p>
          <p className="max-w-[85%] self-start rounded-2xl rounded-tl-md bg-[#f2f3f6] px-4 py-2.5">A bit of both, please.</p>
          <div className="self-center rounded-full border border-[var(--tp-line)] px-3 py-1 text-[12px] text-[var(--tp-slate)]">
            Draft quote Q-1042 created
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-xl border border-[var(--tp-line)] px-3.5 py-2.5 text-[13.5px] text-[var(--tp-slate)]">
          Reply to Ananya…
        </div>
      </div>
    </div>
  );
}

function CustomerView() {
  return (
    <div className="grid gap-0 md:grid-cols-[320px_1fr]">
      <div className="border-b border-[var(--tp-line)] p-5 md:border-b-0 md:border-r">
        <div className="flex items-center gap-3">
          <Avatar name="Kavya Iyer" big />
          <div>
            <div className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--tp-ink)]">Kavya Iyer</div>
            <div className="text-[13px] text-[var(--tp-slate)]">Customer since Aug</div>
          </div>
        </div>
        <dl className="mt-5 space-y-3 text-[14px]">
          <Row k="Email" v="kavya.iyer@example.com" />
          <Row k="Phone" v="+91 ••••• ••587" />
          <Row k="City" v="Chennai" />
          <Row k="Preferred contact" v="WhatsApp" />
        </dl>
      </div>

      <div className="p-5">
        <div className="tp-mock-label mb-3">Trip context</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Destination", "Kerala"],
            ["Duration", "4 nights"],
            ["Travellers", "2 adults, 2 kids"],
            ["Month", "December"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-[var(--tp-line)] bg-[#fcfcfb] p-3">
              <div className="text-[12px] text-[var(--tp-slate)]">{k}</div>
              <div className="mt-0.5 text-[14px] font-semibold text-[var(--tp-ink)]">{v}</div>
            </div>
          ))}
        </div>

        <div className="tp-mock-label mb-3 mt-6">Recent activity</div>
        <ol className="relative space-y-4 border-l border-[var(--tp-line)] pl-5 text-[14px]">
          {[
            ["Replied on WhatsApp", "“Thanks, the Kerala quote looks good”", "Yesterday"],
            ["Quote Q-1035 shared", "Kerala backwaters · 4 nights", "2 days ago"],
            ["Enquiry received", "Family trip in December", "4 days ago"],
          ].map(([t, d, w]) => (
            <li key={t} className="relative">
              <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-[var(--tp-navy)] ring-4 ring-white" aria-hidden="true" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="font-medium text-[var(--tp-ink)]">{t}</span>
                <span className="text-[12px] text-[var(--tp-slate)]">{w}</span>
              </div>
              <div className="text-[13px] text-[var(--tp-slate)]">{d}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const QUOTES = [
  { ref: "Q-1042", c: "Ananya Sharma", trip: "Bali · 5 nights · 2 adults", s: "Draft", tone: "dev" },
  { ref: "Q-1039", c: "Rohan Mehta", trip: "Dubai · 4 nights · 3 adults", s: "Sent", tone: "roadmap" },
  { ref: "Q-1035", c: "Kavya Iyer", trip: "Kerala · 4 nights · family", s: "Accepted", tone: "core" },
  { ref: "Q-1031", c: "Arjun Nair", trip: "Coorg · 2 nights · 2 adults", s: "Sent", tone: "roadmap" },
];

function QuotesView() {
  return (
    <div className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[15px] font-semibold text-[var(--tp-ink)]">Quotes</div>
        <span className="rounded-lg bg-[var(--tp-navy)] px-3 py-1.5 text-[13px] font-medium text-white">New quote</span>
      </div>

      {/* Table on md+, stacked cards below so nothing shrinks to illegible */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[var(--tp-line)]">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-[#fcfcfb] text-[12.5px] text-[var(--tp-slate)]">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-medium">Reference</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Customer</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Trip</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
              <th scope="col" className="px-4 py-2.5"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {QUOTES.map((q) => (
              <tr key={q.ref} className="border-t border-[var(--tp-line)]">
                <td className="px-4 py-3 font-mono text-[13px] text-[var(--tp-ink)]">{q.ref}</td>
                <td className="px-4 py-3 font-medium text-[var(--tp-ink)]">{q.c}</td>
                <td className="px-4 py-3 text-[var(--tp-slate)]">{q.trip}</td>
                <td className="px-4 py-3"><span className={`tp-pill tp-pill-${q.tone}`}>{q.s}</span></td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--tp-navy)]">
                    Open quote <Icon name="arrow" size={14} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-2.5 md:hidden">
        {QUOTES.slice(0, 3).map((q) => (
          <li key={q.ref} className="rounded-xl border border-[var(--tp-line)] p-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[13px] text-[var(--tp-slate)]">{q.ref}</span>
              <span className={`tp-pill tp-pill-${q.tone}`}>{q.s}</span>
            </div>
            <div className="mt-1 text-[15px] font-semibold text-[var(--tp-ink)]">{q.c}</div>
            <div className="text-[13.5px] text-[var(--tp-slate)]">{q.trip}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--tp-navy)]">
              Open quote <Icon name="arrow" size={14} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Bits ────────────────────────────────────────────────────────────── */

function Avatar({ name, big = false }: { name: string; big?: boolean }) {
  const initials = name.split(" ").map((p) => p[0]).join("");
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-[#eef0f5] font-semibold text-[var(--tp-navy)] ${big ? "h-12 w-12 text-[15px]" : "h-9 w-9 text-[12.5px]"}`}
    >
      {initials}
    </span>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-[var(--tp-slate)]">{k}</dt>
      <dd className="truncate font-medium text-[var(--tp-ink)]">{v}</dd>
    </div>
  );
}
