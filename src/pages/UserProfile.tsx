import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Gift, CheckCircle, UserPlus, UserMinus, Send, Palette, Zap, Flame, Diamond, XCircle, Flag, Share } from 'lucide-react';
import { MessageModal } from '../components/Layout/MessageModal';
import { PostCard } from '../components/Post/PostCard';
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
  verified?: boolean;
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
    '@alexchen': {
      username: '@alexchen.eth',
      displayName: 'Alex Chen',
      bio: 'Building the future of Web3 social 🚀 | NFT collector & DeFi enthusiast | Always learning, always creating',
      avatar: 'AC',
      bannerColor: 'from-purple-600 to-blue-600',
      joinDate: 'Jan 15, 2024',
      posts: 847,
      followers: 12500,
      following: 2100,
      mutualConnections: 12,
      isFollowing: false,
      verified: true,
      connections: [
        {
          platform: 'Twitter',
          username: '@alexchen_crypto',
          memberSince: 'May 15, 2022',
          posts: 1460,
          followers: 10200,
          verified: true
        }
      ]
    },
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
    verified: false,
    connections: []
  };
};

// Mock feed posts personalized for each user based on their interests and following patterns
const getFeedPosts = (username: string) => {
  // Add specific dummy posts for each user
  const userSpecificPosts: { [key: string]: any[] } = {
    '@alexchen': [
      {
        id: 'alex_post_1',
        userId: 'alexchen',
        username: '@alexchen',
        content: 'Just discovered this amazing new DeFi protocol! The yield farming opportunities are incredible 🚀',
        timestamp: '2h',
        likes: 234,
        replies: 45,
        shares: 12,
        gifts: 8
      },
      {
        id: 'alex_post_2',
        userId: 'alexchen',
        username: '@alexchen',
        content: 'Building the future of Web3 social media. Excited to share what we\'ve been working on! 💎',
        timestamp: '5h',
        likes: 567,
        replies: 89,
        shares: 34,
        gifts: 15
      },
      {
        id: 'alex_post_3',
        userId: 'alexchen',
        username: '@alexchen',
        content: 'NFT market is heating up! Just minted a rare piece from the new collection 🔥',
        timestamp: '1d',
        likes: 123,
        replies: 23,
        shares: 7,
        gifts: 3
      },
      {
        id: 'alex_post_4',
        userId: 'alexchen',
        username: '@alexchen',
        content: 'Solana ecosystem is growing so fast! The developer experience is unmatched ⚡',
        timestamp: '2d',
        likes: 345,
        replies: 67,
        shares: 19,
        gifts: 11
      },
      {
        id: 'alex_post_5',
        userId: 'alexchen',
        username: '@alexchen',
        content: 'Web3 education is key to mass adoption. Sharing knowledge with the community 📚',
        timestamp: '3d',
        likes: 189,
        replies: 34,
        shares: 15,
        gifts: 6
      }
    ]
  };

  // Return user-specific posts if available, otherwise use the personalized feed
  if (userSpecificPosts[username]) {
    return userSpecificPosts[username];
  }
  // Define realistic following relationships and interests for each user
  const userInterests: { [key: string]: { following: string[], interests: string[], recommendations: string[] } } = {
    '@crypto_trader': {
      following: ['@defi_guru', '@crypto_whale', '@blockchain_news', '@solana_builder'],
      interests: ['trading', 'market_analysis', 'defi', 'solana'],
      recommendations: ['@crypto_educator', '@web3_dev']
    },
    '@defi_expert': {
      following: ['@crypto_whale', '@solana_builder', '@crypto_educator', '@web3_dev'],
      interests: ['defi', 'yield_farming', 'protocols', 'solana'],
      recommendations: ['@blockchain_news', '@crypto_trader']
    },
    '@nft_collector': {
      following: ['@nft_artist', '@metaverse_explorer', '@crypto_whale', '@crypto_educator'],
      interests: ['nft', 'art', 'metaverse', 'collecting'],
      recommendations: ['@blockchain_news', '@defi_guru']
    },
    '@web3_dev': {
      following: ['@solana_builder', '@defi_guru', '@crypto_educator', '@crypto_whale'],
      interests: ['development', 'solana', 'defi', 'smart_contracts'],
      recommendations: ['@blockchain_news', '@nft_artist']
    },
    '@crypto_whale': {
      following: ['@defi_guru', '@blockchain_news', '@crypto_educator', '@solana_builder'],
      interests: ['investment', 'institutional', 'defi', 'market_analysis'],
      recommendations: ['@crypto_trader', '@web3_dev']
    },
    '@nft_artist': {
      following: ['@nft_collector', '@metaverse_explorer', '@crypto_whale', '@crypto_educator'],
      interests: ['art', 'nft', 'metaverse', 'creativity'],
      recommendations: ['@blockchain_news', '@defi_guru']
    },
    '@defi_guru': {
      following: ['@crypto_whale', '@solana_builder', '@crypto_educator', '@web3_dev'],
      interests: ['defi', 'yield_farming', 'protocols', 'education'],
      recommendations: ['@crypto_trader', '@blockchain_news']
    },
    '@blockchain_news': {
      following: ['@crypto_whale', '@defi_guru', '@solana_builder', '@crypto_educator'],
      interests: ['news', 'analysis', 'institutional', 'adoption'],
      recommendations: ['@crypto_trader', '@web3_dev']
    },
    '@solana_builder': {
      following: ['@web3_dev', '@defi_guru', '@crypto_educator', '@crypto_whale'],
      interests: ['solana', 'development', 'defi', 'ecosystem'],
      recommendations: ['@blockchain_news', '@crypto_trader']
    },
    '@crypto_educator': {
      following: ['@defi_guru', '@crypto_whale', '@web3_dev', '@solana_builder'],
      interests: ['education', 'tutorials', 'defi', 'blockchain'],
      recommendations: ['@nft_artist', '@metaverse_explorer']
    },
    '@metaverse_explorer': {
      following: ['@nft_artist', '@nft_collector', '@crypto_whale', '@crypto_educator'],
      interests: ['metaverse', 'nft', 'virtual_worlds', 'art'],
      recommendations: ['@blockchain_news', '@defi_guru']
    }
  };

  // Generate personalized feed based on user's interests and following
  const generatePersonalizedFeed = (username: string) => {
    const userProfile = userInterests[username];
    if (!userProfile) return [];

    const allUsers = [
      '@crypto_trader', '@defi_expert', '@nft_collector', '@web3_dev', '@crypto_whale',
      '@nft_artist', '@defi_guru', '@blockchain_news', '@solana_builder', '@crypto_educator', '@metaverse_explorer'
    ];

    const feed = [];
    let postId = 1;

    // Add posts from users they follow (70% of feed)
    userProfile.following.forEach(followedUser => {
      const posts = generatePostsForUser(followedUser, userProfile.interests, 2);
      feed.push(...posts.map(post => ({ ...post, id: `${username}_feed${postId++}`, isFollowing: true })));
    });

    // Add posts from recommended users (20% of feed)
    userProfile.recommendations.forEach(recUser => {
      const posts = generatePostsForUser(recUser, userProfile.interests, 1);
      feed.push(...posts.map(post => ({ ...post, id: `${username}_feed${postId++}`, isFollowing: false })));
    });

    // Add posts from other users based on interests (10% of feed)
    const otherUsers = allUsers.filter(u => 
      !userProfile.following.includes(u) && 
      !userProfile.recommendations.includes(u) && 
      u !== username
    );
    const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
    const posts = generatePostsForUser(randomUser, userProfile.interests, 1);
    feed.push(...posts.map(post => ({ ...post, id: `${username}_feed${postId++}`, isFollowing: false })));

    return feed.sort(() => Math.random() - 0.5); // Shuffle the feed
  };

  // Generate posts for a specific user based on interests
  const generatePostsForUser = (username: string, interests: string[], count: number) => {
    const postTemplates = {
      '@crypto_trader': [
        '📊 Trading signals: {interest} showing strong momentum! Perfect entry point for swing traders.',
        '📈 Market update: {interest} breaking resistance levels. Time to position for the next move!',
        '💰 Portfolio update: {interest} positions performing well. Risk management is key!'
      ],
      '@defi_guru': [
        '💎 DeFi yield opportunities: New {interest} pools offering 15% APY!',
        '🔧 Yield farming strategies for {interest}: Compound interest is the 8th wonder!',
        '⚡ {interest} protocol upgrade: Lower fees, higher rewards!'
      ],
      '@crypto_whale': [
        '🐋 Large {interest} accumulation detected! Smart money is positioning.',
        '💎 Institutional adoption of {interest} accelerating! The floodgates are opening.',
        '📊 Market analysis: {interest} showing institutional interest patterns.'
      ],
      '@nft_artist': [
        '🎨 New {interest} collection dropping! Each piece tells a story of digital revolution.',
        '🌐 {interest} art in the metaverse! The 3D environment brings it to life.',
        '💎 {interest} NFT sales hitting new highs! Digital art is becoming mainstream.'
      ],
      '@nft_collector': [
        '🎨 Just acquired a rare {interest} piece! The floor price keeps climbing.',
        '🌐 Virtual {interest} gallery opening! Come check out the latest collections.',
        '💎 {interest} market is heating up! Digital real estate is the future.'
      ],
      '@web3_dev': [
        '🚀 Just deployed a {interest} smart contract! The future is decentralized.',
        '⚡ {interest} development is incredible! Built a full dApp in just 2 days.',
        '🔧 New {interest} protocol audit completed! Security is paramount.'
      ],
      '@solana_builder': [
        '⚡ Solana {interest} development is so smooth! The ecosystem is thriving.',
        '🚀 Built a new {interest} protocol on Solana! Low fees make it perfect.',
        '📊 {interest} on Solana: Network upgrade successful! Speeds increased 40%.'
      ],
      '@crypto_educator': [
        '📚 {interest} education thread: Understanding the fundamentals is key!',
        '🎓 {interest} tutorial: Making complex concepts accessible to everyone.',
        '💡 {interest} knowledge is power! Education drives adoption.'
      ],
      '@blockchain_news': [
        '📰 Breaking: Major {interest} development announced! This could be a game-changer.',
        '🔥 {interest} adoption accelerating! Major corporations are entering the space.',
        '📈 {interest} market analysis: The next bull run could be driven by innovation.'
      ],
      '@metaverse_explorer': [
        '🌐 Exploring {interest} in virtual worlds! The metaverse is becoming reality.',
        '🎨 {interest} art looks incredible in 3D space! The immersive experience is next-level.',
        '💎 {interest} real estate is heating up! Virtual land prices are skyrocketing.'
      ]
    };

    const templates = postTemplates[username as keyof typeof postTemplates] || [
      '🚀 Exciting {interest} development! The future is bright.',
      '💎 {interest} showing strong potential! Time to pay attention.',
      '📊 {interest} analysis: The data looks promising!'
    ];

    const posts = [];
    for (let i = 0; i < count; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const interest = interests[Math.floor(Math.random() * interests.length)];
      const content = template.replace('{interest}', interest);
      
      posts.push({
        userId: username.replace('@', ''),
        username: username,
        content: content,
        timestamp: `${Math.floor(Math.random() * 12) + 1}h`,
        likes: Math.floor(Math.random() * 500) + 50,
        replies: Math.floor(Math.random() * 100) + 10,
        shares: Math.floor(Math.random() * 50) + 5,
        gifts: Math.floor(Math.random() * 30) + 2
      });
    }
    return posts;
  };

  const userFeeds: { [key: string]: any[] } = {
    '@crypto_trader': generatePersonalizedFeed('@crypto_trader'),
    '@defi_expert': generatePersonalizedFeed('@defi_expert'),
    '@nft_collector': generatePersonalizedFeed('@nft_collector'),
    '@web3_dev': generatePersonalizedFeed('@web3_dev'),
    '@crypto_whale': generatePersonalizedFeed('@crypto_whale'),
    '@nft_artist': generatePersonalizedFeed('@nft_artist'),
    '@defi_guru': generatePersonalizedFeed('@defi_guru'),
    '@blockchain_news': generatePersonalizedFeed('@blockchain_news'),
    '@solana_builder': generatePersonalizedFeed('@solana_builder'),
    '@crypto_educator': generatePersonalizedFeed('@crypto_educator'),
    '@metaverse_explorer': generatePersonalizedFeed('@metaverse_explorer')
  };

  return userFeeds[username] || [];
};

