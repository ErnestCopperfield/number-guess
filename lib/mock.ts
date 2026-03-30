import type { GuessRecord } from "@/lib/types";

export const mockGuessRecords: GuessRecord[] = [
  {
    id: "0xaaaabbbbccccddddeeeeffff1111222233334444",
    owner: "0x91f4D7Ac89164431Ff7b4C4f21A6Ab2B9F3312E1",
    number: 4021,
    createdAt: "2026-03-30T08:05:00.000Z",
    txHash: "0xaaaabbbbccccddddeeeeffff1111222233334444",
    status: "latest",
    statusLabel: "Latest guess"
  },
  {
    id: "0xbbbbccccddddeeeeffff11112222333344445555",
    owner: "0x3D4F6f9F75C143a4281f3b3A8b756c8428D23A6D",
    number: 128,
    createdAt: "2026-03-30T07:58:00.000Z",
    txHash: "0xbbbbccccddddeeeeffff11112222333344445555",
    status: "synced",
    statusLabel: "Synced"
  },
  {
    id: "0xccccddddeeeeffff111122223333444455556666",
    owner: "0xDFdF57b32A028c8ABa43d6f92b5609D5721135B1",
    number: 7777,
    createdAt: "2026-03-30T07:42:00.000Z",
    txHash: "0xccccddddeeeeffff111122223333444455556666",
    status: "submitted",
    statusLabel: "Submitted"
  }
];
