'use client';

import { useState } from 'react';
import { detectAddressType } from '@/lib/networks';

interface WalletInputProps {
  onSubmit: (address: string) => void;
  isLoading: boolean;
}

export default function WalletInput({ onSubmit, isLoading }: WalletInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      setError('Please enter a wallet address');
      return;
    }

    const addressType = detectAddressType(trimmedAddress);

    if (!addressType) {
      setError('Invalid address format. Supported: EVM (0x...), Solana, Sui, Aptos');
      return;
    }

    setError('');
    onSubmit(trimmedAddress);
  };

  const detectedType = detectAddressType(address.trim());

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setError('');
          }}
          placeholder="Enter wallet address (EVM, Solana, Sui, or Aptos)"
          className="w-full px-4 py-4 pr-32 text-lg bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors text-white"
        >
          {isLoading ? 'Checking...' : 'Check'}
        </button>
      </div>

      {/* Address type indicator */}
      {address.trim() && !error && (
        <div className="mt-2 text-sm">
          {detectedType ? (
            <span className="text-green-400">
              Detected: <span className="uppercase font-medium">{detectedType}</span> address
            </span>
          ) : (
            <span className="text-yellow-400">Address format not recognized</span>
          )}
        </div>
      )}

      {/* Error message */}
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </form>
  );
}
