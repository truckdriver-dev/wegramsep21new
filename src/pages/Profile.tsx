import React, { useState } from 'react';
import { User, Settings, Calendar, Edit3, Share, Grid3X3, Play, Camera, MessageCircle, UserPlus, MoreHorizontal, Heart, Gift } from 'lucide-react';
import { mockUser, mockPosts } from '../data/mockData';
import { MessageModal } from '../components/Layout/MessageModal';
import { PostCard } from '../components/Post/PostCard';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'tagged'>('posts');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Mock user posts - more realistic content
  const userPosts = [
    {
      id: 'user1',
      userId: mockUser.id,
      username: mockUser.username,
      content: 'Just hit my first 1000 followers on WEGRAM! 🚀 Thanks everyone for the support. The Web3 social revolution is here!',
      timestamp: '2h',
      likes: 89,
      replies: 23,
      shares: 12,
      gifts: 5
    },
    {
      id: 'user2',
      userId: mockUser.id,
      username: mockUser.username,
      content: 'Building in Web3 is incredible. Every day brings new possibilities. WEGRAM is changing how we think about social media 💎',
      timestamp: '1d',
      likes: 156,
      replies: 45,
      shares: 28,
      gifts: 12
    },
    {
      id: 'user3',
      userId: mockUser.id,
      username: mockUser.username,
      content: 'GM Web3 fam! ☀️ Another day, another opportunity to earn while we socialize. Love this community!',
      timestamp: '2d',
      likes: 67,
      replies: 18,
      shares: 9,
      gifts: 3
    },
    {
      id: 'user4',
      userId: mockUser.id,
      username: mockUser.username,
      content: 'The future of social media is decentralized. No more big tech controlling our data. We own our content, we earn from our engagement! 🔥',
      timestamp: '3d',
      likes: 234,
      replies: 67,
      shares: 45,
      gifts: 18
    },
    {
      id: 'user5',
      userId: mockUser.id,
      username: mockUser.username,
      content: 'Just earned 50 WGM tokens from my posts this week! 💰 This is what Web3 social should be - rewarding creators for their content.',
      timestamp: '4d',
      likes: 178,
      replies: 34,
      shares: 22,
      gifts: 8
    },
    {
      id: 'user6',
      userId: mockUser.id,
      username: mockUser.username,
      content: 'Attending the Web3 conference next week. Who else is going? Let\'s connect and talk about the future of decentralized social! 🤝',
      timestamp: '5d',
      likes: 92,
      replies: 28,
      shares: 15,
      gifts: 4
    }
  ];

  const handleEditProfile = () => {
    alert('Edit profile feature coming soon!');
  };

  const handleShareProfile = () => {
    const profileUrl = `https://wegram.com/user/${mockUser.username}`;
    if (navigator.share) {
      navigator.share({
        title: `${mockUser.username} on WEGRAM`,
        url: profileUrl
      }).catch(() => {
        // Fallback to clipboard if share fails
        navigator.clipboard?.writeText(profileUrl);
        alert('Profile link copied to clipboard!');
      });
    } else {
      navigator.clipboard?.writeText(profileUrl);
      alert('Profile link copied to clipboard!');
    }
  };

  const handleAddBio = () => {
    alert('Add bio feature coming soon!');
  };

  const handleFindPeople = () => {
    alert('Find people feature coming soon!');
  };

  const handleLike = (postId: string) => {
    console.log('Liking post:', postId);
  };

  const handleGift = (postId: string) => {
    console.log('Gifting post:', postId);
    alert('🎁 Gift sent!');
  };

  const handleBookmark = (postId: string) => {
    console.log('Bookmarking post:', postId);
    alert('📖 Post bookmarked!');
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-primary">{mockUser.username.replace('@', '')}</h1>
          <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-gray-700 rounded-full transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded-full transition-colors">
            <UserPlus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded-full transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compact Profile Section */}
      <div className="mb-6">
        {/* Avatar and Username */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Edit3 className="w-3 h-3 text-gray-800" />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary mb-1">{mockUser.username}</h2>
            <div className="flex items-center gap-2 text-secondary text-sm">
              <span>✨ Verified</span>
            </div>
            {/* Stats inline */}
            <div className="flex items-center gap-4 text-sm mt-2">
              <div>
                <span className="text-primary font-bold">{userPosts.length}</span>
                <span className="text-secondary ml-1">Posts</span>
              </div>
              <div>
                <span className="text-primary font-bold">1.2K</span>
                <span className="text-secondary ml-1">Followers</span>
              </div>
              <div>
                <span className="text-primary font-bold">834</span>
                <span className="text-secondary ml-1">Following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={handleEditProfile}
            className="btn-secondary py-2 text-xs font-medium"
          >
            Edit profile
          </button>
          <button
            onClick={handleShareProfile}
            className="btn-secondary py-2 text-xs font-medium"
          >
            Share profile
          </button>
          <button 
            onClick={() => setIsMessageModalOpen(true)}
            className="btn-secondary py-2 text-xs font-medium flex items-center justify-center"
          >
            <MessageCircle className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={handleAddBio}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            + Add bio
          </button>
          <span className="text-secondary">•</span>
          <button
            onClick={handleFindPeople}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            + Find people
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-2 text-center transition-colors relative ${
            activeTab === 'posts' ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Grid3X3 className="w-4 h-4 mx-auto mb-1" />
          <span className="text-xs">Posts</span>
          {activeTab === 'posts' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-2 text-center transition-colors relative ${
            activeTab === 'media' ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Play className="w-4 h-4 mx-auto mb-1" />
          <span className="text-xs">Media</span>
          {activeTab === 'media' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('tagged')}
          className={`flex-1 py-2 text-center transition-colors relative ${
            activeTab === 'tagged' ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Camera className="w-4 h-4 mx-auto mb-1" />
          <span className="text-xs">Tagged</span>
          {activeTab === 'tagged' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
          )}
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'posts' && (
        <div>
          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onGift={handleGift}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Grid3X3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-primary font-semibold mb-2">No posts yet</h3>
              <p className="text-secondary text-sm mb-4">Share your first post to get started</p>
              <button 
                onClick={() => alert('Create post feature coming soon!')}
                className="btn-primary px-6 py-2"
              >
                Create Post
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'media' && (
        <div className="text-center py-12">
          <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-primary font-semibold mb-2">No media yet</h3>
          <p className="text-secondary text-sm">Your photos and videos will appear here</p>
        </div>
      )}

      {activeTab === 'tagged' && (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-primary font-semibold mb-2">No tagged posts</h3>
          <p className="text-secondary text-sm">Posts you're tagged in will appear here</p>
        </div>
      )}
      
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientUsername={mockUser.username}
      />
    </div>
  );
};