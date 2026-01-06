'use client';

import { useState, useCallback } from 'react';
import WalletInput from '@/components/WalletInput';
import NetworkCard from '@/components/NetworkCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getNetworksForAddress } from '@/lib/networks';
import { checkAllBalances } from '@/lib/balanceChecker';
import { BalanceResult, CheckProgress } from '@/types';

export default function Home() {
  const [results, setResults] = useState<BalanceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<CheckProgress | null>(null);
  const [checkedAddress, setCheckedAddress] = useState('');
  const [showOnlyWithBalance, setShowOnlyWithBalance] = useState(false);

  const handleCheck = useCallback(async (address: string) => {
    setIsLoading(true);
    setResults([]);
    setCheckedAddress(address);
    setProgress({ total: 0, completed: 0 });

    const networks = getNetworksForAddress(address);
    setProgress({ total: networks.length, completed: 0 });

    const balanceResults = await checkAllBalances(
      networks,
      address,
      (completed, total, currentNetwork) => {
        setProgress({ total, completed, currentNetwork });
      }
    );

    setResults(balanceResults);
    setIsLoading(false);
    setProgress(null);
  }, []);

  const filteredResults = showOnlyWithBalance
    ? results.filter((r) => r.hasBalance)
    : results;

  const networksWithBalance = results.filter((r) => r.hasBalance).length;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Wallet Checker</h1>
          <p className="text-gray-400">
            Check your testnet balances across multiple networks
          </p>
        </div>
        {/* Wallet Input */}
        <WalletInput onSubmit={handleCheck} isLoading={isLoading} />

        {/* Progress Indicator */}
        {isLoading && progress && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <LoadingSpinner size="lg" />
            <div className="text-center">
              <p className="text-lg font-medium">
                Checking networks... {progress.completed}/{progress.total}
              </p>
              {progress.currentNetwork && (
                <p className="text-gray-400 text-sm mt-1">
                  Currently checking: {progress.currentNetwork}
                </p>
              )}
            </div>
            {/* Progress bar */}
            <div className="w-full max-w-md bg-gray-800 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(progress.completed / progress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {!isLoading && results.length > 0 && (
          <div className="mt-8">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-gray-400 text-sm">
                  Found {networksWithBalance} network{networksWithBalance !== 1 ? 's' : ''} with
                  balance out of {results.length} checked
                </p>
              </div>

              {/* Filter Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyWithBalance}
                  onChange={(e) => setShowOnlyWithBalance(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <span className="text-sm text-gray-300">Show only with balance</span>
              </label>
            </div>

            {/* Network Cards Grid */}
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResults.map((result) => (
                  <NetworkCard
                    key={result.network.id}
                    result={result}
                    address={checkedAddress}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No networks with balance found</p>
                <p className="text-sm mt-2">
                  Try unchecking the filter or use faucets to get testnet tokens
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && results.length === 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Enter a wallet address to get started
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Supports EVM (Ethereum, Polygon, Arbitrum, etc.), Solana, Sui, and Aptos addresses
            </p>
          </div>
        )}
      </div>

    </main>
  );
}
