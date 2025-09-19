import React, { useState } from 'react';
import { PostComposer } from '../components/Post/PostComposer';
import { PostCard } from '../components/Post/PostCard';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { mockPosts } from '../data/mockData';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  const { isDark } = useTheme();
  const { posts, loading, createPost, likePost, giftPost } = usePosts();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'following' | 'trenches' | 'trending'>('following');
  
  // For MVP demo - show mock posts if no real posts exist
  const displayPosts = posts.length > 0 ? posts : mockPosts.map(post => ({
    id: post.id,
    user_id: post.userId,
    content: post.content,
    likes: post.likes,
    replies: post.replies,
    shares: post.shares,
    gifts: post.gifts || 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: {
      username: post.username.replace('@', ''),
      avatar_url: null
    }
  }));

  const handlePost = async (content: string) => {
    if (!user || !profile) return;
    await createPost(content, user.id);
  };

  const handleLike = async (postId: string) => {
    await likePost(postId);
  };

  const handleGift = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const giftOptions = ['🎁 1 WGM', '💎 5 WGM', '🚀 10 WGM', '👑 25 WGM'];
    const selectedGift = prompt(`Send a gift to @${post.profiles.username}:\n\n${giftOptions.join('\n')}\n\nEnter gift (1, 5, 10, or 25):`);
    
    if (selectedGift && ['1', '5', '10', '25'].includes(selectedGift)) {
      await giftPost(postId);
      alert(`🎁 Sent ${selectedGift} WGM to @${post.profiles.username}!`);
    }
  };

  const handleBookmark = async (postId: string) => {
    // Bookmark functionality - in real app this would save to user's bookmarks
    console.log('Bookmarking post:', postId);
    alert('Post bookmarked! 📖');
  };
  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 pt-20 pb-24 text-center">
        <div className="animate-pulse">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-24">
      {/* Livestream Banner */}
      <div 
        onClick={() => navigate('/livestream')}
        onKeyDown={(e) => e.key === 'Enter' && navigate('/livestream')}
        role="button"
        tabIndex={0}
        aria-label="Go to livestreams"
        className="relative mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-2 right-6 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-3 right-12 w-1 h-1 bg-purple-200 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-4 left-20 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-50 animate-pulse delay-300"></div>
        
        <div className="relative flex items-center justify-between">
          {/* Left side - Avatars */}
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 ring-2 ring-white shadow-lg flex items-center justify-center text-white font-bold text-sm">
                🎬
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 ring-2 ring-white shadow-lg flex items-center justify-center text-white font-bold text-sm">
                🎮
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 ring-2 ring-white shadow-lg flex items-center justify-center text-white font-bold text-sm">
                🚀
              </div>
            </div>
            
            {/* Content */}
            <div className="ml-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-white font-bold text-lg tracking-wide">LIVE STREAMS</h3>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <p className="text-purple-100 text-sm font-medium">Join the action now</p>
            </div>
          </div>
          
          {/* Right side - Stats */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center justify-end space-x-1 mb-1">
                <Users className="w-4 h-4 text-purple-200" />
                <span className="text-white font-bold text-lg">2.4K</span>
              </div>
              <div className="flex items-center justify-end space-x-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-purple-100 text-xs font-medium">+127</span>
              </div>
            </div>
            
            {/* Activity pulse */}
            <div className="relative">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
              </div>
              <div className="absolute inset-0 w-8 h-8 border-2 border-white/30 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Feed Navigation */}
      <div className={`flex gap-1 mb-6 rounded-lg p-1 ${
        isDark ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-200 bg-opacity-70'
      }`}>
        {(['following', 'trenches', 'trending'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-purple-600 text-white'
                : isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {user && profile && (
        <PostComposer 
          onPost={handlePost}
          onCancel={() => {}}
        />
      )}
      
      <div>
        {displayPosts.map(post => (
          <PostCard
            key={post.id}
            post={{
              id: post.id,
              userId: post.user_id,
              username: `@${post.profiles.username}`,
              content: post.content,
              timestamp: posts.length > 0 ? new Date(post.created_at).toLocaleDateString() : (post as any).timestamp || '2h',
              likes: post.likes,
              replies: post.replies,
              shares: post.shares,
              gifts: post.gifts
            }}
            onLike={handleLike}
            onGift={handleGift}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
    </div>
  );
};