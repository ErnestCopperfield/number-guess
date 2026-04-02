"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type WalletOption = {
  id: string;
  label: string;
  connectorId: string;
  enabled: boolean;
};

function trimAddress(value?: string) {
  if (!value) return "Connect Wallet";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [hasOkx, setHasOkx] = useState(false);

  useEffect(() => {
    const ethereum = (window as Window & { ethereum?: any }).ethereum;
    const providers = ethereum?.providers ?? [];
    const okxDetected = Boolean(
      ethereum?.isOkxWallet ||
        ethereum?.isOKExWallet ||
        providers.some((provider: any) => provider?.isOkxWallet || provider?.isOKExWallet)
    );
    setHasOkx(okxDetected);
  }, []);

  const walletOptions = useMemo<WalletOption[]>(() => {
    return connectors
      .map((connector) => {
        if (connector.id === "okxWallet") {
          return {
            id: "okx",
            label: "OKX Wallet",
            connectorId: connector.id,
            enabled: hasOkx
          };
        }

        if (connector.id === "baseAccount") {
          return {
            id: "base",
            label: "Base Account",
            connectorId: connector.id,
            enabled: true
          };
        }

        if (connector.id === "injected") {
          return {
            id: "browser",
            label: "Browser Wallet",
            connectorId: connector.id,
            enabled: true
          };
        }

        return null;
      })
      .filter((option): option is WalletOption => Boolean(option));
  }, [connectors, hasOkx]);

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
            disabled={!connector || !option.enabled || isPending}
            title={!option.enabled ? `${option.label} not detected` : option.label}
          >
            <span>{isPending ? "Connecting..." : option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
