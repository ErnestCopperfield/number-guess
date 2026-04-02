"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type WalletOption = {
  id: string;
  label: string;
  connectorIds: string[];
};

function trimAddress(value?: string) {
  if (!value) return "Connect Wallet";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const walletOptions = useMemo<WalletOption[]>(() => {
    return [
      { id: "okx", label: "OKX Wallet", connectorIds: ["okxWallet", "okxUniversal"] },
      { id: "base", label: "Base Account", connectorIds: ["baseAccount"] },
      { id: "browser", label: "Browser Wallet", connectorIds: ["injected"] }
    ];
  }, []);

  const handleConnect = async (connectorIds: string[]) => {
    for (const connectorId of connectorIds) {
      const connector = connectors.find((item) => item.id === connectorId);
      if (!connector) continue;

      try {
        await connectAsync({ connector });
        return;
      } catch {
        // Try the next connector option for this wallet group.
      }
    }
  };

  if (isConnected) {
    return (
      <button className="wallet-button connected" onClick={() => disconnect()}>
        <span className="wallet-dot" />
        <span>{trimAddress(address)}</span>
      </button>
    );
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
      {walletOptions.map((option) => (
        <button
          key={option.id}
          className="wallet-button"
          onClick={() => void handleConnect(option.connectorIds)}
          disabled={isPending}
        >
          <span>{isPending ? "Connecting..." : option.label}</span>
        </button>
      ))}
    </div>
  );
}
