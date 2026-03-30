import Link from "next/link";
import { GuessStatusChip } from "@/components/GuessStatusChip";
import type { GuessRecord } from "@/lib/types";
import { formatAddress, formatTimeLabel } from "@/lib/format";

export function GuessRecordCard({ record }: { record: GuessRecord }) {
  return (
    <article className="record-card">
      <div className="record-top">
        <div>
          <div className="section-kicker">Guess record</div>
          <div className="record-number">{record.number}</div>
        </div>
        <GuessStatusChip type={record.status} />
      </div>

      <div className="record-grid">
        <div className="score-cell">
          <span className="score-label">Owner</span>
          <span className="score-value">{formatAddress(record.owner)}</span>
        </div>
        <div className="score-cell">
          <span className="score-label">Time</span>
          <span className="score-value">{formatTimeLabel(record.createdAt)}</span>
        </div>
      </div>

      <div className="action-bar">
        <Link href={`/records/${record.id}`} className="primary-button link-pill">
          View record
        </Link>
      </div>
    </article>
  );
}
