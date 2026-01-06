export function formatBalance(balance: string, decimals: number): string {
  if (!balance || balance === '0') return '0';

  const balanceBigInt = BigInt(balance);
  const divisor = BigInt(10 ** decimals);
  const integerPart = balanceBigInt / divisor;
  const fractionalPart = balanceBigInt % divisor;

  if (fractionalPart === BigInt(0)) {
    return integerPart.toString();
  }

  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmedFractional = fractionalStr.slice(0, 6).replace(/0+$/, '');

  if (!trimmedFractional) {
    return integerPart.toString();
  }

  return `${integerPart}.${trimmedFractional}`;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shortenAddress(address: string, chars = 6): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function getExplorerAddressUrl(explorerUrl: string, address: string): string {
  // Handle different explorer URL formats
  if (explorerUrl.includes('solana.com')) {
    return `${explorerUrl}/address/${address}`;
  }
  if (explorerUrl.includes('suiscan.xyz')) {
    return `${explorerUrl}/account/${address}`;
  }
  if (explorerUrl.includes('aptoslabs.com')) {
    return `${explorerUrl}/account/${address}`;
  }
  // Default EVM format
  return `${explorerUrl}/address/${address}`;
}
