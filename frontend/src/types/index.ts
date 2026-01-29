/**
 * TypeScript interfaces for the application.
 */

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  blockNumber: string;
  gasUsed: string;
  gasPrice: string;
  isError: string;
  functionName?: string;
}

export interface EtherscanResponse {
  status: string;
  message: string;
  result: Transaction[];
}

export interface BalanceData {
  balance: string;
  balanceFormatted: string;
}

export interface UseEthereumDataResult {
  balance: BalanceData | null;
  transactions: Transaction[];
  isLoadingBalance: boolean;
  isLoadingTransactions: boolean;
  balanceError: Error | null;
  transactionsError: Error | null;
  refetchBalance: () => void;
  refetchTransactions: () => void;
}
