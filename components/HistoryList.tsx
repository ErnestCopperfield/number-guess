import Link from "next/link";
import type { GuessRecord } from "@/lib/types";
import { GuessStatusChip } from "@/components/GuessStatusChip";
import { formatAddress, formatTimeLabel } from "@/lib/format";

export function HistoryList({ records }: { records: GuessRecord[] }) {
  return (
    <section className="history-list">
      {records.map((record) => (
        <Link key={record.id} href={`/records/${record.id}`} className="history-item">
          <div>
            <div className="history-number">{record.number}</div>
            <div className="record-meta">
              <span>{formatAddress(record.owner)}</span>
              <span>{formatTimeLabel(record.createdAt)}</span>
            </div>
          </div>
          <GuessStatusChip type={record.status} />
        </Link>
      ))}
    </section>
  );
}
