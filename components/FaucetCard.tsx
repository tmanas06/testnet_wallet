'use client';

import { Faucet } from '@/types';

interface FaucetCardProps {
  faucet: Faucet;
  onDelete?: (id: string) => void;
}

export default function FaucetCard({ faucet, onDelete }: FaucetCardProps) {
  const getCategoryBadge = () => {
    if (!faucet.isDefault) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400">
          Custom
        </span>
      );
    }

    switch (faucet.category) {
      case 'no-minimum':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
            No Minimum
          </span>
        );
      case 'minimum-required':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
            Mainnet Required
          </span>
        );
      case 'browser-mining':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-orange-500/20 text-orange-400">
            Browser Mining
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
            Info Resource
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative rounded-xl border border-gray-700 bg-gray-800/50 p-4 hover:border-gray-600 transition-colors">
      {/* Delete button for custom faucets */}
      {!faucet.isDefault && onDelete && (
        <button
          onClick={() => onDelete(faucet.id)}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-400 transition-colors"
          title="Remove faucet"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Category Badge */}
      <div className="mb-3">
        {getCategoryBadge()}
      </div>

      {/* Faucet Info */}
      <h3 className="font-semibold text-white mb-2 pr-6">{faucet.name}</h3>
      {faucet.description && (
        <p className="text-gray-400 text-sm mb-4">{faucet.description}</p>
      )}

      {/* URL Display */}
      <p className="text-gray-500 text-xs mb-4 truncate" title={faucet.url}>
        {faucet.url}
      </p>

      {/* Action Button */}
      <a
        href={faucet.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full text-center px-4 py-2 rounded-lg transition-colors text-white font-medium ${
          faucet.category === 'info'
            ? 'bg-gray-600 hover:bg-gray-500'
            : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        {faucet.category === 'info' ? 'View Directory' : 'Open Faucet'}
      </a>
    </div>
  );
}
