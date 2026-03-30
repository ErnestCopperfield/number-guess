"use client";

import { useEffect, useMemo, useRef } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { numberGuessAbi, numberGuessAddress } from "@/lib/contracts/numberGuess";
import { mockGuessRecords } from "@/lib/mock";
import type { GuessRecord } from "@/lib/types";
import { BASE_APP_ID, BASE_BUILDER_CODE, BASE_BUILDER_DATA_SUFFIX } from "@/lib/base-app";
import { trackTransaction } from "@/utils/track";

function toRecord(args: {
  id: string;
  owner: string;
  number: number;
  createdAt: string;
  txHash: string;
  status?: GuessRecord["status"];
  statusLabel?: string;
}): GuessRecord {
  return {
    id: args.id,
    owner: args.owner,
    number: args.number,
    createdAt: args.createdAt,
    txHash: args.txHash,
    status: args.status ?? "synced",
    statusLabel: args.statusLabel ?? "Synced"
  };
}

export function useGuessAppData() {
  const { address, isConnected } = useAccount();

  const lastGuessQuery = useReadContract({
    abi: numberGuessAbi,
    address: numberGuessAddress,
    functionName: "lastGuess",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) }
  });

  const guessCountQuery = useReadContract({
    abi: numberGuessAbi,
    address: numberGuessAddress,
    functionName: "guessCount",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) }
  });

  const fallbackLatest = useMemo(() => {
    if (!address) return mockGuessRecords[0] ?? null;
    return mockGuessRecords.find((record) => record.owner.toLowerCase() === address.toLowerCase()) ?? null;
  }, [address]);

  const latestGuess = useMemo(() => {
    if (!address) return fallbackLatest;
    if (typeof lastGuessQuery.data === "bigint") {
      return toRecord({
        id: fallbackLatest?.id ?? "latest-guess",
        owner: address,
        number: Number(lastGuessQuery.data),
        createdAt: fallbackLatest?.createdAt ?? new Date().toISOString(),
        txHash: fallbackLatest?.txHash ?? "0x",
        status: "latest",
        statusLabel: "Latest guess"
      });
    }
    return fallbackLatest;
  }, [address, fallbackLatest, lastGuessQuery.data]);

  return {
    address,
    isConnected,
    latestGuess,
    recentRecords: mockGuessRecords,
    guessCount: Number(guessCountQuery.data ?? BigInt(fallbackLatest ? 1 : 0)),
    refetchAll: async () => {
      await Promise.all([lastGuessQuery.refetch(), guessCountQuery.refetch()]);
    }
  };
}

export function useGuessRecordDetail(id: string) {
  const record = mockGuessRecords.find((item) => item.id.toLowerCase() === id.toLowerCase()) ?? null;
  return { record };
}

export function useSubmitGuess({ onSuccess }: { onSuccess?: () => Promise<void> | void }) {
  const { address } = useAccount();
  const writeContract = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash: writeContract.data });
  const trackedHashRef = useRef<string | null>(null);
  const successHashRef = useRef<string | null>(null);

  useEffect(() => {
    if (!receipt.isSuccess || !writeContract.data || !address) return;
    if (trackedHashRef.current === writeContract.data) return;

    trackedHashRef.current = writeContract.data;
    void trackTransaction(BASE_APP_ID, "number-guess", address, writeContract.data);
  }, [address, receipt.isSuccess, writeContract.data]);

  useEffect(() => {
    if (!receipt.isSuccess || !writeContract.data || !onSuccess) return;
    if (successHashRef.current === writeContract.data) return;

    successHashRef.current = writeContract.data;
    void onSuccess();
  }, [onSuccess, receipt.isSuccess, writeContract.data]);

  const submit = async (value: number) => {
    await writeContract.writeContractAsync({
      abi: numberGuessAbi,
      address: numberGuessAddress,
      functionName: "guess",
      args: [BigInt(value)],
      dataSuffix: BASE_BUILDER_DATA_SUFFIX
    });
  };

  return {
    submit,
    isLoading: writeContract.isPending || receipt.isLoading,
    isSuccess: receipt.isSuccess,
    hash: writeContract.data,
    builderCode: BASE_BUILDER_CODE
  };
}

