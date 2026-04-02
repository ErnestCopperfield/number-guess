"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getConnectorLabel(name: string) {
  if (name === "Injected") return "Connect Browser Wallet";
  return `Connect ${name}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <section style={{ display: "grid", gap: 8, justifyItems: "end" }}>
        <button type="button" className="wallet-button connected" onClick={() => disconnect()}>
          <span className="wallet-dot" />
          <span>{shortAddress(address)}</span>
        </button>
      </section>
    );
  }

  return (
    <section style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          type="button"
          className="wallet-button"
          disabled={isPending}
          onClick={() => connect({ connector })}
        >
          {isPending ? "Connecting..." : getConnectorLabel(connector.name)}
        </button>
      ))}
    </section>
  );
}
