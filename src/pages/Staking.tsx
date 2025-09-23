import React, { useState } from 'react';
import { ArrowLeft, Wallet, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Staking: React.FC = () => {
  const navigate = useNavigate();
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  
  // Mock data matching the design
  const totalStaked = 2847392000;
  const apy = 24.7;
  const availableToStake = 1250.00;
  const availableToUnstake = 500.00;

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Please enter a valid amount to stake');
      return;
    }
    if (parseFloat(stakeAmount) > availableToStake) {
      alert('Insufficient balance');
      return;
    }
    alert(`Staking ${stakeAmount} WEGRAM tokens!`);
  };

  const handleUnstake = () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      alert('Please enter a valid amount to unstake');
      return;
    }
    if (parseFloat(unstakeAmount) > availableToUnstake) {
      alert('Insufficient staked amount');
      return;
    }
    alert(`Unstaking ${unstakeAmount} WEGRAM tokens!`);
  };

  const handleMaxStake = () => {
    setStakeAmount(availableToStake.toString());
  };

  const handleMaxUnstake = () => {
    setUnstakeAmount(availableToUnstake.toString());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              W
            </div>
            <div className="text-2xl font-bold text-white">Wegram Staking</div>
          </div>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Wallet className="w-4 h-4" />
            Connect
          </button>
        </div>

        {/* Total Staked Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                W
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{totalStaked.toLocaleString()}</div>
                <div className="text-blue-100 text-sm">Total Staked</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-200">{apy}%</div>
              <div className="text-blue-100 text-sm">APY</div>
            </div>
          </div>
        </div>

        {/* Stake Tokens Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Stake Tokens</h3>
          <div className="mb-4">
            <div className="text-gray-300 text-sm mb-1">Available to Stake:</div>
            <div className="text-white font-semibold">{availableToStake.toLocaleString()} WEGRAM</div>
          </div>
          
          <div className="mb-4">
            <div className="relative">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Enter amount to stake"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleMaxStake}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                MAX
              </button>
            </div>
          </div>
          
          <button
            onClick={handleStake}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            Stake Wegram
          </button>
        </div>

        {/* Unstake Tokens Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Unstake Tokens</h3>
          <div className="mb-4">
            <div className="text-gray-300 text-sm mb-1">Available to Unstake:</div>
            <div className="text-white font-semibold">{availableToUnstake.toLocaleString()} WEGRAM</div>
          </div>
          
          <div className="mb-4">
            <div className="relative">
              <input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                placeholder="Enter amount to unstake"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleMaxUnstake}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                MAX
              </button>
            </div>
          </div>
          
          <button
            onClick={handleUnstake}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all"
          >
            Unstake Wegram
          </button>
        </div>

        {/* How Staking Works Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="text-xl font-bold text-blue-400">How Staking Works?</h3>
            {showHowItWorks ? (
              <ChevronUp className="w-5 h-5 text-blue-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-400" />
            )}
          </button>
          
          {showHowItWorks && (
            <div className="mt-6 space-y-4">
              {/* Flexible Staking */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Flexible Staking</h4>
                  <p className="text-gray-300 text-sm">
                    Stake WEGRAM with no lock-up. Earn SPL tokens (SOL, USDC, WEGRAM) with rotating rewards.
                  </p>
                </div>
              </div>

              {/* Proportional Rewards */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Proportional Rewards</h4>
                  <p className="text-gray-300 text-sm">
                    Rewards distributed based on your stake amount. More stake = bigger share.
                  </p>
                </div>
              </div>

              {/* Low Fees */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Low Fees</h4>
                  <p className="text-gray-300 text-sm">
                    Small deposit fee (currently 0%). Maximum returns on Solana network.
                  </p>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  i
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Pro Tip</h4>
                  <p className="text-gray-300 text-sm">
                    Restake rewards to compound earnings and maximize returns!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};