/**
 * Frontend configuration for API and chain settings.
 */

export const config = {
  // WalletConnect Project ID
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  
  // Alchemy API Key
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",
  
  // Etherscan API Key (for transaction history)
  etherscanApiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || "",
  
  // Alchemy RPC URL
  alchemyUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  
  // Etherscan API V2 base URL (with chainid for Ethereum mainnet)
  etherscanApiUrl: "https://api.etherscan.io/v2/api",
  
  // Ethereum mainnet chain ID
  chainId: 1,
};
