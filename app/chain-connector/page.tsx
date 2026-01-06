'use client';

import { useState } from 'react';

export default function ChainConnectorPage() {
  const [showTestnets, setShowTestnets] = useState(true);

  const chainlistUrl = showTestnets
    ? 'https://chainlist.org/?testnets=true'
    : 'https://chainlist.org/';

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="max-w-6xl mx-auto px-4 py-6 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Chain Connector</h1>
            <p className="text-gray-400">
              Add testnet and mainnet networks to your wallet via ChainList
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Testnet Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showTestnets}
                onChange={(e) => setShowTestnets(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <span className="text-sm text-gray-300">Show Testnets</span>
            </label>
            {/* Open in new tab */}
            <a
              href={chainlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in New Tab
            </a>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 rounded-xl border border-gray-700 bg-gray-800/50">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to use
          </h2>
          <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
            <li>Make sure your wallet (MetaMask, etc.) is installed and unlocked</li>
            <li>Search for a network or scroll through the list below</li>
            <li>Click &quot;Add to Wallet&quot; on any network to add it</li>
            <li>Approve the network addition in your wallet popup</li>
          </ol>
        </div>
      </div>

      {/* ChainList Embed */}
      <div className="flex-1 w-full px-4 pb-4">
        <div className="w-full h-full min-h-[600px] rounded-xl overflow-hidden border border-gray-700">
          <iframe
            src={chainlistUrl}
            className="w-full h-full min-h-[600px] bg-white"
            title="ChainList - Add Networks to Wallet"
            allow="clipboard-write"
          />
        </div>
      </div>
    </main>
  );
}
