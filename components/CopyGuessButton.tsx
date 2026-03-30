"use client";

import { useState } from "react";

export function CopyGuessButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return <button className="copy-button" onClick={handleCopy}>{copied ? "Copied" : "Copy"}</button>;
}
