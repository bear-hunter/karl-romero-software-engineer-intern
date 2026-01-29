"use client";

/**
 * Balance display component showing ETH balance with loading/error states.
 */

import { useEthereumData } from "@/hooks/useEthereumData";

export function Balance() {
  const { balance, isLoadingBalance, balanceError, refetchBalance } =
    useEthereumData();

  // Loading state
  if (isLoadingBalance) {
    return (
      <div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center animate-pulse">
            <svg
              className="w-7 h-7 text-amber-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse mb-2"></div>
            <div className="h-8 w-40 bg-slate-700/50 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (balanceError) {
    return (
      <div className="p-8 bg-gradient-to-br from-red-900/20 to-rose-900/20 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-7 h-7 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-400 mb-1">
              Failed to Load Balance
            </h3>
            <p className="text-slate-400 text-sm mb-4">{balanceError.message}</p>
            <button
              onClick={refetchBalance}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-sm font-medium transition-colors border border-red-500/30"
            >
              Try Again
            </button>
          </div>
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
    <div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl hover:border-slate-600/50 transition-colors">
      <div className="flex items-center gap-4">
        {/* Ethereum Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-amber-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
          </svg>
        </div>

        {/* Balance Info */}
        <div className="flex-1">
          <p className="text-sm text-slate-400 font-medium mb-1">
            Wallet Balance
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">
              {formattedBalance}
            </span>
            <span className="text-lg text-slate-400 font-medium">ETH</span>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={refetchBalance}
          className="p-3 hover:bg-slate-700/50 rounded-xl transition-colors group"
          title="Refresh balance"
        >
          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
