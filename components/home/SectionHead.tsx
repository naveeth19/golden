/**
 * Shared section header for the homepage.
 *
 * The index number sits in a narrow left rail that runs the length of the
 * page — the device that gives the layout its editorial rhythm. Below `lg`
 * the rail collapses and the number sits inline with the eyebrow.
 */
export default function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  action,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8 items-start">
      {/* Index sits on the eyebrow's baseline, not the block's bottom edge. */}
      <div className="lg:col-span-1 lg:pt-px">
        <span
          className="block text-[13px] text-[var(--gt-red)]/50 tabular-nums"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {index}
        </span>
      </div>

      <div className="lg:col-span-7">
        <span className="block text-[10px] uppercase tracking-[0.28em] text-[var(--gt-muted)] mb-5">
          {eyebrow}
        </span>
        <h2
          className="text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[var(--gt-navy)]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </h2>
      </div>

      {(lede || action) && (
        <div className="lg:col-span-4 lg:self-end lg:pb-1">
          {lede && (
            <p className="text-sm leading-relaxed text-[var(--gt-muted)] max-w-sm">
              {lede}
            </p>
          )}
          {action && <div className="mt-5">{action}</div>}
        </div>
      )}
    </div>
  );
}
