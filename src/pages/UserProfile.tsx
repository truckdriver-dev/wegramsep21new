import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Users, Send, UserPlus, UserMinus } from 'lucide-react';
import { MessageModal } from '../components/Layout/MessageModal';
import { useTheme } from '../hooks/useTheme';

interface UserProfileData {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  bannerColor: string;
  joinDate: string;
  posts: number;
  followers: number;
  following: number;
  mutualConnections: number;
  isFollowing: boolean;
  connections: {
    platform: string;
    username: string;
    memberSince: string;
    posts: number;
    followers: number;
    verified: boolean;
  }[];
}

// Mock user data - in real app this would come from API
const getUserData = (username: string): UserProfileData => {
  const userData: { [key: string]: UserProfileData } = {
    '@crypto_trader': {
      username: '@crypto_trader',
      displayName: 'CryptoTrader',
      bio: 'Professional crypto trader • DeFi enthusiast • Building wealth in Web3',
      avatar: '👨‍💼',
      bannerColor: 'from-blue-600 to-purple-600',
      joinDate: 'Jan 15, 2024',
      posts: 156,
      followers: 2400,
      following: 890,
      mutualConnections: 12,
      isFollowing: false,
      connections: [
        {
          platform: 'Twitter',
          username: '@cryptotrader_pro',
          memberSince: 'May 15, 2022',
          posts: 1460,
          followers: 102,
          verified: true
        }
      ]
    },
    '@defi_expert': {
      username: '@defi_expert',
      displayName: 'DeFi Expert',
      bio: 'Yield farming specialist • Protocol researcher • Sharing alpha daily',
      avatar: '🧠',
      bannerColor: 'from-green-600 to-blue-600',
      joinDate: 'Dec 3, 2023',
      posts: 89,
      followers: 1800,
      following: 456,
      mutualConnections: 8,
      isFollowing: true,
      connections: [
        {
          platform: 'LinkedIn',
          username: 'defi-researcher',
          memberSince: 'Mar 10, 2021',
          posts: 892,
          followers: 567,
          verified: false
        }
      ]
    },
    '@nft_collector': {
      username: '@nft_collector',
      displayName: 'NFT Collector',
      bio: 'Digital art enthusiast • Collecting rare NFTs • Building the future of art',
      avatar: '🎨',
      bannerColor: 'from-purple-600 to-pink-600',
      joinDate: 'Feb 28, 2024',
      posts: 234,
      followers: 3200,
      following: 1200,
      mutualConnections: 15,
      isFollowing: false,
      connections: [
        {
          platform: 'Instagram',
          username: '@nft_art_collector',
          memberSince: 'Aug 5, 2020',
          posts: 2340,
          followers: 15600,
          verified: true
        }
      ]
    },
    '@web3_dev': {
      username: '@web3_dev',
      displayName: 'Web3 Developer',
      bio: 'Full-stack blockchain developer • Smart contract specialist • Building DeFi protocols on Solana',
      avatar: '👨‍💻',
      bannerColor: 'from-cyan-600 to-blue-600',
      joinDate: 'Mar 10, 2024',
      posts: 127,
      followers: 1850,
      following: 643,
      mutualConnections: 18,
      isFollowing: false,
      connections: []
    },
    '@crypto_whale': {
      username: '@crypto_whale',
      displayName: 'Crypto Whale',
      bio: 'Large-scale investor • Market analyst • Sharing insights on crypto trends and opportunities',
      avatar: '🐋',
      bannerColor: 'from-blue-600 to-indigo-600',
      joinDate: 'Nov 5, 2023',
      posts: 289,
      followers: 8420,
      following: 234,
      mutualConnections: 32,
      isFollowing: true,
      connections: []
    },
    '@nft_artist': {
      username: '@nft_artist',
      displayName: 'NFT Artist',
      bio: 'Digital creator • 1/1 NFT artist • Exploring the intersection of art and blockchain technology',
      avatar: '🎭',
      bannerColor: 'from-pink-600 to-purple-600',
      joinDate: 'Aug 22, 2023',
      posts: 342,
      followers: 4560,
      following: 892,
      mutualConnections: 24,
      isFollowing: false,
      connections: []
    },
    '@defi_guru': {
      username: '@defi_guru',
      displayName: 'DeFi Guru',
      bio: 'Yield farming expert • Protocol researcher • Maximizing returns in decentralized finance',
      avatar: '📊',
      bannerColor: 'from-green-600 to-emerald-600',
      joinDate: 'Sep 15, 2023',
      posts: 198,
      followers: 6340,
      following: 445,
      mutualConnections: 28,
      isFollowing: true,
      connections: []
    },
    '@blockchain_news': {
      username: '@blockchain_news',
      displayName: 'Blockchain News',
      bio: 'Breaking crypto news • Market updates • Keeping the community informed about Web3 developments',
      avatar: '📰',
      bannerColor: 'from-orange-600 to-red-600',
      joinDate: 'Jun 3, 2023',
      posts: 1247,
      followers: 12800,
      following: 156,
      mutualConnections: 45,
      isFollowing: false,
      connections: []
    },
    '@solana_builder': {
      username: '@solana_builder',
      displayName: 'Solana Builder',
      bio: 'Building on Solana • dApp developer • Passionate about fast, scalable blockchain solutions',
      avatar: '⚡',
      bannerColor: 'from-purple-600 to-violet-600',
      joinDate: 'Dec 18, 2023',
      posts: 156,
      followers: 2940,
      following: 567,
      mutualConnections: 21,
      isFollowing: true,
      connections: []
    },
    '@crypto_educator': {
      username: '@crypto_educator',
      displayName: 'Crypto Educator',
      bio: 'Teaching Web3 • Simplifying blockchain concepts • Helping newcomers navigate the crypto space',
      avatar: '🎓',
      bannerColor: 'from-blue-600 to-teal-600',
      joinDate: 'Apr 7, 2024',
      posts: 234,
      followers: 5680,
      following: 789,
      mutualConnections: 35,
      isFollowing: false,
      connections: []
    },
    '@metaverse_explorer': {
      username: '@metaverse_explorer',
      displayName: 'Metaverse Explorer',
      bio: 'Virtual world enthusiast • NFT collector • Exploring digital realms and blockchain gaming',
      avatar: '🌐',
      bannerColor: 'from-indigo-600 to-purple-600',
      joinDate: 'Jan 29, 2024',
      posts: 178,
      followers: 3420,
      following: 923,
      mutualConnections: 19,
      isFollowing: true,
      connections: []
    }
  };

  return userData[username] || {
    username: username,
    displayName: username.replace('@', ''),
    bio: 'Web3 enthusiast • Building the future',
    avatar: '👤',
    bannerColor: 'from-gray-600 to-gray-800',
    joinDate: 'Jan 1, 2024',
    posts: 0,
    followers: 0,
    following: 0,
    mutualConnections: 0,
    isFollowing: false,
    connections: []
  };
};