// Mock NFT data
const getNFTData = (username: string) => {
  const nftData: { [key: string]: any[] } = {
    '@alexchen': [
      { id: '1', name: 'CryptoPunks', tokenId: '#7804', icon: Palette, color: 'text-purple-400' },
      { id: '2', name: 'Uniswap V3', tokenId: '#12456', icon: Zap, color: 'text-cyan-400' },
      { id: '3', name: 'Bored Apes', tokenId: '#420', icon: Flame, color: 'text-orange-400' },
      { id: '4', name: 'Azuki', tokenId: '#1337', icon: Diamond, color: 'text-blue-400' }
    ]
  };
  
  return nftData[username] || [];
};

export const UserProfile: React.FC = () => {
  const { isDark } = useTheme();
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set(['@crypto_whale', '@defi_guru', '@solana_builder', '@metaverse_explorer']));
  const [activeTab, setActiveTab] = useState<'posts' | 'nft' | 'stats'>('posts');
  const [showActionMenu, setShowActionMenu] = useState(false);

  // Memoize the feed posts to prevent regeneration on every render
  const feedPosts = useMemo(() => {
    return getFeedPosts(`@${username}`);
  }, [username]);

  // Memoize NFT data
  const nftData = useMemo(() => {
    return getNFTData(`@${username}`);
  }, [username]);
  
  // Get the original profile from navigation state
  // This tracks the first profile clicked from home
  const originalProfile = location.state?.originalProfile;
  
  // Check if we came from chat page
  const isFromChat = location.state?.fromChat;
  
  // If no originalProfile is set, this means we came directly from home
  const isFirstProfileFromHome = !originalProfile;
  
  // Determine where the back button should go
  const getBackDestination = () => {
    if (isFromChat) {
      // If we came from chat, go back to chat
      return { path: '/messages', state: null };
    } else if (isFirstProfileFromHome) {
      // If this is the first profile clicked from home, go back to home
      return { path: '/home', state: null };
    } else {
      // If we came from another profile, go back to that original profile
      // The original profile should go back to home (not create a fake home profile)
      return { 
        path: `/user/${originalProfile}`, 
        state: null // No state, so it will be treated as first profile from home
      };
    }
  };

  // Check if back button should be enabled
  // Back button should only work if:
  // 1. This is the first profile from home (can go back to home)
  // 2. This is a subsequent profile (can go back to original profile)
  // 3. This is from chat (can go back to chat)
  const canGoBack = isFirstProfileFromHome || originalProfile || isFromChat;
  
  if (!username) {
    navigate('/home');
    return null;
  }

  const user = getUserData(`@${username}`);

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

  const handleLike = async (postId: string) => {
    console.log('Liking post:', postId);
    // Add like functionality here
  };

  const handleGift = async (postId: string) => {
    console.log('Gifting post:', postId);
    // Add gift functionality here
  };

  const handleBookmark = async (postId: string) => {
    console.log('Bookmarking post:', postId);
    // Add bookmark functionality here
  };

  const handleReply = async (postId: string) => {
    console.log('Replying to post:', postId);
    // Add reply functionality here
  };

  const handleShare = async (postId: string) => {
    console.log('Sharing post:', postId);
    // Add share functionality here
  };

  const handleProfileMenu = () => {
    setShowActionMenu(!showActionMenu);
  };

  const handleActionMenuClose = () => {
    setShowActionMenu(false);
  };

  const handleNotInterested = () => {
    setShowActionMenu(false);
    // TODO: Implement not interested functionality
    console.log('Not interested in this profile');
  };

  const handleReport = () => {
    setShowActionMenu(false);
    // TODO: Implement report functionality
    console.log('Report this profile');
  };

  const handleShareProfile = () => {
    setShowActionMenu(false);
    // TODO: Implement share functionality
    console.log('Share this profile');
  };



  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="space-y-4">
            {feedPosts.map(post => (
              <div key={post.id} className="relative">
                <PostCard
                  post={{
                    id: post.id,
                    userId: post.userId,
                    username: post.username,
                    content: post.content,
                    timestamp: post.timestamp,
                    likes: post.likes,
                    replies: post.replies,
                    shares: post.shares,
                    gifts: post.gifts
                  }}
                  onLike={handleLike}
                  onReply={handleReply}
                  onShare={handleShare}
                  onGift={handleGift}
                  onBookmark={handleBookmark}
                />
              </div>
            ))}
          </div>
        );
      case 'nft':
        return (
          <div className="grid grid-cols-2 gap-4">
            {nftData.map(nft => (
              <div key={nft.id} className="card p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-overlay-light flex items-center justify-center`}>
                  <nft.icon className={`w-6 h-6 ${nft.color}`} />
                </div>
                <h3 className="font-semibold text-primary text-sm mb-1">{nft.name}</h3>
                <p className="text-secondary text-xs">{nft.tokenId}</p>
              </div>
            ))}
          </div>
        );
      case 'stats':
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-overlay-light flex items-center justify-center">
              <div className="text-2xl">🚧</div>
            </div>
            <h3 className="text-primary font-semibold mb-2">Coming Soon</h3>
            <p className="text-secondary text-sm">The stats section is under development</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Action Menu Popup */}
      {showActionMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={handleActionMenuClose}
          />
          
          {/* Menu */}
          <div 
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden min-w-[280px] max-w-[320px] mx-4"
            style={{ backgroundColor: 'var(--card)' }}
          >
            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={handleNotInterested}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                style={{ backgroundColor: 'transparent' }}
              >
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-gray-900 dark:text-white font-medium">Not Interested</span>
              </button>
              
              <button
                onClick={handleReport}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                style={{ backgroundColor: 'transparent' }}
              >
                <Flag className="w-5 h-5 text-orange-500" />
                <span className="text-gray-900 dark:text-white font-medium">Report</span>
              </button>
              
              <button
                onClick={handleShareProfile}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                style={{ backgroundColor: 'transparent' }}
              >
                <Share className="w-5 h-5 text-blue-500" />
                <span className="text-gray-900 dark:text-white font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="sticky top-0 z-50 bg-opacity-95 backdrop-blur-sm px-4 py-3 flex items-center gap-3" style={{ backgroundColor: 'var(--bg)' }}>
        <button
          onClick={() => {
            if (canGoBack) {
              const destination = getBackDestination();
              navigate(destination.path, destination.state ? { state: destination.state } : {});
            }
          }}
          disabled={!canGoBack}
          className={`p-2 rounded-lg transition-colors ${
            canGoBack 
              ? 'hover:bg-overlay-light'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-primary">{user.displayName}</h1>
          <p className="text-sm text-secondary">{user.posts} posts</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* Empty space - 3 dots are in profile section, not header */}
        </div>
      </div>

      <div className="max-w-md mx-auto animate-in slide-in-from-top-4 duration-300">
        {/* Profile Header */}
        <div className="px-4 py-6">
          {/* Avatar and Name */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold gradient-text">{user.displayName}</h2>
                {user.verified && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-secondary text-sm mb-3">{user.username}</p>
              
              {/* Action Icons - Gift and 3 dots */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/rewards')}
                  className="w-8 h-8 rounded-full bg-overlay-light flex items-center justify-center"
                >
                  <Gift className="w-4 h-4 text-accent" />
                </button>
                <button 
                  onClick={handleProfileMenu}
                  className="w-8 h-8 rounded-full bg-overlay-light flex items-center justify-center"
                >
                  <MoreHorizontal className="w-4 h-4 text-secondary" />
                </button>
              </div>
            </div>
            
            {/* Follow Button - positioned on the right */}
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                user.isFollowing
                  ? 'bg-overlay-light text-primary hover:bg-overlay-medium'
                  : 'btn-primary'
              }`}
            >
              {user.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{user.followers.toLocaleString()}</div>
              <div className="text-secondary text-xs">FOLLOWERS</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{user.following.toLocaleString()}</div>
              <div className="text-secondary text-xs">FOLLOWING</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{user.posts}</div>
              <div className="text-secondary text-xs">POSTS</div>
            </div>
          </div>


          {/* Bio */}
          <div className="mb-6">
            <p className="text-primary text-sm leading-relaxed">{user.bio}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
            {[
              { id: 'posts', label: 'Posts' },
              { id: 'nft', label: 'NFT Holds' },
              { id: 'stats', label: 'Stats' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-accent'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 pb-24">
          {renderTabContent()}
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