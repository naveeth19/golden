/** Line icons for the TripOS page. 24px grid, 1.6 stroke, currentColor. */

const PATHS: Record<string, React.ReactNode> = {
  inbox: (
    <>
      <path d="M3 13h5l1.5 2.5h5L16 13h5" />
      <path d="M5.5 5h13L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5h16v10H9l-5 4z" />
      <path d="M8.5 10.5h7" />
    </>
  ),
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
      <path d="M3.5 4v4h4M12 8v4.5l3 1.8" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.5V6l8-3 8 3v14.5" />
      <path d="M2.5 20.5h19M9 9h1.5M13.5 9H15M9 13h1.5M13.5 13H15M10.5 20.5v-3.5h3v3.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8" />
    </>
  ),
  agency: (
    <>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  spark: <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
};

export function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

/**
 * TripOS mark: three stops (enquiry → customer → quote) joined by one route,
 * inside a rounded tile. Original geometry — not derived from the Golden
 * Travels logo.
 */
export function TripOSMark({ size = 28, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={dark ? "#ffffff" : "#14213D"} />
      <path
        d="M9 21.5c0-3 2.2-4.5 5-4.5h4c2.8 0 5-1.5 5-4.5"
        fill="none"
        stroke={dark ? "#14213D" : "#ffffff"}
        strokeOpacity="0.55"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="21.5" r="2.6" fill={dark ? "#14213D" : "#ffffff"} />
      <circle cx="16" cy="17" r="2.1" fill={dark ? "#14213D" : "#ffffff"} fillOpacity="0.8" />
      <circle cx="23" cy="10.5" r="2.9" fill="#C99A45" />
    </svg>
  );
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <TripOSMark dark={dark} />
      <span
        className="text-[19px] font-semibold tracking-[-0.03em]"
        style={{ color: dark ? "#fff" : "var(--tp-navy)" }}
      >
        Trip<span style={{ color: "var(--tp-gold)" }}>OS</span>
      </span>
    </span>
  );
}
