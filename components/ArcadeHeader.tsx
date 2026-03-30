"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/WalletButton";

const titles: Record<string, { eyebrow: string; subtitle: string }> = {
  "/": { eyebrow: "Arcade hub", subtitle: "Quick play on Base" },
  "/guess": { eyebrow: "Control room", subtitle: "Set your next number" },
  "/me": { eyebrow: "Player card", subtitle: "Your latest signal" },
  "/history": { eyebrow: "Signal feed", subtitle: "Recent number flow" }
};

export function ArcadeHeader() {
  const pathname = usePathname();
  const current = titles[pathname] ?? {
    eyebrow: "Record plate",
    subtitle: "Single guess detail"
  };

  return (
    <header className="arcade-header">
      <div className="header-row">
        <Link href="/" className="brand-wrap">
          <div className="brand-badge">NG</div>
          <div>
            <div className="eyebrow">{current.eyebrow}</div>
            <h1 className="brand-title">number-guess</h1>
            <p className="brand-subtitle">{current.subtitle}</p>
          </div>
        </Link>
        <WalletButton />
      </div>
    </header>
  );
}
