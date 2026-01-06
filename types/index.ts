export type NetworkType = 'evm' | 'solana' | 'sui' | 'aptos';

export interface Network {
  id: string;
  name: string;
  type: NetworkType;
  rpcUrl: string;
  chainId?: number;
  symbol: string;
  decimals: number;
  explorerUrl: string;
  faucetUrl: string;
  logo: string;
}

export interface BalanceResult {
  network: Network;
  balance: string;
  formattedBalance: string;
  hasBalance: boolean;
  error?: string;
}

export type CheckStatus = 'idle' | 'checking' | 'completed';

export interface CheckProgress {
  total: number;
  completed: number;
  currentNetwork?: string;
}

export type FaucetCategory = 'no-minimum' | 'minimum-required' | 'browser-mining' | 'info';

export interface Faucet {
  id: string;
  name: string;
  url: string;
  description?: string;
  isDefault?: boolean;
  category?: FaucetCategory;
}
