"use client";

import { GuessStatusChip } from "@/components/GuessStatusChip";
import { SubmitGuessButton } from "@/components/SubmitGuessButton";

export function GuessInputPanel({
  value,
  onChange,
  onSubmit,
  disabled,
  loading
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <section className="input-shell">
      <div className="input-header">
        <div>
          <div className="section-kicker">Live input</div>
          <h2 className="section-title">Arcade console</h2>
        </div>
        <GuessStatusChip type={loading ? "submitted" : "ready"} />
      </div>

      <div className="input-cluster">
        <label className="field-label" htmlFor="guess-number">
          Pick a number
        </label>
        <input
          id="guess-number"
          className="guess-input"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0007"
          maxLength={4}
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/\D/g, "").slice(0, 4))}
        />
        <div className="input-hint">
          <span>Range 0-9999</span>
          <span>Fast mobile entry</span>
        </div>
        <SubmitGuessButton onClick={onSubmit} disabled={disabled} loading={loading} />
      </div>
    </section>
  );
}
