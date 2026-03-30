"use client";

import Link from "next/link";
import { ActionBar } from "@/components/ActionBar";
import { CopyGuessButton } from "@/components/CopyGuessButton";
import { EmptyState } from "@/components/EmptyState";
import { GuessStatusChip } from "@/components/GuessStatusChip";
import { useGuessRecordDetail } from "@/lib/hooks";
import { formatAddress, formatDateTime } from "@/lib/format";

export function GuessDetailPage({ id }: { id: string }) {
  const { record } = useGuessRecordDetail(id);

  if (!record) {
    return <EmptyState icon="?" title="Record not found" text="This guess plate is not available in the current feed." />;
  }

  return (
    <div className="detail-layout">
      <section className="detail-panel">
        <div className="latest-top">
          <div>
            <div className="section-kicker">Record plate</div>
            <h2 className="page-title">Guess detail</h2>
          </div>
          <GuessStatusChip type={record.status} />
        </div>

        <div className="detail-banner" style={{ marginTop: 16 }}>
          <span className="field-label">Guessed number</span>
          <div className="detail-number">{record.number}</div>
        </div>

        <div className="detail-grid">
          <div className="detail-row"><span>Owner</span><strong>{formatAddress(record.owner)}</strong></div>
          <div className="detail-row"><span>Status</span><strong>{record.statusLabel}</strong></div>
          <div className="detail-row"><span>Submitted</span><strong>{formatDateTime(record.createdAt)}</strong></div>
          <div className="detail-row"><span>Transaction</span><strong>{formatAddress(record.txHash)}</strong></div>
        </div>
      </section>

      <section className="panel-card">
        <div className="section-kicker">Actions</div>
        <h2 className="section-title">Record controls</h2>
        <p className="panel-note">Copy the result, jump back, or move into a fresh guess round.</p>
        <ActionBar>
          <CopyGuessButton text={`Guess ${record.number} by ${record.owner}`} />
          <Link href="/guess" className="primary-button link-pill">Guess again</Link>
          <Link href="/history" className="ghost-button">Back to history</Link>
        </ActionBar>
      </section>
    </div>
  );
}