// Mock feed posts from various users
const getFeedPosts = () => {
  return [
    {
      id: 'feed1',
      userId: 'web3_dev',
      username: '@web3_dev',
      content: '🚀 Just deployed my first smart contract on Solana! The future is decentralized. Building the next generation of DeFi protocols.',
      timestamp: '2h',
      likes: 247,
      replies: 89,
      shares: 34,
      gifts: 12,
      isFollowing: false
    },
    {
      id: 'feed2',
      userId: 'crypto_whale',
      username: '@crypto_whale',
      content: 'Market update: SOL looking bullish! 📈 The Web3 ecosystem is growing stronger every day. Time to accumulate more tokens!',
      timestamp: '4h',
      likes: 892,
      replies: 156,
      shares: 78,
      gifts: 45,
      isFollowing: true
    },
    {
      id: 'feed3',
      userId: 'nft_artist',
      username: '@nft_artist',
      content: '🎨 New NFT collection dropping tomorrow! Each piece tells a story of the digital revolution. Web3 is empowering creators like never before.',
      timestamp: '6h',
      likes: 524,
      replies: 203,
      shares: 91,
      gifts: 28,
      isFollowing: false
    },
    {
      id: 'feed4',
      userId: 'defi_guru',
      username: '@defi_guru',
      content: 'Yield farming strategies for 2025: 💰 1. Diversify protocols 2. Monitor impermanent loss 3. Compound rewards 4. Stay updated on new pools',
      timestamp: '8h',
      likes: 1247,
      replies: 234,
      shares: 156,
      gifts: 67,
      isFollowing: true
    },
    {
      id: 'feed5',
      userId: 'blockchain_news',
      username: '@blockchain_news',
      content: '🔥 BREAKING: Major DeFi protocol announces integration with Solana. This could be a game-changer for cross-chain liquidity!',
      timestamp: '12h',
      likes: 2156,
      replies: 445,
      shares: 289,
      gifts: 134,
      isFollowing: false
    },
    {
      id: 'feed6',
      userId: 'solana_builder',
      username: '@solana_builder',
      content: 'Building on Solana is incredible! ⚡ The speed and low fees make it perfect for consumer applications. The ecosystem is thriving!',
      timestamp: '1d',
      likes: 678,
      replies: 123,
      shares: 56,
      gifts: 23,
      isFollowing: true
    },
    {
      id: 'feed7',
      userId: 'crypto_educator',
      username: '@crypto_educator',
      content: '📚 Web3 Education Thread: Understanding smart contracts, DeFi protocols, and the future of decentralized finance. Knowledge is power!',
      timestamp: '1d',
      likes: 934,
      replies: 178,
      shares: 267,
      gifts: 45,
      isFollowing: false
    },
    {
      id: 'feed8',
      userId: 'metaverse_explorer',
      username: '@metaverse_explorer',
      content: '🌐 Exploring virtual worlds built on blockchain! The metaverse is becoming reality. Own your digital assets, control your destiny.',
      timestamp: '2d',
      likes: 445,
      replies: 67,
      shares: 23,
      gifts: 15,
      isFollowing: true
    }
  ];
};

