import Link from "next/link";
import type { GuessRecord } from "@/lib/types";
import { GuessStatusChip } from "@/components/GuessStatusChip";
import { formatAddress, formatTimeLabel } from "@/lib/format";

export function LatestGuessPanel({
  record,
  title = "Latest guess signal",
  subtitle = "Your freshest number on chain"
}: {
  record?: GuessRecord | null;
  title?: string;
  subtitle?: string;
}) {
  if (!record) {
    return null;
  }

  return (
    <section className="latest-panel">
      <div className="latest-top">
        <div>
          <div className="section-kicker">{title}</div>
          <h2 className="section-title">{subtitle}</h2>
        </div>
        <GuessStatusChip type="latest" />
      </div>

      <div className="mega-number">{record.number}</div>
      <div className="score-grid">
        <div className="score-cell">
          <span className="score-label">Owner</span>
          <span className="score-value">{formatAddress(record.owner)}</span>
        </div>
        <div className="score-cell">
          <span className="score-label">Updated</span>
          <span className="score-value">{formatTimeLabel(record.createdAt)}</span>
        </div>
      </div>
      <Link href={`/records/${record.id}`} className="ghost-button">
        Open record plate
      </Link>
    </section>
  );
}
