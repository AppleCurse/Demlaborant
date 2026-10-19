type MarkProps = { className?: string; title?: string };

/** Hand-drawn DemlaB mark: a conical flask whose body is filled to the %96 line,
 *  with a curling vine leaf at the neck (the pumpkin that turns into a carriage). */
export function DemlabMark({ className = "h-10 w-10", title = "DemlaB" }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      {/* cork / cap */}
      <path d="M18.2 3.4h11.6v3.2H18.2z" fill="currentColor" />
      <path d="M16.6 7.2h14.8v2.2H16.6z" fill="currentColor" opacity="0.55" />
      {/* flask body */}
      <path
        d="M20 9.6h8v8.6l11.1 19.4c1.1 1.9-.2 4.6-2.5 4.6H11.4c-2.3 0-3.6-2.7-2.5-4.6L20 18.2V9.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* liquid */}
      <path
        d="M13.2 31.1h21.6l4.2 7.3c1.1 1.9-.2 4.6-2.5 4.6H11.4c-2.3 0-3.6-2.7-2.5-4.6l4.3-7.3Z"
        fill="var(--color-ember, #c2571b)"
      />
      {/* meniscus */}
      <path d="M13.2 31.1c3.4-1.6 6.8 1.6 10.2 0s6.8-1.6 11.4 0" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      {/* rising bubbles */}
      <circle cx="19.4" cy="36.6" r="1.5" fill="var(--color-paper, #f4ead9)" opacity="0.9" />
      <circle cx="25.6" cy="38.4" r="1" fill="var(--color-paper, #f4ead9)" opacity="0.8" />
      <circle cx="29.2" cy="35.2" r="0.9" fill="var(--color-paper, #f4ead9)" opacity="0.7" />
      {/* vine leaf curling off the neck */}
      <path
        d="M28.2 13.4c4.6-2.6 9.4-1.6 11.6 1.2-2.6 3.4-7.4 4.4-11.2 2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Pressed wax seal used on certificates and order confirmation. */
export function WaxSeal({ className = "h-24 w-24", label }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={label ?? "Mühür"}>
      <path
        d="M60 4c11 0 17 6 27 8s17 1 21 11-3 16 0 26 9 14 4 23-14 9-22 14-11 13-21 13-15-8-25-11-17 0-23-7 0-16-3-25-8-14-2-22 12-9 23-12S49 4 60 4Z"
        fill="var(--color-ember, #c2571b)"
      />
      <path
        d="M60 4c11 0 17 6 27 8s17 1 21 11-3 16 0 26 9 14 4 23-14 9-22 14-11 13-21 13-15-8-25-11-17 0-23-7 0-16-3-25-8-14-2-22 12-9 23-12S49 4 60 4Z"
        fill="none"
        stroke="#7c2f0c"
        strokeWidth="1.4"
        opacity="0.55"
      />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#7c2f0c" strokeWidth="1.6" opacity="0.5" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="#f4ead9" strokeWidth="1" strokeDasharray="2 5" opacity="0.65" />
      {/* flask glyph pressed into the wax */}
      <g transform="translate(60 60) scale(1.45) translate(-24 -24)">
        <path
          d="M20 9.6h8v8.6l11.1 19.4c1.1 1.9-.2 4.6-2.5 4.6H11.4c-2.3 0-3.6-2.7-2.5-4.6L20 18.2V9.6Z"
          fill="none"
          stroke="#f4ead9"
          strokeWidth="2.4"
          strokeLinejoin="round"
          opacity="0.92"
        />
        <path d="M13.2 31.1h21.6l4.2 7.3c1.1 1.9-.2 4.6-2.5 4.6H11.4c-2.3 0-3.6-2.7-2.5-4.6l4.3-7.3Z" fill="#f4ead9" opacity="0.55" />
      </g>
    </svg>
  );
}

/** Ledger section mark: § numeral, hairline rule, tracked small caps. */
export function SectionMark({
  n,
  title,
  tone = "ink",
}: {
  n: string;
  title: string;
  tone?: "ink" | "paper";
}) {
  const line = tone === "paper" ? "bg-paper/35" : "bg-ink/25";
  const text = tone === "paper" ? "text-paper/75" : "text-mute";
  const num = tone === "paper" ? "text-ember-soft" : "text-ember";
  return (
    <div className="flex items-center gap-3">
      <span className={`label ${num}`}>§ {n}</span>
      <span className={`h-px w-10 ${line}`} />
      <span className={`label ${text}`}>{title}</span>
    </div>
  );
}
