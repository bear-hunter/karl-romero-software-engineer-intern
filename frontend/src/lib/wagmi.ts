/**
 * Wagmi and Web3Modal configuration for wallet connections.
 */

import { http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { config as appConfig } from "./config";

// Define supported chains
export const chains = [mainnet] as const;

// Metadata for WalletConnect
const metadata = {
  name: "Ethereum Tracker",
  description: "Track your Ethereum wallet balance and transactions",
  url: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmi config - disable storage to prevent auto-reconnect
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: appConfig.walletConnectProjectId,
  metadata,
  ssr: true,
  // No storage = no auto-reconnect on page load
  storage: undefined,
  transports: {
    [mainnet.id]: http(appConfig.alchemyUrl),
  },
});
