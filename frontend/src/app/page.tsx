"use client";

/**
 * Main page component - Ethereum Tracker Dashboard
 */

import { useAccount } from "wagmi";
import { WalletConnect } from "@/components/WalletConnect";
import { Balance } from "@/components/Balance";
import { TransactionHistory } from "@/components/TransactionHistory";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Ethereum Tracker
                </span>
              </div>

              {/* Network badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300 font-medium">
                  Mainnet
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {!isConnected ? (
            /* Not connected state */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              {/* Icon */}
              <div className="w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-violet-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                </svg>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Track Your Ethereum
              </h1>
              <p className="text-lg text-slate-400 mb-10 max-w-md">
                Connect your wallet to view your balance and recent transactions
                on the Ethereum network.
              </p>

              {/* Connect Button */}
              <WalletConnect />

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-3xl">
                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    View Balance
                  </h3>
                  <p className="text-sm text-slate-400">
                    Check your ETH balance in real-time directly from the
                    blockchain.
                  </p>
                </div>

                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Transaction History
                  </h3>
                  <p className="text-sm text-slate-400">
                    View your last 10 transactions with detailed information.
                  </p>
                </div>

                <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Secure Connection
                  </h3>
                  <p className="text-sm text-slate-400">
                    Connect securely with MetaMask, WalletConnect, and more.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Connected state - Dashboard */
            <div className="space-y-8">
              {/* Wallet Connection Status */}
              <WalletConnect />

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Balance Card */}
                <div className="lg:col-span-1">
                  <Balance />
                </div>

                {/* Placeholder for additional stats */}
                <div className="lg:col-span-1 p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Network Status
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                      <span className="text-slate-400">Network</span>
                      <span className="text-white font-medium">
                        Ethereum Mainnet
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                      <span className="text-slate-400">Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400 font-medium">
                          Connected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction History - Full Width */}
              <TransactionHistory />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Built with Next.js, ethers.js & WalletConnect
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="https://etherscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Etherscan
                </a>
                <a
                  href="https://ethereum.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Ethereum.org
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
