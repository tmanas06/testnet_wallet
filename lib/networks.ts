import { Network } from '@/types';

export const networks: Network[] = [
  // EVM Testnets
  {
    id: 'sepolia',
    name: 'Sepolia',
    type: 'evm',
    rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
    chainId: 11155111,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.etherscan.io',
    faucetUrl: 'https://sepoliafaucet.com',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
  },
  {
    id: 'holesky',
    name: 'Holesky',
    type: 'evm',
    rpcUrl: 'https://holesky.drpc.org',
    chainId: 17000,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://holesky.etherscan.io',
    faucetUrl: 'https://holesky-faucet.pk910.de',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
  },
  {
    id: 'polygon-amoy',
    name: 'Polygon Amoy',
    type: 'evm',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    chainId: 80002,
    symbol: 'MATIC',
    decimals: 18,
    explorerUrl: 'https://amoy.polygonscan.com',
    faucetUrl: 'https://faucet.polygon.technology',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
  },
  {
    id: 'arbitrum-sepolia',
    name: 'Arbitrum Sepolia',
    type: 'evm',
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
    chainId: 421614,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.arbiscan.io',
    faucetUrl: 'https://faucet.quicknode.com/arbitrum/sepolia',
    logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg',
  },
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    type: 'evm',
    rpcUrl: 'https://sepolia.base.org',
    chainId: 84532,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.basescan.org',
    faucetUrl: 'https://www.coinbase.com/faucets/base-ethereum-goerli-faucet',
    logo: 'https://www.base.org/document/favicon-32x32.png',
  },
  {
    id: 'optimism-sepolia',
    name: 'Optimism Sepolia',
    type: 'evm',
    rpcUrl: 'https://sepolia.optimism.io',
    chainId: 11155420,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia-optimism.etherscan.io',
    faucetUrl: 'https://app.optimism.io/faucet',
    logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg',
  },
  {
    id: 'bsc-testnet',
    name: 'BSC Testnet',
    type: 'evm',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    chainId: 97,
    symbol: 'tBNB',
    decimals: 18,
    explorerUrl: 'https://testnet.bscscan.com',
    faucetUrl: 'https://testnet.bnbchain.org/faucet-smart',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
  },
  {
    id: 'avalanche-fuji',
    name: 'Avalanche Fuji',
    type: 'evm',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    chainId: 43113,
    symbol: 'AVAX',
    decimals: 18,
    explorerUrl: 'https://testnet.snowtrace.io',
    faucetUrl: 'https://faucet.avax.network',
    logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
  },
  {
    id: 'linea-sepolia',
    name: 'Linea Sepolia',
    type: 'evm',
    rpcUrl: 'https://rpc.sepolia.linea.build',
    chainId: 59141,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.lineascan.build',
    faucetUrl: 'https://faucet.goerli.linea.build',
    logo: 'https://cryptologos.cc/logos/linea-linea-logo.svg',
  },
  {
    id: 'scroll-sepolia',
    name: 'Scroll Sepolia',
    type: 'evm',
    rpcUrl: 'https://sepolia-rpc.scroll.io',
    chainId: 534351,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.scrollscan.com',
    faucetUrl: 'https://scroll.io/bridge',
    logo: 'https://cryptologos.cc/logos/scroll-scr-logo.svg',
  },
  {
    id: 'zksync-sepolia',
    name: 'zkSync Sepolia',
    type: 'evm',
    rpcUrl: 'https://sepolia.era.zksync.dev',
    chainId: 300,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.explorer.zksync.io',
    faucetUrl: 'https://faucet.quicknode.com/ethereum/sepolia',
    logo: 'https://cryptologos.cc/logos/zksync-zk-logo.svg',
  },
  {
    id: 'mantle-sepolia',
    name: 'Mantle Sepolia',
    type: 'evm',
    rpcUrl: 'https://rpc.sepolia.mantle.xyz',
    chainId: 5003,
    symbol: 'MNT',
    decimals: 18,
    explorerUrl: 'https://sepolia.mantlescan.xyz',
    faucetUrl: 'https://faucet.sepolia.mantle.xyz',
    logo: 'https://cryptologos.cc/logos/mantle-mnt-logo.svg',
  },
  {
    id: 'blast-sepolia',
    name: 'Blast Sepolia',
    type: 'evm',
    rpcUrl: 'https://sepolia.blast.io',
    chainId: 168587773,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.blastscan.io',
    faucetUrl: 'https://faucet.quicknode.com/blast/sepolia',
    logo: 'https://cryptologos.cc/logos/blast-blast-logo.svg',
  },
  {
    id: 'celo-alfajores',
    name: 'Celo Alfajores',
    type: 'evm',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    chainId: 44787,
    symbol: 'CELO',
    decimals: 18,
    explorerUrl: 'https://alfajores.celoscan.io',
    faucetUrl: 'https://faucet.celo.org/alfajores',
    logo: 'https://cryptologos.cc/logos/celo-celo-logo.svg',
  },
  {
    id: 'fantom-testnet',
    name: 'Fantom Testnet',
    type: 'evm',
    rpcUrl: 'https://rpc.testnet.fantom.network',
    chainId: 4002,
    symbol: 'FTM',
    decimals: 18,
    explorerUrl: 'https://testnet.ftmscan.com',
    faucetUrl: 'https://faucet.fantom.network',
    logo: 'https://cryptologos.cc/logos/fantom-ftm-logo.svg',
  },
  {
    id: 'moonbase-alpha',
    name: 'Moonbase Alpha',
    type: 'evm',
    rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
    chainId: 1287,
    symbol: 'DEV',
    decimals: 18,
    explorerUrl: 'https://moonbase.moonscan.io',
    faucetUrl: 'https://faucet.moonbeam.network',
    logo: 'https://cryptologos.cc/logos/moonbeam-glmr-logo.svg',
  },
  {
    id: 'taiko-hekla',
    name: 'Taiko Hekla',
    type: 'evm',
    rpcUrl: 'https://rpc.hekla.taiko.xyz',
    chainId: 167009,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://hekla.taikoscan.io',
    faucetUrl: 'https://bridge.hekla.taiko.xyz',
    logo: 'https://cryptologos.cc/logos/taiko-taiko-logo.svg',
  },
  {
    id: 'mode-sepolia',
    name: 'Mode Sepolia',
    type: 'evm',
    rpcUrl: 'https://sepolia.mode.network',
    chainId: 919,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.explorer.mode.network',
    faucetUrl: 'https://faucet.quicknode.com/ethereum/sepolia',
    logo: 'https://cryptologos.cc/logos/mode-mode-logo.svg',
  },
  {
    id: 'zora-sepolia',
    name: 'Zora Sepolia',
    type: 'evm',
    rpcUrl: 'https://sepolia.rpc.zora.energy',
    chainId: 999999999,
    symbol: 'ETH',
    decimals: 18,
    explorerUrl: 'https://sepolia.explorer.zora.energy',
    faucetUrl: 'https://faucet.quicknode.com/ethereum/sepolia',
    logo: 'https://cryptologos.cc/logos/zora-zora-logo.svg',
  },
  // Solana Testnets
  {
    id: 'solana-devnet',
    name: 'Solana Devnet',
    type: 'solana',
    rpcUrl: 'https://api.devnet.solana.com',
    symbol: 'SOL',
    decimals: 9,
    explorerUrl: 'https://explorer.solana.com/?cluster=devnet',
    faucetUrl: 'https://faucet.solana.com',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
  },
  {
    id: 'solana-testnet',
    name: 'Solana Testnet',
    type: 'solana',
    rpcUrl: 'https://api.testnet.solana.com',
    symbol: 'SOL',
    decimals: 9,
    explorerUrl: 'https://explorer.solana.com/?cluster=testnet',
    faucetUrl: 'https://faucet.solana.com',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
  },
  // Sui Testnet
  {
    id: 'sui-testnet',
    name: 'Sui Testnet',
    type: 'sui',
    rpcUrl: 'https://fullnode.testnet.sui.io:443',
    symbol: 'SUI',
    decimals: 9,
    explorerUrl: 'https://suiscan.xyz/testnet',
    faucetUrl: 'https://faucet.testnet.sui.io',
    logo: 'https://cryptologos.cc/logos/sui-sui-logo.svg',
  },
  // Aptos Testnet
  {
    id: 'aptos-testnet',
    name: 'Aptos Testnet',
    type: 'aptos',
    rpcUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
    symbol: 'APT',
    decimals: 8,
    explorerUrl: 'https://explorer.aptoslabs.com/?network=testnet',
    faucetUrl: 'https://aptos.dev/en/network/faucet',
    logo: 'https://cryptologos.cc/logos/aptos-apt-logo.svg',
  },
];

export function getNetworksByType(type: Network['type']): Network[] {
  return networks.filter((n) => n.type === type);
}

export function getNetworksForAddress(address: string): Network[] {
  const addressType = detectAddressType(address);

  if (addressType === 'evm') {
    return networks.filter((n) => n.type === 'evm');
  } else if (addressType === 'solana') {
    return networks.filter((n) => n.type === 'solana');
  } else if (addressType === 'sui' || addressType === 'aptos') {
    // Sui and Aptos both use 0x + 64 hex chars, return both
    return networks.filter((n) => n.type === 'sui' || n.type === 'aptos');
  }

  return [];
}

export function detectAddressType(address: string): Network['type'] | null {
  if (!address) return null;

  // EVM: 0x + 40 hex characters
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return 'evm';
  }

  // Sui/Aptos: 0x + 64 hex characters
  if (/^0x[a-fA-F0-9]{64}$/.test(address)) {
    return 'sui'; // Could be either Sui or Aptos
  }

  // Solana: Base58, 32-44 characters, no 0/O/I/l
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
    return 'solana';
  }

  return null;
}
