import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { PostComposer } from '../components/Post/PostComposer';
import { PostCard } from '../components/Post/PostCard';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { mockPosts } from '../data/mockData';

export const Home: React.FC = () => {
  const { posts, loading, createPost, likePost, giftPost } = usePosts();
  const { user, profile } = useAuth();
  
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