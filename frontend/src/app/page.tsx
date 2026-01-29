"use client";

/**
 * Main page component - Ethereum Tracker Dashboard
 * AR Data-inspired design with coral accents and geometric elements
 */

import { useAccount } from "wagmi";
import { WalletConnect } from "@/components/WalletConnect";
import { Balance } from "@/components/Balance";
import { TransactionHistory } from "@/components/TransactionHistory";

// SVG Network mesh background component
function NetworkMesh() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="mesh-dots"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="rgba(255, 107, 107, 0.3)" />
        </pattern>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 107, 107, 0.4)" />
          <stop offset="100%" stopColor="rgba(255, 107, 107, 0.05)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh-dots)" />
      {/* Connection lines */}
      <g stroke="url(#line-gradient)" strokeWidth="0.5" fill="none">
        <path d="M0,200 Q200,100 400,300 T800,200" className="animate-line-draw" />
        <path d="M100,0 Q300,200 500,100 T900,300" className="animate-line-draw" style={{ animationDelay: '2s' }} />
        <path d="M0,400 Q150,300 350,450 T700,350" className="animate-line-draw" style={{ animationDelay: '4s' }} />
      </g>
    </svg>
  );
}

// 3D Sphere component inspired by AR Data
function GeoSphere() {
  return (
    <div className="relative w-64 h-64 lg:w-80 lg:h-80 float-animation">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/40 to-[#c77d7d]/20 rounded-full blur-3xl pulse-glow" />
      
      {/* Main sphere */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sphere-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8a80" />
            <stop offset="50%" stopColor="#c77d7d" />
            <stop offset="100%" stopColor="#8b4545" />
          </linearGradient>
          <linearGradient id="grid-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
          </linearGradient>
          <filter id="sphere-shadow">
            <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#ff6b6b" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Sphere base */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="url(#sphere-gradient)"
          filter="url(#sphere-shadow)"
        />
        
        {/* Grid lines - vertical */}
        <g stroke="url(#grid-stroke)" strokeWidth="0.5" fill="none">
          <ellipse cx="100" cy="100" rx="80" ry="80" />
          <ellipse cx="100" cy="100" rx="60" ry="80" />
          <ellipse cx="100" cy="100" rx="35" ry="80" />
          <ellipse cx="100" cy="100" rx="10" ry="80" />
          {/* Horizontal lines */}
          <ellipse cx="100" cy="100" rx="80" ry="20" />
          <ellipse cx="100" cy="100" rx="80" ry="45" />
          <ellipse cx="100" cy="100" rx="80" ry="65" />
          <ellipse cx="100" cy="70" rx="72" ry="15" />
          <ellipse cx="100" cy="130" rx="72" ry="15" />
        </g>
        
        {/* Highlight */}
        <ellipse
          cx="70"
          cy="65"
          rx="25"
          ry="15"
          fill="rgba(255, 255, 255, 0.15)"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Network mesh pattern */}
        <NetworkMesh />
        
        {/* Coral gradient orb - positioned like AR Data sphere */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#ff6b6b]/20 via-[#c77d7d]/10 to-transparent rounded-full blur-3xl pulse-glow" />
        
        {/* Subtle bottom left glow */}
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-[#ff6b6b]/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 glass">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#c77d7d] flex items-center justify-center shadow-lg shadow-[#ff6b6b]/20">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-semibold text-white tracking-tight">
                    Ethereum <span className="text-gradient-coral">Tracker</span>
                  </span>
                </div>
              </div>

              {/* Network badge */}
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-50"></div>
                </div>
                <span className="text-sm text-neutral-300 font-medium">
                  Mainnet
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {!isConnected ? (
            /* Not connected state - AR Data inspired asymmetric hero */
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
              {/* Left content */}
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                  <span className="text-white">Track Your</span>
                  <br />
                  <span className="text-gradient-coral">Ethereum</span>
                  <span className="text-white"> Portfolio</span>
                </h1>
                
                <p className="text-lg text-neutral-400 mb-10 max-w-lg leading-relaxed">
                  Monitor your wallet balance and transaction history in real-time. 
                  Connect securely with your preferred wallet provider.
                </p>

                {/* Connect Button */}
                <WalletConnect />

                {/* Feature badges */}
                <div className="flex flex-wrap gap-3 mt-10">
                  <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-neutral-400">
                    <span className="text-[#ff6b6b] mr-2">●</span>
                    Real-time Balance
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-neutral-400">
                    <span className="text-[#ff6b6b] mr-2">●</span>
                    Transaction History
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-neutral-400">
                    <span className="text-[#ff6b6b] mr-2">●</span>
                    Secure Connection
                  </div>
                </div>
              </div>

              {/* Right side - 3D Sphere */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <GeoSphere />
              </div>
            </div>
          ) : (
            /* Connected state - Dashboard */
            <div className="space-y-8">
              {/* Welcome header */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Welcome back
                </h2>
                <p className="text-neutral-400">
                  Your Ethereum dashboard overview
                </p>
              </div>

              {/* Wallet Connection Status */}
              <WalletConnect />

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Balance Card */}
                <div className="lg:col-span-1">
                  <Balance />
                </div>

                {/* Network Status Card */}
                <div className="lg:col-span-1 h-full p-6 bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a] hover:border-[#ff6b6b]/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
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
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      Network Status
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#141414] rounded-xl">
                      <span className="text-neutral-400">Network</span>
                      <span className="text-white font-medium">
                        Ethereum Mainnet
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#141414] rounded-xl">
                      <span className="text-neutral-400">Status</span>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-50"></div>
                        </div>
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
        <footer className="border-t border-white/5 mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-neutral-500">
                Built with Next.js, ethers.js & WalletConnect
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="https://etherscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-[#ff6b6b] transition-colors"
                >
                  Etherscan
                </a>
                <a
                  href="https://ethereum.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-[#ff6b6b] transition-colors"
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
