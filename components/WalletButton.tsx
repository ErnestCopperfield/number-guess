"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type WalletOption = {
  id: string;
  label: string;
  connectorId: string;
};

function trimAddress(value?: string) {
  if (!value) return "Connect Wallet";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const walletOptions = useMemo<WalletOption[]>(() => {
    return connectors
      .map((connector) => {
        if (connector.id === "okxUniversal") {
          return { id: "okx", label: "OKX Wallet", connectorId: connector.id };
        }
        if (connector.id === "baseAccount") {
          return { id: "base", label: "Base Account", connectorId: connector.id };
        }
        if (connector.id === "injected") {
          return { id: "browser", label: "Browser Wallet", connectorId: connector.id };
        }
        return null;
      })
      .filter((option): option is WalletOption => Boolean(option));
  }, [connectors]);

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
      {walletOptions.map((option) => {
        const connector = connectors.find((item) => item.id === option.connectorId);
        return (
          <button
            key={option.id}
            className="wallet-button"
            onClick={() => connector && connect({ connector })}
            disabled={!connector || isPending}
          >
            <span>{isPending ? "Connecting..." : option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
