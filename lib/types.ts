export type GuessStatus = "ready" | "submitted" | "latest" | "synced";

export type GuessRecord = {
  id: string;
  owner: string;
  number: number;
  createdAt: string;
  txHash: string;
  status: GuessStatus;
  statusLabel: string;
};
