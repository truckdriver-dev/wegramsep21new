import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Staking: React.FC = () => {
  const navigate = useNavigate();
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);
  
  // Mock user data
  const userBalance = 10000; // WGM balance
  const currentStaked = 42.5;
  const earnedRewards = 42.5;
  const portfolioValue = 23850;
  const portfolioGain = 12.14;
  const dpr = 10.000; // Daily Percentage Rate
  const apr = 8.540; // Annual Percentage Rate

  // Mock transaction data
  const recentTransactions = [
    { amount: 5000, price: 5.30, type: 'Stake' },
    { amount: 3000, price: 5.28, type: 'Unstake' }
  ];

  const percentageOptions = [25, 50, 75, 10];

  const handlePercentageClick = (percentage: number) => {
    const amount = (userBalance * percentage / 100).toString();
    setStakeAmount(amount);
    setSelectedPercentage(percentage);
  };

  const handleCustomPercentage = () => {
    setSelectedPercentage(null);
  };

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Please enter a valid amount to stake');
      return;
    }
    if (parseFloat(stakeAmount) > userBalance) {
      alert('Insufficient balance');
      return;
    }
    alert(`Staking ${stakeAmount} WGM tokens!`);
  };

  const handleUnstake = () => {
    if (currentStaked <= 0) {
      alert('No tokens currently staked');
      return;
    }
    alert(`Unstaking ${currentStaked} WGM tokens!`);
  };

  const handleClaimStaking = () => {
    if (currentStaked <= 0) {
      alert('No staking rewards to claim');
      return;
    }
    alert(`Claiming staking rewards!`);
  };

  const handleClaimRewards = () => {
    if (earnedRewards <= 0) {
      alert('No rewards to claim');
      return;
    }
    alert(`Claiming ${earnedRewards} WGM rewards!`);
  };

  const handleRefreshRate = () => {
    alert('Exchange rate refreshed!');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          
          <div className="flex items-center gap-3">
            <img 
              src="https://i.ibb.co/TxdWc0kL/IMG-9101.jpg"
              alt="WEGRAM Logo" 
              className="w-12 h-12 rounded-xl object-cover shadow-2xl border border-purple-400/30"
            />
            <div className="text-2xl font-bold gradient-text">$WGM</div>
          </div>
        </div>

        {/* Main Staking Card */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-6 text-primary">How much $WGM do you want to stake?</h2>
          
          {/* Token Input Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              <img 
                src="https://i.ibb.co/TxdWc0kL/IMG-9101.jpg"
                alt="WEGRAM Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xl font-semibold text-primary">$WGM</div>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => {
                setStakeAmount(e.target.value);
                handleCustomPercentage();
              }}
              placeholder="Enter amount"
              className="input flex-1"
            />
          </div>

          {/* Percentage Buttons */}
          <div className="flex gap-3 mb-6">
            {percentageOptions.map((percentage) => (
              <button
                key={percentage}
                onClick={() => handlePercentageClick(percentage)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedPercentage === percentage
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-gray-600 hover:border-purple-400 text-primary'
                }`}
              >
                {percentage}%
              </button>
            ))}
            <button
              onClick={handleCustomPercentage}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedPercentage === null && stakeAmount
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'border-gray-600 hover:border-purple-400 text-primary'
              }`}
            >
              %
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-secondary text-sm">DPR:</div>
              <div className="text-secondary text-sm">APR:</div>
              <div className="text-secondary text-sm">staked:</div>
            </div>
            <div className="text-right">
              <div className="text-primary">{dpr.toFixed(3)} WGM</div>
              <div className="text-primary">{apr.toFixed(3)} so</div>
              <div className="text-primary">{currentStaked} WGM</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleStake}
              className="btn-secondary py-3 font-semibold"
            >
              STAKE
            </button>
            <button
              onClick={handleUnstake}
              className="btn-secondary py-3 font-semibold"
            >
              UNSTAKE
            </button>
            <button
              onClick={handleClaimStaking}
              className="btn-secondary py-3 font-semibold"
            >
              CLAIM
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Exchange Rate */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-primary">CURRENT EXCHANGE RATE</h3>
              <button
                onClick={handleRefreshRate}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-secondary" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src="https://i.ibb.co/TxdWc0kL/IMG-9101.jpg"
                  alt="WEGRAM" 
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-primary">WGM</span>
              </div>
              <span className="text-secondary">→</span>
              <span className="text-primary">SOL</span>
              <div className="ml-auto text-lg font-semibold text-primary">5.30</div>
            </div>
          </div>

          {/* Rewards */}
          <div className="card">
            <h3 className="font-semibold mb-3 text-primary">REWARDS</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-secondary">Earned:</span>
              <span className="text-xl font-semibold text-primary">{earnedRewards} WGM</span>
            </div>
            <button
              onClick={handleClaimRewards}
              className="btn-secondary w-full py-3 font-semibold"
            >
              CLAIM
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold mb-4 text-primary">Recent transactions</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm text-secondary mb-2">
                <span>Amount</span>
                <span>Price</span>
                <span>Type</span>
              </div>
              {recentTransactions.map((tx, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm text-primary">
                  <span>{tx.amount.toLocaleString()}</span>
                  <span>{tx.price}</span>
                  <span className={tx.type === 'Stake' ? 'text-green-400' : 'text-red-400'}>
                    {tx.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4 text-primary">Recent transactions</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm text-secondary mb-2">
                <span>Pair</span>
                <span>Price</span>
                <span>Type</span>
              </div>
              {recentTransactions.map((tx, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm text-primary">
                  <span>{tx.amount.toLocaleString()}</span>
                  <span>{tx.price}</span>
                  <span className={tx.type === 'Stake' ? 'text-green-400' : 'text-red-400'}>
                    {tx.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="mt-6 card">
          <h3 className="font-semibold mb-2 text-primary">your portfolio</h3>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-primary">${portfolioValue.toLocaleString()}</div>
            <div className="text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +{portfolioGain}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};