import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Video, MoreHorizontal, Calendar, Users, ExternalLink } from 'lucide-react';
import { mockPosts } from '../data/mockData';
import { MessageModal } from '../components/Layout/MessageModal';

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

export const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  
  if (!username) {
    navigate('/home');
    return null;
  }

  const user = getUserData(username);
  const userPosts = mockPosts.filter(post => post.username === username);

  const handleFollow = () => {
    // Follow/unfollow logic would go here
    console.log('Follow/unfollow user:', username);
  };

  const handleMessage = () => {
    setIsMessageModalOpen(true);
  };

  const handleCall = () => {
    alert('Voice call feature coming soon!');
  };

  const handleVideoCall = () => {
    alert('Video call feature coming soon!');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-opacity-95 backdrop-blur-sm px-4 py-3 flex items-center gap-3" style={{ backgroundColor: 'var(--bg)' }}>
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-primary">{user.displayName}</h1>
          <p className="text-sm text-secondary">{user.posts} posts</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
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

          {/* Stats */}
          <div className="flex items-center gap-2 mb-4 text-sm text-secondary">
            <Users className="w-4 h-4" />
            <span>{user.mutualConnections} Mutual Connections</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={handleMessage}
              className="flex flex-col items-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-medium">Message</span>
            </button>
            <button
              onClick={handleCall}
              className="flex flex-col items-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span className="text-sm font-medium">Voice Call</span>
            </button>
            <button
              onClick={handleVideoCall}
              className="flex flex-col items-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <Video className="w-6 h-6" />
              <span className="text-sm font-medium">Video Call</span>
            </button>
          </div>

          {/* Member Since */}
          <div className="card mb-4">
            <h3 className="text-secondary font-medium mb-2">Member Since</h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-primary font-medium">{user.joinDate}</span>
            </div>
          </div>

          {/* Connections */}
          {user.connections.length > 0 && (
            <div className="card mb-4">
              <h3 className="text-secondary font-medium mb-3">Connections</h3>
              {user.connections.map((connection, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black bg-opacity-20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-medium">{connection.username}</span>
                        {connection.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="text-secondary text-sm">Member since {connection.memberSince}</div>
                      <div className="text-secondary text-sm">
                        {connection.posts.toLocaleString()} Posts • {connection.followers} Followers
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-secondary" />
                </div>
              ))}
            </div>
          )}

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
                ? 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                : 'btn-primary'
            }`}
          >
            {user.isFollowing ? 'Following' : 'Follow'}
          </button>

          {/* Recent Posts */}
          {userPosts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-primary font-semibold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {userPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="card">
                    <p className="text-primary mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-secondary text-sm">
                      <span>{post.timestamp}</span>
                      <div className="flex gap-4">
                        <span>{post.likes} likes</span>
                        <span>{post.replies} replies</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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