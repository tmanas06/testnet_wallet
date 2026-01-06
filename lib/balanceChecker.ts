import { Network, BalanceResult } from '@/types';
import { formatBalance, delay } from './utils';

const REQUEST_TIMEOUT = 12000; // 12 seconds
const BATCH_SIZE = 3;
const BATCH_DELAY = 600; // 600ms between batches

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

async function checkEVMBalance(network: Network, address: string): Promise<string> {
  const response = await fetchWithTimeout(
    network.rpcUrl,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      }),
    },
    REQUEST_TIMEOUT
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Invalid response from RPC');
  }

  if (data.error) {
    throw new Error(data.error.message || 'RPC error');
  }

  if (!data.result) {
    throw new Error('No result from RPC');
  }

  // Convert hex to decimal string
  return BigInt(data.result).toString();
}

async function checkSolanaBalance(network: Network, address: string): Promise<string> {
  const response = await fetchWithTimeout(
    network.rpcUrl,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'getBalance',
        params: [address],
        id: 1,
      }),
    },
    REQUEST_TIMEOUT
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Invalid response from RPC');
  }

  if (data.error) {
    throw new Error(data.error.message || 'RPC error');
  }

  return data.result?.value?.toString() || '0';
}

async function checkSuiBalance(network: Network, address: string): Promise<string> {
  const response = await fetchWithTimeout(
    network.rpcUrl,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'suix_getBalance',
        params: [address, '0x2::sui::SUI'],
        id: 1,
      }),
    },
    REQUEST_TIMEOUT
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Invalid response from RPC');
  }

  if (data.error) {
    throw new Error(data.error.message || 'RPC error');
  }

  return data.result?.totalBalance || '0';
}

async function checkAptosBalance(network: Network, address: string): Promise<string> {
  const response = await fetchWithTimeout(
    `${network.rpcUrl}/accounts/${address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`,
    { method: 'GET' },
    REQUEST_TIMEOUT
  );

  if (response.status === 404) {
    return '0';
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Invalid response from API');
  }

  return data.data?.coin?.value || '0';
}

async function checkBalance(network: Network, address: string): Promise<BalanceResult> {
  try {
    let balance: string;

    switch (network.type) {
      case 'evm':
        balance = await checkEVMBalance(network, address);
        break;
      case 'solana':
        balance = await checkSolanaBalance(network, address);
        break;
      case 'sui':
        balance = await checkSuiBalance(network, address);
        break;
      case 'aptos':
        balance = await checkAptosBalance(network, address);
        break;
      default:
        throw new Error(`Unknown network type: ${network.type}`);
    }

    const formattedBalance = formatBalance(balance, network.decimals);
    const hasBalance = balance !== '0' && BigInt(balance) > BigInt(0);

    return {
      network,
      balance,
      formattedBalance,
      hasBalance,
    };
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      // Clean up error messages for display
      if (error.message.includes('fetch')) {
        errorMessage = 'Network error';
      } else if (error.message.includes('timeout') || error.message.includes('abort')) {
        errorMessage = 'Request timeout';
      } else {
        errorMessage = error.message;
      }
    }

    return {
      network,
      balance: '0',
      formattedBalance: '0',
      hasBalance: false,
      error: errorMessage,
    };
  }
}

export async function checkAllBalances(
  networks: Network[],
  address: string,
  onProgress?: (completed: number, total: number, currentNetwork: string) => void
): Promise<BalanceResult[]> {
  const results: BalanceResult[] = [];

  for (let i = 0; i < networks.length; i += BATCH_SIZE) {
    const batch = networks.slice(i, i + BATCH_SIZE);

    // Report progress for first network in batch
    if (onProgress && batch.length > 0) {
      onProgress(i, networks.length, batch[0].name);
    }

    const batchPromises = batch.map((network) => checkBalance(network, address));
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Add delay between batches (except for the last batch)
    if (i + BATCH_SIZE < networks.length) {
      await delay(BATCH_DELAY);
    }
  }

  // Report completion
  if (onProgress) {
    onProgress(networks.length, networks.length, 'Complete');
  }

  return results;
}
