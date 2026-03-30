"use client";

import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { HistoryList } from "@/components/HistoryList";
import { useGuessAppData } from "@/lib/hooks";

export function HistoryPage() {
  const { recentRecords } = useGuessAppData();

  return (
    <div className="history-layout">
      <section className="panel-card">
        <div className="section-kicker">Recent traffic</div>
        <h2 className="page-title">History feed</h2>
        <p className="panel-note">A light stream of fresh guesses collected from recent contract events.</p>
        <Link href="/guess" className="primary-button link-pill" style={{ marginTop: 14 }}>Make a new guess</Link>
      </section>

      {recentRecords.length ? (
        <HistoryList records={recentRecords} />
      ) : (
        <EmptyState icon="?" title="No records loaded" text="When no onchain events are available, this feed will wake up after the next guess." />
      )}
    </div>
  );
}
