"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ActionBar } from "@/components/ActionBar";
import { EmptyState } from "@/components/EmptyState";
import { GuessInputPanel } from "@/components/GuessInputPanel";
import { GuessStatusChip } from "@/components/GuessStatusChip";
import { LatestGuessPanel } from "@/components/LatestGuessPanel";
import { useGuessAppData, useSubmitGuess } from "@/lib/hooks";

export function GuessArcadePage() {
  const { isConnected } = useAccount();
  const [value, setValue] = useState("");
  const { latestGuess, guessCount, recentRecords, refetchAll } = useGuessAppData();
  const submitGuess = useSubmitGuess({
    onSuccess: async () => {
      setValue("");
      await refetchAll();
    }
  });

  useEffect(() => {
    if (latestGuess && !value) {
      setValue(String(latestGuess.number));
    }
  }, [latestGuess, value]);

  const numericValue = Number(value);
  const isValid = value.length > 0 && numericValue >= 0 && numericValue <= 9999;

  return (
    <div className="guess-layout">
      <div style={{ display: "grid", gap: 16 }}>
        <section className="panel-card">
          <div className="section-kicker">Arcade mode</div>
          <h2 className="page-title">Number control</h2>
          <p className="panel-note">Type a number, send one tap, and refresh your latest signal.</p>
        </section>

        <GuessInputPanel
          value={value}
          onChange={setValue}
          onSubmit={() => submitGuess.submit(numericValue)}
          disabled={!isConnected || !isValid || submitGuess.isLoading}
          loading={submitGuess.isLoading}
        />

        {!isConnected ? (
          <EmptyState icon="?" title="Wallet needed" text="Connect a wallet to submit a number guess on Base." />
        ) : null}
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        <section className="score-board">
          <div className="latest-top">
            <div>
              <div className="section-kicker">Live status</div>
              <h2 className="section-title">Guess board</h2>
            </div>
            <GuessStatusChip type={submitGuess.isSuccess ? "submitted" : "synced"} />
          </div>
          <div className="score-grid">
            <div className="score-cell">
              <span className="score-label">Last input</span>
              <span className="score-value">{value || "----"}</span>
            </div>
            <div className="score-cell">
              <span className="score-label">Guess count</span>
              <span className="score-value">{guessCount}</span>
            </div>
          </div>
          <ActionBar>
            <Link href="/me" className="ghost-button">View my panel</Link>
            <Link href="/history" className="ghost-button">Open history</Link>
          </ActionBar>
        </section>

        <LatestGuessPanel record={latestGuess} title="Current result" subtitle="Latest synced number" />

        {recentRecords[0] ? (
          <section className="panel-card">
            <div className="section-kicker">Recent route</div>
            <h2 className="section-title">Open last record</h2>
            <ActionBar>
              <Link href={`/records/${recentRecords[0].id}`} className="primary-button link-pill">View detail</Link>
            </ActionBar>
          </section>
        ) : null}
      </div>
    </div>
  );
}
