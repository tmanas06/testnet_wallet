'use client';

import { useState, useEffect } from 'react';
import FaucetCard from '@/components/FaucetCard';
import { Faucet } from '@/types';
import { loadFaucets, addFaucet, removeFaucet } from '@/lib/faucets';

export default function FaucetsPage() {
  const [faucets, setFaucets] = useState<Faucet[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFaucet, setNewFaucet] = useState({ name: '', url: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    setFaucets(loadFaucets());
  }, []);

  const handleAddFaucet = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newFaucet.name.trim()) {
      setError('Please enter a name for the faucet');
      return;
    }

    if (!newFaucet.url.trim()) {
      setError('Please enter a URL for the faucet');
      return;
    }

    // Basic URL validation
    try {
      new URL(newFaucet.url);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    const updated = addFaucet(faucets, {
      name: newFaucet.name.trim(),
      url: newFaucet.url.trim(),
      description: newFaucet.description.trim() || undefined,
    });

    setFaucets(updated);
    setNewFaucet({ name: '', url: '', description: '' });
    setShowAddForm(false);
  };

  const handleDeleteFaucet = (id: string) => {
    const updated = removeFaucet(faucets, id);
    setFaucets(updated);
  };

  // Group faucets by category
  const noMinimumFaucets = faucets.filter(f => f.isDefault && f.category === 'no-minimum');
  const minimumRequiredFaucets = faucets.filter(f => f.isDefault && f.category === 'minimum-required');
  const browserMiningFaucets = faucets.filter(f => f.isDefault && f.category === 'browser-mining');
  const infoFaucets = faucets.filter(f => f.isDefault && f.category === 'info');
  const customFaucets = faucets.filter(f => !f.isDefault);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Testnet Faucets</h1>
            <p className="text-gray-400">
              Get free testnet tokens for development and testing
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Faucet
          </button>
        </div>

        {/* Add Faucet Form */}
        {showAddForm && (
          <div className="mb-8 p-6 rounded-xl border border-gray-700 bg-gray-800/50">
            <h2 className="text-lg font-semibold mb-4">Add Custom Faucet</h2>
            <form onSubmit={handleAddFaucet} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={newFaucet.name}
                  onChange={(e) => setNewFaucet({ ...newFaucet, name: e.target.value })}
                  placeholder="e.g., My Custom Faucet"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
                  URL *
                </label>
                <input
                  type="text"
                  id="url"
                  value={newFaucet.url}
                  onChange={(e) => setNewFaucet({ ...newFaucet, url: e.target.value })}
                  placeholder="https://faucet.example.com"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description (optional)
                </label>
                <input
                  type="text"
                  id="description"
                  value={newFaucet.description}
                  onChange={(e) => setNewFaucet({ ...newFaucet, description: e.target.value })}
                  placeholder="Brief description of the faucet"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
                >
                  Save Faucet
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewFaucet({ name: '', url: '', description: '' });
                    setError('');
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Custom Faucets Section */}
        {customFaucets.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Your Custom Faucets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customFaucets.map((faucet) => (
                <FaucetCard
                  key={faucet.id}
                  faucet={faucet}
                  onDelete={handleDeleteFaucet}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Minimum Required Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            No Minimum Mainnet Balance Required
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            These faucets don&apos;t require any mainnet tokens to use
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {noMinimumFaucets.map((faucet) => (
              <FaucetCard key={faucet.id} faucet={faucet} />
            ))}
          </div>
        </div>

        {/* Minimum Required Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Minimum Mainnet Balance Required
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            These faucets require a small amount of mainnet tokens in your wallet
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {minimumRequiredFaucets.map((faucet) => (
              <FaucetCard key={faucet.id} faucet={faucet} />
            ))}
          </div>
        </div>

        {/* Browser Mining Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            Browser Mining Faucets
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Mine testnet tokens using your browser&apos;s computing power - no mainnet balance needed
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {browserMiningFaucets.map((faucet) => (
              <FaucetCard key={faucet.id} faucet={faucet} />
            ))}
          </div>
        </div>

        {/* Faucet Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Faucet Information & Directories
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Additional resources to find more faucets
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {infoFaucets.map((faucet) => (
              <FaucetCard key={faucet.id} faucet={faucet} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