export const UserProfile: React.FC = () => {
  const { isDark } = useTheme();
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set(['@crypto_whale', '@defi_guru', '@solana_builder', '@metaverse_explorer']));
  
  if (!username) {
    navigate('/home');
    return null;
  }

  const user = getUserData(username);

  const handleFollow = () => {
    // Follow/unfollow logic would go here
    console.log('Follow/unfollow user:', username);
  };

  const handleFollowUser = (postUsername: string) => {
    const newFollowing = new Set(followingUsers);
    if (newFollowing.has(postUsername)) {
      newFollowing.delete(postUsername);
    } else {
      newFollowing.add(postUsername);
    }
    setFollowingUsers(newFollowing);
  };

  const handleMessage = () => {
    setIsMessageModalOpen(true);
  };


  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-opacity-95 backdrop-blur-sm px-4 py-3 flex items-center gap-3" style={{ backgroundColor: 'var(--bg)' }}>
        <button
          onClick={() => navigate(-1)}
          className={`p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-primary">{user.displayName}</h1>
          <p className="text-sm text-secondary">{user.posts} posts</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className={`p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}>
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Banner */}
        <div className={`h-32 bg-gradient-to-r ${user.bannerColor} relative`}>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <MoreHorizontal className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-4xl border-4 border-gray-900">
              {user.avatar}
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>

          {/* Name and Bio */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-primary mb-1">{user.displayName}</h2>
            <p className="text-secondary mb-2">{user.username}</p>
            <p className="text-primary text-sm leading-relaxed">{user.bio}</p>
          </div>


          {/* Message Button */}
          <div className="mb-6">
            <button
              onClick={handleMessage}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </div>

          {/* Recent Feed Posts */}
          <div className="card mb-4">
            <h3 className="text-primary font-semibold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {getFeedPosts().map(post => (
                <div key={post.id} className={`p-4 rounded-lg transition-colors ${
                  isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-100 hover:bg-gray-50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => navigate(`/user/${post.username}`)}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform cursor-pointer"
                      >
                        {post.username.charAt(1).toUpperCase()}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/user/${post.username}`)}
                            className="text-primary font-medium hover:text-purple-400 transition-colors cursor-pointer"
                          >
                            {post.username}
                          </button>
                          <span className="text-secondary text-sm">•</span>
                          <span className="text-secondary text-sm">{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollowUser(post.username)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        followingUsers.has(post.username)
                          ? isDark 
                            ? 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                            : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {followingUsers.has(post.username) ? (
                        <>
                          <UserMinus className="w-3 h-3" />
                          Unfollow
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3 h-3" />
                          Follow
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-primary mb-3 leading-relaxed">{post.content}</p>
                  <div className="flex items-center justify-between text-secondary text-sm">
                    <div className="flex gap-4">
                      <span>{post.likes} likes</span>
                      <span>{post.replies} replies</span>
                      <span>{post.shares} shares</span>
                    </div>
                    <span>{post.gifts} gifts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="card mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-primary">{user.posts}</div>
                <div className="text-secondary text-sm">Posts</div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary">{user.followers.toLocaleString()}</div>
                <div className="text-secondary text-sm">Followers</div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary">{user.following.toLocaleString()}</div>
                <div className="text-secondary text-sm">Following</div>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <button
            onClick={handleFollow}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              user.isFollowing
                ? isDark 
                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-400 text-gray-600 hover:bg-gray-500'
                : 'btn-primary'
            }`}
          >
            {user.isFollowing ? 'Following' : 'Follow'}
          </button>

        </div>
      </div>
      
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientUsername={username}
      />
    </div>
  );
};