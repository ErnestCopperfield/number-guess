"use client";

import Link from "next/link";
import { ActionBar } from "@/components/ActionBar";
import { CopyGuessButton } from "@/components/CopyGuessButton";
import { EmptyState } from "@/components/EmptyState";
import { GuessStatusChip } from "@/components/GuessStatusChip";
import { useGuessAppData } from "@/lib/hooks";
import { formatAddress, formatTimeLabel } from "@/lib/format";

export function MyGuessPage() {
  const { latestGuess, address, guessCount, isConnected } = useGuessAppData();

  return (
    <div className="me-layout">
      <section className="personal-panel">
        <div className="personal-top">
          <div>
            <div className="section-kicker">Player summary</div>
            <h2 className="page-title">My latest guess</h2>
          </div>
          <GuessStatusChip type={latestGuess ? "latest" : "ready"} />
        </div>

        {latestGuess ? (
          <>
            <div className="mega-number" style={{ marginTop: 16 }}>{latestGuess.number}</div>
            <div className="detail-grid">
              <div className="detail-row"><span>Wallet</span><strong>{formatAddress(address)}</strong></div>
              <div className="detail-row"><span>Updated</span><strong>{formatTimeLabel(latestGuess.createdAt)}</strong></div>
              <div className="detail-row"><span>Total guesses</span><strong>{guessCount}</strong></div>
            </div>
            <ActionBar>
              <Link href={`/records/${latestGuess.id}`} className="primary-button link-pill">Open detail</Link>
              <CopyGuessButton text={`My latest guess is ${latestGuess.number}`} />
            </ActionBar>
          </>
        ) : (
          <div style={{ marginTop: 16 }}>
            <EmptyState
              icon="◎"
              title={isConnected ? "No guess yet" : "Connect to continue"}
              text={isConnected ? "Submit your first number to light up this personal panel." : "Link a wallet, then jump into the guess console."}
            />
          </div>
        )}
      </section>

      <section className="panel-card">
        <div className="section-kicker">Personal lane</div>
        <h2 className="section-title">Fast actions</h2>
        <p className="panel-note">Return to the control room or scan the wider activity feed.</p>
        <ActionBar>
          <Link href="/guess" className="primary-button link-pill">Guess again</Link>
          <Link href="/history" className="ghost-button">See history</Link>
        </ActionBar>
      </section>
    </div>
  );
}
