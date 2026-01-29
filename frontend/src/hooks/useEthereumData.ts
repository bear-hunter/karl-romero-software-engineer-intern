/**
 * Custom hook for fetching Ethereum data using ethers.js and Etherscan API.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { config } from "@/lib/config";
import type { Transaction, BalanceData, UseEthereumDataResult } from "@/types";

// ============================================================
// 🔧 MOCK DATA TOGGLE - Set to true to use mock data for testing UI
// ============================================================
const USE_MOCK_DATA = false;

// Mock balance data
const MOCK_BALANCE: BalanceData = {
  balance: "2450000000000000000", // 2.45 ETH in wei
  balanceFormatted: "2.450000",
};

// Mock transaction data - 10 sample transactions
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    from: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    value: "150000000000000000", // 0.15 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 3600), // 1 hour ago
    isError: "0",
    blockNumber: "19234567",
    gasPrice: "20000000000",
    gasUsed: "21000",
  },
  {
    hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    from: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    to: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    value: "500000000000000000", // 0.5 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 7200), // 2 hours ago
    isError: "0",
    blockNumber: "19234500",
    gasPrice: "18000000000",
    gasUsed: "21000",
  },
  {
    hash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
    from: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    to: "0x6B175474E89094C44Da98b954EescdFC8102B623F",
    value: "1200000000000000000", // 1.2 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 86400), // 1 day ago
    isError: "0",
    blockNumber: "19230000",
    gasPrice: "25000000000",
    gasUsed: "52000",
  },
  {
    hash: "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    from: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    to: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    value: "750000000000000000", // 0.75 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 172800), // 2 days ago
    isError: "0",
    blockNumber: "19225000",
    gasPrice: "22000000000",
    gasUsed: "21000",
  },
  {
    hash: "0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
    from: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    to: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    value: "2000000000000000000", // 2 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 259200), // 3 days ago
    isError: "1", // Failed transaction
    blockNumber: "19220000",
    gasPrice: "30000000000",
    gasUsed: "100000",
  },
  {
    hash: "0x6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
    from: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    to: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    value: "325000000000000000", // 0.325 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 345600), // 4 days ago
    isError: "0",
    blockNumber: "19215000",
    gasPrice: "19000000000",
    gasUsed: "120000",
  },
  {
    hash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    from: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    to: "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8",
    value: "100000000000000000", // 0.1 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 432000), // 5 days ago
    isError: "0",
    blockNumber: "19210000",
    gasPrice: "17000000000",
    gasUsed: "21000",
  },
  {
    hash: "0x890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567",
    from: "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503",
    to: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    value: "890000000000000000", // 0.89 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 518400), // 6 days ago
    isError: "0",
    blockNumber: "19205000",
    gasPrice: "21000000000",
    gasUsed: "21000",
  },
  {
    hash: "0x90abcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678",
    from: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    to: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
    value: "450000000000000000", // 0.45 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 604800), // 7 days ago
    isError: "0",
    blockNumber: "19200000",
    gasPrice: "23000000000",
    gasUsed: "180000",
  },
  {
    hash: "0x0abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456789",
    from: "0xF977814e90dA44bFA03b6295A0616a897441aceC",
    to: "0x7701a3bE6842720c08834e2D9e9507b5a28c0096",
    value: "1750000000000000000", // 1.75 ETH
    timeStamp: String(Math.floor(Date.now() / 1000) - 691200), // 8 days ago
    isError: "0",
    blockNumber: "19195000",
    gasPrice: "20000000000",
    gasUsed: "21000",
  },
];
// ============================================================

export function useEthereumData(): UseEthereumDataResult {
  const { address, isConnected } = useAccount();

  // Balance state
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balanceError, setBalanceError] = useState<Error | null>(null);

  // Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [transactionsError, setTransactionsError] = useState<Error | null>(null);

  // Refs to prevent duplicate calls
  const isFetchingBalance = useRef(false);
  const isFetchingTx = useRef(false);
  const lastFetchedAddress = useRef<string | null>(null);

  // Fetch balance using ethers.js
  const fetchBalance = useCallback(async () => {
    if (!address || !isConnected) {
      setBalance(null);
      return;
    }

    // Prevent duplicate calls
    if (isFetchingBalance.current) return;
    isFetchingBalance.current = true;

    setIsLoadingBalance(true);
    setBalanceError(null);

    try {
      const provider = new ethers.JsonRpcProvider(config.alchemyUrl);
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.formatEther(balanceWei);

      setBalance({
        balance: balanceWei.toString(),
        balanceFormatted: balanceEth,
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalanceError(
        error instanceof Error ? error : new Error("Failed to fetch balance")
      );
    } finally {
      setIsLoadingBalance(false);
      isFetchingBalance.current = false;
    }
  }, [address, isConnected]);

  // Fetch transactions from Etherscan API
  const fetchTransactions = useCallback(async () => {
    if (!address || !isConnected) {
      setTransactions([]);
      return;
    }

    // Prevent duplicate calls
    if (isFetchingTx.current) return;
    isFetchingTx.current = true;

    setIsLoadingTransactions(true);
    setTransactionsError(null);

    try {
      const params = new URLSearchParams({
        chainid: String(config.chainId),
        module: "account",
        action: "txlist",
        address: address,
        startblock: "0",
        endblock: "99999999",
        page: "1",
        offset: "10",
        sort: "desc",
        apikey: config.etherscanApiKey,
      });

      const response = await fetch(`${config.etherscanApiUrl}?${params}`);
      const data = await response.json();

      if (data.status === "1" && Array.isArray(data.result)) {
        setTransactions(data.result);
      } else if (data.status === "0" && data.message === "No transactions found") {
        setTransactions([]);
      } else if (data.status === "0") {
        // Rate limit or other error - show user-friendly message
        const errorMsg = typeof data.result === "string" ? data.result : data.message || "Etherscan API error";
        throw new Error(errorMsg);
      } else {
        throw new Error(data.message || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactionsError(
        error instanceof Error
          ? error
          : new Error("Failed to fetch transactions")
      );
    } finally {
      setIsLoadingTransactions(false);
      isFetchingTx.current = false;
    }
  }, [address, isConnected]);

  // Fetch data when address changes - with deduplication
  useEffect(() => {
    if (isConnected && address) {
      // Use mock data if toggle is enabled
      if (USE_MOCK_DATA) {
        setBalance(MOCK_BALANCE);
        setTransactions(MOCK_TRANSACTIONS);
        return;
      }

      // Only fetch if address changed to prevent duplicate calls
      if (lastFetchedAddress.current !== address) {
        lastFetchedAddress.current = address;
        
        // Stagger the API calls to avoid rate limiting
        fetchBalance();
        // Delay transaction fetch by 500ms to avoid hitting rate limits
        const timer = setTimeout(() => {
          fetchTransactions();
        }, 500);
        
        return () => clearTimeout(timer);
      }
    } else {
      lastFetchedAddress.current = null;
      setBalance(null);
      setTransactions([]);
    }
  }, [address, isConnected, fetchBalance, fetchTransactions]);

  return {
    balance,
    transactions,
    isLoadingBalance,
    isLoadingTransactions,
    balanceError,
    transactionsError,
    refetchBalance: fetchBalance,
    refetchTransactions: fetchTransactions,
  };
}
