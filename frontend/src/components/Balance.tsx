"use client";

/**
 * Balance display component showing ETH balance with loading/error states.
 * AR Data-inspired styling with coral accents.
 */

import { useEthereumData } from "@/hooks/useEthereumData";

export function Balance() {
  const { balance, isLoadingBalance, balanceError, refetchBalance } =
    useEthereumData();

  // Loading state
  if (isLoadingBalance) {
    return (
      <div className="h-full p-6 bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b6b]/10 flex items-center justify-center animate-pulse">
              <svg
                className="w-5 h-5 text-[#ff6b6b]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
              </svg>
            </div>
            <div className="h-5 w-28 bg-[#141414] rounded animate-pulse"></div>
          </div>
        </div>
        <div className="p-4 bg-[#141414] rounded-xl animate-pulse">
          <div className="h-6 w-32 bg-[#1a1a1a] rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (balanceError) {
    return (
      <div className="h-full p-6 bg-[#0d0d0d] rounded-2xl border border-red-500/20">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-400">
            Failed to Load
          </h3>
        </div>
        <div className="p-4 bg-[#141414] rounded-xl">
          <p className="text-neutral-500 text-sm mb-3">{balanceError.message}</p>
          <button
            onClick={refetchBalance}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No balance (not connected)
  if (!balance) {
    return null;
  }

  // Format balance for display
  const formattedBalance = parseFloat(balance.balanceFormatted).toFixed(6);

  return (
    <div className="h-full p-6 bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a] hover:border-[#ff6b6b]/20 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ff6b6b]/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#ff6b6b]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">Wallet Balance</h3>
        </div>
        <button
          onClick={refetchBalance}
          className="p-2.5 hover:bg-white/5 rounded-xl transition-colors group/btn"
          title="Refresh balance"
        >
          <svg
            className="w-5 h-5 text-neutral-500 group-hover/btn:text-[#ff6b6b] transition-colors"
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

      {/* Balance Display */}
      <div className="flex items-center justify-between p-4 bg-[#141414] rounded-xl">
        <span className="text-neutral-400">Balance</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-white tracking-tight">
            {formattedBalance}
          </span>
          <span className="text-[#ff6b6b] font-medium">ETH</span>
        </div>
      </div>
    </div>
  );
}
