// Lightweight star display (0-5, supports halves). Pure SVG, no MUI dependency.
export default function Stars({ value = 0, size = 16, className = "" }) {
  const pct = Math.max(0, Math.min(5, value)) / 5 * 100;
  const star = (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" className="shrink-0">
      <path d="M10 1.6l2.5 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.1 2.8 1-5.8L1.7 7.7l5.8-.8L10 1.6z" />
    </svg>
  );
  const row = (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i}>{star}</span>
      ))}
    </div>
  );
  return (
    <div
      className={`relative inline-block ${className}`}
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      <div className="text-neutral-200 [&_path]:fill-current">{row}</div>
      <div className="absolute inset-0 overflow-hidden text-amber-500 [&_path]:fill-current" style={{ width: `${pct}%` }}>
        <div className="w-max">{row}</div>
      </div>
    </div>
  );
}
