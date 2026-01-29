"use client";

/**
 * Transaction history component displaying last 10 transactions.
 * AR Data-inspired styling with coral accents.
 */

import { ethers } from "ethers";
import { useEthereumData } from "@/hooks/useEthereumData";
import type { Transaction } from "@/types";

export function TransactionHistory() {
  const {
    transactions,
    isLoadingTransactions,
    transactionsError,
    refetchTransactions,
  } = useEthereumData();

  // Truncate address for display
  const truncateAddress = (addr: string) => {
    if (!addr) return "Contract Creation";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format ETH value
  const formatValue = (wei: string) => {
    try {
      const eth = ethers.formatEther(wei);
      return parseFloat(eth).toFixed(4);
    } catch {
      return "0";
    }
  };

  // Loading state
  if (isLoadingTransactions) {
    return (
      <div className="p-6 bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ff6b6b]/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#ff6b6b]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-white">
            Transaction History
          </h2>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-4 bg-white/5 rounded-xl animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 w-32 bg-white/5 rounded mb-2"></div>
                  <div className="h-3 w-48 bg-white/5 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-white/5 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (transactionsError) {
    return (
      <div className="p-6 bg-[#0d0d0d] rounded-2xl border border-red-500/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-red-400 mb-1">
              Failed to Load Transactions
            </h3>
            <p className="text-neutral-500 text-sm mb-4">
              {transactionsError.message}
            </p>
            <button
              onClick={refetchTransactions}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors border border-red-500/20"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No transactions
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-6 bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ff6b6b]/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#ff6b6b]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-white">
            Transaction History
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-neutral-500">No transactions found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ff6b6b]/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#ff6b6b]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-white">
            Transaction History
          </h2>
        </div>
        <button
          onClick={refetchTransactions}
          className="p-2.5 hover:bg-white/5 rounded-xl transition-colors group"
          title="Refresh transactions"
        >
          <svg
            className="w-5 h-5 text-neutral-500 group-hover:text-[#ff6b6b] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.map((tx: Transaction, index: number) => {
          const isError = tx.isError === "1";
          const value = formatValue(tx.value);

          return (
            <div
              key={tx.hash || index}
              className={`p-4 rounded-xl border transition-all duration-200 hover:translate-x-1 ${
                isError
                  ? "bg-red-500/5 border-red-500/10 hover:border-red-500/30"
                  : "bg-[#141414] border-[#1a1a1a] hover:border-[#ff6b6b]/30"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Transaction Icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isError
                      ? "bg-red-500/10"
                      : "bg-emerald-500/10"
                  }`}
                >
                  {isError ? (
                    <svg
                      className="w-5 h-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  {/* Hash */}
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-[#ff6b6b] hover:text-[#ff8a80] transition-colors truncate"
                    >
                      {tx.hash.slice(0, 16)}...
                    </a>
                    <svg
                      className="w-3.5 h-3.5 text-neutral-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>

                  {/* From/To */}
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <span className="font-mono">{truncateAddress(tx.from)}</span>
                    <svg
                      className="w-4 h-4 text-neutral-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                    <span className="font-mono">{truncateAddress(tx.to)}</span>
                  </div>

                  {/* Timestamp */}
                  <p className="text-xs text-neutral-600 mt-1">
                    {formatTimestamp(tx.timeStamp)}
                  </p>
                </div>

                {/* Value */}
                <div className="text-right flex-shrink-0">
                  <p
                    className={`font-medium ${
                      isError ? "text-red-400" : "text-white"
                    }`}
                  >
                    {value} <span className="text-neutral-500">ETH</span>
                  </p>
                  {isError && (
                    <span className="text-xs text-red-400">Failed</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
