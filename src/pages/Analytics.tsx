import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Heart, Share, Copy, Check } from 'lucide-react';

interface TopPost {
  id: string;
  content: string;
  likes: number;
  shares: number;
  views: number;
}

interface Referral {
  id: string;
  username: string;
  joinDate: string;
  status: 'active' | 'pending';
}

export const Analytics: React.FC = () => {
  const [referralLinkCopied, setReferralLinkCopied] = useState(false);
  
  const stats = [
    { label: 'Total Views', value: '12.4K', change: '+12%', icon: Eye, color: 'text-blue-400' },
    { label: 'Engagement', value: '8.7%', change: '+2.1%', icon: BarChart3, color: 'text-green-400' },
    { label: 'Followers', value: '1.2K', change: '+43', icon: Users, color: 'text-purple-400' },
    { label: 'Growth Rate', value: '15.3%', change: '+5.2%', icon: TrendingUp, color: 'text-orange-400' }
  ];

  const topLikedPosts: TopPost[] = [
    {
      id: '1',
      content: 'Up 40% since I joined WEGRAM 🚀 — real web3 experience!',
      likes: 156,
      shares: 23,
      views: 2400
    },
    {
      id: '2',
      content: 'The future of social media is here. Earning while posting has never been this easy! #Web3 #SocialFi',
      likes: 89,
      shares: 18,
      views: 1800
    },
    {
      id: '3',
      content: 'Just completed my daily check-in and earned +2 WGM! These micro-rewards really add up over time.',
      likes: 67,
      shares: 12,
      views: 1200
    }
  ];

  const topPerformingPosts: TopPost[] = [
    {
      id: '1',
      content: 'The future of social media is here. Earning while posting has never been this easy! #Web3 #SocialFi',
      likes: 89,
      shares: 18,
      views: 2800
    },
    {
      id: '2',
      content: 'Up 40% since I joined WEGRAM 🚀 — real web3 experience!',
      likes: 156,
      shares: 23,
      views: 2400
    },
    {
      id: '3',
      content: 'Just discovered this amazing DeFi protocol. The yields are incredible! 💰',
      likes: 45,
      shares: 8,
      views: 1900
    }
  ];

  const referrals: Referral[] = [
    { id: '1', username: '@crypto_newbie', joinDate: '2 days ago', status: 'active' },
    { id: '2', username: '@defi_explorer', joinDate: '1 week ago', status: 'active' },
    { id: '3', username: '@nft_lover', joinDate: '2 weeks ago', status: 'active' },
    { id: '4', username: '@web3_builder', joinDate: '3 weeks ago', status: 'pending' }
  ];

  const referralLink = 'https://wegram.com/invite/demo_user_123';

  const handleCopyReferralLink = () => {
    navigator.clipboard?.writeText(referralLink);
    // Wallet integration coming soon
    setTimeout(() => setReferralLinkCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-24">
      <h1 className="text-xl font-bold text-primary mb-6">Analytics</h1>

      {/* Top Liked Posts */}
      <div className="card mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-5 h-5 text-red-400" />
          <h3 className="text-primary font-medium text-sm">Top Liked Posts</h3>
        </div>
        <div className="space-y-3">
          {topLikedPosts.map((post, index) => (
            <div key={post.id} className="p-2 bg-black bg-opacity-20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <span className="text-purple-400 font-bold text-xs">#{index + 1}</span>
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share className="w-3 h-3" />
                    {post.shares}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views}
                  </span>
                </div>
              </div>
              <p className="text-primary text-xs leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="card mb-4">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-primary font-medium text-sm">Top Performing Posts</h3>
        </div>
        <div className="space-y-3">
          {topPerformingPosts.map((post, index) => (
            <div key={post.id} className="p-2 bg-black bg-opacity-20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <span className="text-green-400 font-bold text-xs">#{index + 1}</span>
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share className="w-3 h-3" />
                    {post.shares}
                  </span>
                </div>
              </div>
              <p className="text-primary text-xs leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals Section */}
      <div className="card mb-4">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-primary font-medium text-sm">Referrals</h3>
          <div className="ml-auto bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {referrals.filter(r => r.status === 'active').length}
          </div>
        </div>

        {/* Referral Link */}
        <div className="mb-6">
          <label className="block text-secondary text-sm mb-2">Your referral link:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="input flex-1 text-sm bg-black bg-opacity-30"
            />
            <button
              onClick={handleCopyReferralLink}
              className={`px-4 py-2 rounded-lg transition-colors ${
                referralLinkCopied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {referralLinkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-black bg-opacity-20 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {referrals.filter(r => r.status === 'active').length}
            </div>
            <div className="text-secondary text-sm">Active Referrals</div>
          </div>
          <div className="text-center p-3 bg-black bg-opacity-20 rounded-lg">
            <div className="text-2xl font-bold text-orange-400">
              {referrals.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-secondary text-sm">Pending</div>
          </div>
        </div>

        {/* Referral List */}
        <div>
          <h4 className="text-primary font-medium mb-3">Recent Referrals</h4>
          <div className="space-y-3">
            {referrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-primary font-medium">{referral.username}</div>
                  <div className="text-secondary text-sm">Joined {referral.joinDate}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  referral.status === 'active' 
                    ? 'bg-green-600 bg-opacity-20 text-green-400' 
                    : 'bg-orange-600 bg-opacity-20 text-orange-400'
                }`}>
                  {referral.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Stats - Now at bottom and smaller */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          <h3 className="text-primary font-medium text-sm">Analytics Overview</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="p-3 bg-black bg-opacity-30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-green-400 text-xs font-medium">{stat.change}</span>
                </div>
                <div className="text-lg font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-secondary text-xs">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};