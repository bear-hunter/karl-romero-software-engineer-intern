"use client";

/**
 * Wallet connection component with connect/disconnect functionality.
 * AR Data-inspired styling with coral accent borders.
 */

import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export function WalletConnect() {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const [error, setError] = useState<string | null>(null);

  // Handle wallet connection with error catching
  const handleConnect = async () => {
    try {
      setError(null);
      await open();
    } catch (err) {
      console.error("Connection error:", err);
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  };

  // Truncate address for display
  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a]">
        {/* Connected Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
            <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-50"></div>
          </div>
          <span className="text-sm text-neutral-400 font-medium">Connected</span>
        </div>

        {/* Address Display */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#141414] rounded-xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#c77d7d] flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <code className="text-white font-mono text-sm tracking-wider">
            {truncateAddress(address)}
          </code>
          <button
            onClick={() => navigator.clipboard.writeText(address)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group"
            title="Copy address"
          >
            <svg
              className="w-4 h-4 text-neutral-500 group-hover:text-[#ff6b6b] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        {/* Disconnect Button */}
        <button
          onClick={() => disconnect()}
          className="px-5 py-2.5 bg-transparent hover:bg-red-500/10 text-neutral-400 hover:text-red-400 rounded-xl font-medium transition-all duration-200 border border-[#1a1a1a] hover:border-red-500/30"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4">
      {error && (
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="group relative px-8 py-4 bg-transparent border border-[#ff6b6b]/50 hover:border-[#ff6b6b] text-white font-medium rounded-xl transition-all duration-300 btn-coral-glow disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      >
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b]/10 to-[#c77d7d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Button content */}
        <span className="relative flex items-center gap-3">
          {isConnecting ? (
            <>
              <svg
                className="w-5 h-5 animate-spin text-[#ff6b6b]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-neutral-300">Connecting...</span>
            </>
          ) : (
            <>
              <span>Connect Wallet</span>
              <svg
                className="w-4 h-4 text-[#ff6b6b] group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </>
          )}
        </span>
      </button>
    </div>
  );
}
