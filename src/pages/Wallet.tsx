import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  Settings,
  Activity,
  Ticket
} from 'lucide-react';
import { SolanaWallet, WalletData } from '../utils/solanaWallet';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  logo: string;
}

export const Wallet: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [activeTab, setActiveTab] = useState<'tokens' | 'tickets' | 'activity'>('tokens');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [walletBalance] = useState(0);
  const [earnings] = useState(0);
  const [pendingRewards] = useState(156.78);

  const solanaWallet = new SolanaWallet();

  // Auto-create wallet for every user
  useEffect(() => {
    const storedWallet = localStorage.getItem('wegram_wallet');
    if (storedWallet) {
      try {
        const wallet = JSON.parse(storedWallet);
        setWalletData(wallet);
      } catch (error) {
        console.error('Failed to load stored wallet:', error);
        createNewWallet();
      }
    } else {
      createNewWallet();
    }
  }, []);

  const createNewWallet = () => {
    const wallet = solanaWallet.generateWallet();
    setWalletData(wallet);
    localStorage.setItem('wegram_wallet', JSON.stringify(wallet));
  };

  const handleCopy = (text: string, item: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleDeposit = () => {
    if (walletData) {
      handleCopy(walletData.publicKey, 'deposit');
      alert('Wallet address copied! Share this to receive tokens');
    }
  };

  const handleWithdraw = () => {
    alert('Withdraw feature coming soon! Connect to DEX integration.');
  };

  const handleSwap = () => {
    alert('Swap feature coming soon! DEX integration in development.');
  };

  const handleMore = () => {
    alert('More wallet features coming soon!');
  };

  const handleClaimRewards = () => {
    alert(`🎉 Claimed ${pendingRewards} WGR tokens!`);
  };

  // Mock tokens data
  const tokens: Token[] = [
    {
      symbol: 'WGR',
      name: 'Wegram',
      balance: 1247.89,
      usdValue: 623.95,
      logo: 'https://i.ibb.co/TxdWc0kL/IMG-9101.jpg'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: 2.45,
      usdValue: 367.50,
      logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 150.00,
      usdValue: 150.00,
      logo: '💵'
    }
  ];

  const totalUsdValue = tokens.reduce((sum, token) => sum + token.usdValue, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        
        {/* Profile Header */}
        <div className="card mb-6" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">WeGram</h2>
              <p className="text-secondary text-sm">@TheWegramApp</p>
            </div>
          </div>

          {/* Balance Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-secondary text-sm mb-2">Wallet Balance</h3>
              <div className="flex items-center gap-2">
                <img 
                  src="https://i.ibb.co/TxdWc0kL/IMG-9101.jpg"
                  alt="WEGRAM" 
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-3xl font-bold text-primary">${totalUsdValue.toFixed(0)}</span>
                <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                  <RefreshCw className="w-4 h-4 text-secondary" />
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-secondary text-sm mb-2">Earnings</h3>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">${earnings}</span>
                <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                  <RefreshCw className="w-4 h-4 text-secondary" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <button
              onClick={handleDeposit}
              className="flex flex-col items-center gap-2 p-4 hover:bg-gray-700 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center">
                <ArrowUp className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-primary">Deposit</span>
            </button>
            <button
              onClick={handleWithdraw}
              className="flex flex-col items-center gap-2 p-4 hover:bg-gray-700 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center">
                <ArrowDown className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-primary">Withdraw</span>
            </button>
            <button
              onClick={handleSwap}
              className="flex flex-col items-center gap-2 p-4 hover:bg-gray-700 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-primary">Swap</span>
            </button>
            <button
              onClick={handleMore}
              className="flex flex-col items-center gap-2 p-4 hover:bg-gray-700 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-primary">More</span>
            </button>
          </div>
        </div>

        {/* Pending Rewards */}
        <div className="mb-6 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #7B2CFF 0%, #9945FF 100%)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-2">Pending Rewards</h3>
              <div className="flex items-center gap-2">
                <img 
                  src="https://i.ibb.co/TxdWc0kL/IMG-9101.jpg"
                  alt="WEGRAM" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-white text-2xl font-bold">{pendingRewards}</span>
              </div>
            </div>
            <button
              onClick={handleClaimRewards}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-full font-medium transition-colors border border-white border-opacity-30"
            >
              Wegram Portal
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex-1 py-3 text-center transition-colors relative ${
              activeTab === 'tokens' ? 'text-primary' : 'text-secondary'
            }`}
          >
            <span className="font-medium">Tokens</span>
            {activeTab === 'tokens' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-3 text-center transition-colors relative ${
              activeTab === 'tickets' ? 'text-primary' : 'text-secondary'
            }`}
          >
            <span className="font-medium">Tickets</span>
            {activeTab === 'tickets' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 text-center transition-colors relative ${
              activeTab === 'activity' ? 'text-primary' : 'text-secondary'
            }`}
          >
            <span className="font-medium">Activity</span>
            {activeTab === 'activity' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
            )}
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'tokens' && (
          <div className="space-y-3">
            {tokens.map((token) => (
              <div key={token.symbol} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {token.symbol === 'USDC' ? (
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
                        {token.logo}
                      </div>
                    ) : (
                      <img 
                        src={token.logo}
                        alt={token.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-primary font-semibold">{token.symbol}</h3>
                      <p className="text-secondary text-sm">{token.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-bold">{token.balance.toFixed(4)}</div>
                    <div className="text-secondary text-sm">${token.usdValue.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-primary font-semibold mb-2">No tickets yet</h3>
            <p className="text-secondary text-sm">Event tickets and NFTs will appear here</p>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-primary font-semibold mb-2">No activity yet</h3>
            <p className="text-secondary text-sm">Your transaction history will appear here</p>
          </div>
        )}

        {/* Wallet Details (Collapsible) */}
        {walletData && (
          <div className="mt-8 card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-primary font-semibold">Wallet Details</h3>
              <Settings className="w-5 h-5 text-secondary" />
            </div>
            
            {/* Wallet Address */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-secondary text-sm">Wallet Address</span>
                <button
                  onClick={() => handleCopy(walletData.publicKey, 'address')}
                  className="p-1 hover:bg-gray-600 rounded transition-colors"
                >
                  {copiedItem === 'address' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-3 bg-black bg-opacity-30 rounded-lg font-mono text-xs text-primary break-all">
                {walletData.publicKey}
              </div>
            </div>

            {/* Private Key */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-secondary text-sm">Private Key</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="p-1 hover:bg-gray-600 rounded transition-colors"
                  >
                    {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleCopy(walletData.privateKey, 'privateKey')}
                    className="p-1 hover:bg-gray-600 rounded transition-colors"
                  >
                    {copiedItem === 'privateKey' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-black bg-opacity-30 rounded-lg font-mono text-xs text-primary break-all">
                {showPrivateKey ? walletData.privateKey : '•'.repeat(88)}
              </div>
            </div>

            {/* Recovery Phrase */}
            {walletData.mnemonic && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary text-sm">Recovery Phrase</span>
                  <button
                    onClick={() => handleCopy(walletData.mnemonic!, 'mnemonic')}
                    className="p-1 hover:bg-gray-600 rounded transition-colors"
                  >
                    {copiedItem === 'mnemonic' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="p-3 bg-black bg-opacity-30 rounded-lg text-xs text-primary">
                  {walletData.mnemonic}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};