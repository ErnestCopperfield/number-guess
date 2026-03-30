type GuessStatusType = "ready" | "submitted" | "latest" | "synced";

const variants: Record<GuessStatusType, { label: string; className: string }> = {
  ready: { label: "Ready", className: "chip-ready" },
  submitted: { label: "Submitted", className: "chip-submitted" },
  latest: { label: "Latest Guess", className: "chip-latest" },
  synced: { label: "Synced", className: "chip-synced" }
};

export function GuessStatusChip({ type }: { type: GuessStatusType }) {
  const variant = variants[type];
  return <span className={`guess-chip ${variant.className}`}>{variant.label}</span>;
}
