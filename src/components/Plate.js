export function Plate({ children, className = "" }) {
  return (
    <span className={`plate ${className}`.trim()}>{children}</span>
  );
}

const tones = {
  rust: "border-rust text-rust",
  green: "border-green text-green",
  ink: "border-ink/80 text-ink",
  cream: "border-cream text-cream",
  yellow: "border-yellow text-yellow",
};

export function Stamp({ children, tone = "rust", className = "" }) {
  return (
    <span className={`stamp ${tones[tone] || tones.rust} ${className}`.trim()}>
      {children}
    </span>
  );
}

export function stampTone(tag) {
  if (tag === "PAPERS CLEAR" || tag === "DIESEL") return "green";
  if (tag === "SINGLE OWNER") return "ink";
  return "rust";
}
