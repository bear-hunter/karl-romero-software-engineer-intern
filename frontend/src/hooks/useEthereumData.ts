/**
 * Custom hook for fetching Ethereum data using ethers.js and Etherscan API.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { config } from "@/lib/config";
import type { Transaction, BalanceData, UseEthereumDataResult } from "@/types";

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
