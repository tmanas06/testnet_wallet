import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia,
  holesky,
  polygonAmoy,
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  bscTestnet,
  avalancheFuji,
  lineaSepolia,
  scrollSepolia,
  mantleSepoliaTestnet,
  celoAlfajores,
  fantomTestnet,
  moonbaseAlpha,
} from 'wagmi/chains';

// Custom chain definitions for chains not in wagmi
const blastSepolia = {
  id: 168587773,
  name: 'Blast Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia.blast.io'] },
  },
  blockExplorers: {
    default: { name: 'Blastscan', url: 'https://sepolia.blastscan.io' },
  },
  testnet: true,
} as const;

const zkSyncSepolia = {
  id: 300,
  name: 'zkSync Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia.era.zksync.dev'] },
  },
  blockExplorers: {
    default: { name: 'zkSync Explorer', url: 'https://sepolia.explorer.zksync.io' },
  },
  testnet: true,
} as const;

const taikoHekla = {
  id: 167009,
  name: 'Taiko Hekla',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.hekla.taiko.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Taikoscan', url: 'https://hekla.taikoscan.io' },
  },
  testnet: true,
} as const;

const modeSepolia = {
  id: 919,
  name: 'Mode Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia.mode.network'] },
  },
  blockExplorers: {
    default: { name: 'Mode Explorer', url: 'https://sepolia.explorer.mode.network' },
  },
  testnet: true,
} as const;

const zoraSepolia = {
  id: 999999999,
  name: 'Zora Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia.rpc.zora.energy'] },
  },
  blockExplorers: {
    default: { name: 'Zora Explorer', url: 'https://sepolia.explorer.zora.energy' },
  },
  testnet: true,
} as const;

export const config = getDefaultConfig({
  appName: 'Testnet Wallet',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [
    sepolia,
    holesky,
    polygonAmoy,
    arbitrumSepolia,
    baseSepolia,
    optimismSepolia,
    bscTestnet,
    avalancheFuji,
    lineaSepolia,
    scrollSepolia,
    zkSyncSepolia,
    mantleSepoliaTestnet,
    blastSepolia,
    celoAlfajores,
    fantomTestnet,
    moonbaseAlpha,
    taikoHekla,
    modeSepolia,
    zoraSepolia,
  ],
  ssr: true,
});
