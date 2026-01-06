'use client';

import { BalanceResult } from '@/types';
import { getExplorerAddressUrl } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface NetworkCardProps {
  result: BalanceResult;
  address: string;
}

export default function NetworkCard({ result, address }: NetworkCardProps) {
  const { network, formattedBalance, hasBalance, error } = result;
  const [imgError, setImgError] = useState(false);

  const explorerUrl = getExplorerAddressUrl(network.explorerUrl, address);

  return (
    <div
      className={`relative rounded-xl border p-4 transition-all ${
        hasBalance
          ? 'border-green-500/50 bg-green-500/5'
          : error
          ? 'border-red-500/30 bg-red-500/5'
          : 'border-gray-700 bg-gray-800/50'
      }`}
    >
      {/* Network Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
          {!imgError ? (
            <Image
              src={network.logo}
              alt={network.name}
              width={32}
              height={32}
              className="object-contain"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <span className="text-lg font-bold text-gray-400">
              {network.symbol.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-white">{network.name}</h3>
          <span className="text-xs text-gray-400 uppercase">{network.type}</span>
        </div>
      </div>

      {/* Balance */}
      <div className="mb-4">
        {error ? (
          <p className="text-red-400 text-sm">Error: {error}</p>
        ) : (
          <p className={`text-2xl font-bold ${hasBalance ? 'text-green-400' : 'text-gray-400'}`}>
            {formattedBalance} <span className="text-sm font-normal">{network.symbol}</span>
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-200"
        >
          Explorer
        </a>
        <a
          href={network.faucetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white"
        >
          Faucet
        </a>
      </div>

      {/* Balance indicator badge */}
      {hasBalance && (
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            Has Balance
          </span>
        </div>
      )}
    </div>
  );
}
