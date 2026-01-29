"use client";

/**
 * Client-side providers for Wagmi, React Query, and Web3Modal.
 */

import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, type Config } from "wagmi";
import { config as appConfig } from "@/lib/config";

// Create query client
const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null);

  useEffect(() => {
    // Dynamically import wagmi config and Web3Modal only on client side
    const initWeb3 = async () => {
      const { wagmiConfig: config } = await import("@/lib/wagmi");
      const { createWeb3Modal } = await import("@web3modal/wagmi/react");
      
      createWeb3Modal({
        wagmiConfig: config,
        projectId: appConfig.walletConnectProjectId,
        enableAnalytics: false,
        themeMode: "dark",
        themeVariables: {
          "--w3m-accent": "#8b5cf6",
          "--w3m-border-radius-master": "12px",
        },
      });
      
      setWagmiConfig(config);
      setMounted(true);
    };
    
    initWeb3();
  }, []);

  if (!mounted || !wagmiConfig) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
