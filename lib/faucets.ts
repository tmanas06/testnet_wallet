import { Faucet } from '@/types';

// No minimum mainnet balance required
export const noMinimumFaucets: Faucet[] = [
  {
    id: 'stakely',
    name: 'Stakely Multi-Chain Faucet',
    url: 'https://stakely.io/faucet',
    description: 'Free testnet tokens for multiple chains including Ethereum, Polygon, and more',
    isDefault: true,
    category: 'no-minimum',
  },
  {
    id: 'triangle',
    name: 'Triangle Platform Faucet',
    url: 'https://faucet.triangleplatform.com/',
    description: 'Free testnet tokens with no mainnet balance requirement',
    isDefault: true,
    category: 'no-minimum',
  },
  {
    id: 'stakepool-amoy',
    name: 'Stakepool Amoy Faucet',
    url: 'https://faucet.stakepool.dev.br/amoy',
    description: 'Get free MATIC tokens for Polygon Amoy testnet',
    isDefault: true,
    category: 'no-minimum',
  },
  {
    id: 'faucet-trade-amoy',
    name: 'Faucet.Trade Polygon Amoy',
    url: 'https://faucet.trade/polygon-amoy-matic-faucet',
    description: 'Free MATIC tokens for Polygon Amoy testnet',
    isDefault: true,
    category: 'no-minimum',
  },
];

// Minimum mainnet wallet balance required
export const minimumRequiredFaucets: Faucet[] = [
  {
    id: 'alchemy-sepolia',
    name: 'Alchemy Sepolia Faucet',
    url: 'https://sepoliafaucet.com',
    description: 'Get Sepolia ETH for testing on Ethereum testnet',
    isDefault: true,
    category: 'minimum-required',
  },
  {
    id: 'quicknode',
    name: 'QuickNode Multi-Chain Faucet',
    url: 'https://faucet.quicknode.com',
    description: 'Testnet tokens for Ethereum, Arbitrum, Optimism, Base, and more',
    isDefault: true,
    category: 'minimum-required',
  },
  {
    id: 'chainlink',
    name: 'Chainlink Faucet',
    url: 'https://faucets.chain.link',
    description: 'Get testnet LINK and ETH for multiple networks',
    isDefault: true,
    category: 'minimum-required',
  },
  {
    id: 'polygon',
    name: 'Polygon Faucet',
    url: 'https://faucet.polygon.technology',
    description: 'Get MATIC tokens for Polygon Amoy testnet',
    isDefault: true,
    category: 'minimum-required',
  },
];

// Browser mining faucets
export const browserMiningFaucets: Faucet[] = [
  {
    id: 'pk910-sepolia',
    name: 'PK910 Sepolia PoW Faucet',
    url: 'https://sepolia-faucet.pk910.de/',
    description: 'Mine Sepolia ETH in your browser - no mainnet balance needed, just computing power',
    isDefault: true,
    category: 'browser-mining',
  },
];

// Faucet information resources
export const infoFaucets: Faucet[] = [
  {
    id: '595chain',
    name: '595Chain Faucet Directory',
    url: 'https://595chain.com/?lang=en',
    description: 'Comprehensive directory of blockchain faucets and testnet resources',
    isDefault: true,
    category: 'info',
  },
];

export const defaultFaucets: Faucet[] = [
  ...noMinimumFaucets,
  ...minimumRequiredFaucets,
  ...browserMiningFaucets,
  ...infoFaucets,
];

const STORAGE_KEY = 'testnet-wallet-faucets';

export function loadFaucets(): Faucet[] {
  if (typeof window === 'undefined') return defaultFaucets;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const customFaucets: Faucet[] = JSON.parse(stored);
      return [...defaultFaucets, ...customFaucets];
    }
  } catch (e) {
    console.error('Failed to load faucets from localStorage:', e);
  }

  return defaultFaucets;
}

export function saveCustomFaucets(faucets: Faucet[]): void {
  if (typeof window === 'undefined') return;

  const customFaucets = faucets.filter(f => !f.isDefault);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customFaucets));
  } catch (e) {
    console.error('Failed to save faucets to localStorage:', e);
  }
}

export function addFaucet(faucets: Faucet[], newFaucet: Omit<Faucet, 'id'>): Faucet[] {
  const faucet: Faucet = {
    ...newFaucet,
    id: `custom-${Date.now()}`,
    isDefault: false,
  };
  const updated = [...faucets, faucet];
  saveCustomFaucets(updated);
  return updated;
}

export function removeFaucet(faucets: Faucet[], id: string): Faucet[] {
  const updated = faucets.filter(f => f.id !== id);
  saveCustomFaucets(updated);
  return updated;
}
