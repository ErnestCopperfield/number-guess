"use client";

import Link from "next/link";
import { ActionBar } from "@/components/ActionBar";
import { GuessStatusChip } from "@/components/GuessStatusChip";
import { GuessRecordCard } from "@/components/GuessRecordCard";
import { LatestGuessPanel } from "@/components/LatestGuessPanel";
import { useGuessAppData } from "@/lib/hooks";

export function HomeHub() {
  const { latestGuess, recentRecords, isConnected, guessCount } = useGuessAppData();

  return (
    <div className="page-grid">
      <section className="home-hero">
        <div className="hero-topline">
          <div className="hero-copy">
            <div className="section-kicker">Game entry</div>
            <h2 className="page-title">Guess now</h2>
            <p>Jump straight into a bright one-tap number game on Base.</p>
          </div>
          <div className="hero-badge">{isConnected ? "Wallet linked" : "Wallet idle"}</div>
        </div>

        <div className="quick-launch">
          <Link href="/guess" className="hub-card hub-card-primary">
            <div className="card-icon">GO</div>
            <div>
              <p className="card-label">Start guessing</p>
              <p className="card-caption">Open the control pad</p>
            </div>
          </Link>

          <Link href="/me" className="hub-card hub-card-secondary">
            <div className="card-icon">ME</div>
            <div>
              <p className="card-label">View my guess</p>
              <p className="card-caption">Check your latest number</p>
            </div>
          </Link>
        </div>

        <div className="status-strip" style={{ marginTop: 16 }}>
          <div>
            <strong>{guessCount}</strong>
            <div className="record-meta">
              <span>Total personal guesses</span>
            </div>
          </div>
          <div className="chip-row">
            <GuessStatusChip type="ready" />
            <GuessStatusChip type="synced" />
          </div>
        </div>
      </section>

      <div style={{ display: "grid", gap: 16 }}>
        <LatestGuessPanel record={latestGuess} title="Latest guess" subtitle="Your active number plate" />
        {recentRecords[0] ? <GuessRecordCard record={recentRecords[0]} /> : null}
        <section className="panel-card">
          <div className="section-kicker">Quick jump</div>
          <h2 className="section-title">Play lanes</h2>
          <p className="panel-note">Keep the flow short. Guess, sync, and reopen your latest record.</p>
          <ActionBar>
            <Link href="/guess" className="primary-button link-pill">Open pad</Link>
            <Link href="/history" className="ghost-button">Browse history</Link>
          </ActionBar>
        </section>
      </div>
    </div>
  );
}
