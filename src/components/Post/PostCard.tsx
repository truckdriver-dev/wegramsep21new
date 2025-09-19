import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Gift, Bookmark, Smile, Link, Copy, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../data/mockData';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onReply?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onGift?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onReply, onShare, onGift, onBookmark }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);

  const handleAvatarClick = () => {
    navigate(`/user/${post.username}`);
  };

  const handleGift = () => {
    onGift?.(post.id);
  };

  const handleBookmark = () => {
    onBookmark?.(post.id);
  };

  const handlePostReactions = () => {
    setShowMenu(false);
    alert('Post reactions feature coming soon! 😍');
  };

  const handleCopyLink = () => {
    const postUrl = `https://wegram.com/post/${post.id}`;
    navigator.clipboard?.writeText(postUrl);
    setShowMenu(false);
    alert('Post link copied to clipboard! 🔗');
  };

  const handleCopyText = () => {
    navigator.clipboard?.writeText(post.content);
    setShowMenu(false);
    alert('Post text copied to clipboard! 📋');
  };

  const handleReportPost = () => {
    setShowMenu(false);
    alert('Post reported. Thank you for keeping WEGRAM safe! 🛡️');
  };

  return (
    <div className="card mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <button onClick={handleAvatarClick} className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <span className="text-white text-sm font-semibold">
              {post.username.charAt(1).toUpperCase()}
            </span>
          </button>
          <div>
            <button onClick={handleAvatarClick} className="text-primary font-medium hover:text-purple-400 transition-colors cursor-pointer">
              {post.username}
            </button>
            <div className="text-secondary text-sm">{post.timestamp}</div>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {showMenu && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 top-8 z-20 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 min-w-48">
                <button
                  onClick={handlePostReactions}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-700 transition-colors text-primary"
                >
                  <Smile className="w-4 h-4 text-yellow-400" />
                  <span>Post reactions</span>
                </button>
                
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-700 transition-colors text-primary"
                >
                  <Link className="w-4 h-4 text-blue-400" />
                  <span>Copy link</span>
                </button>
                
                <button
                  onClick={handleCopyText}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-700 transition-colors text-primary"
                >
                  <Copy className="w-4 h-4 text-green-400" />
                  <span>Copy text</span>
                </button>
                
                <div className="border-t border-gray-700 my-1"></div>
                
                <button
                  onClick={handleReportPost}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-700 transition-colors text-red-400"
                >
                  <Flag className="w-4 h-4" />
                  <span>Report post</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="text-primary mb-4 leading-relaxed">{post.content}</p>

      <div className="flex items-center justify-between text-secondary">
        <button
          onClick={() => onLike?.(post.id)}
          className="flex items-center gap-2 hover:text-red-400 transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span className="text-sm">{post.likes}</span>
        </button>
        <button
          onClick={() => onReply?.(post.id)}
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{post.replies}</span>
        </button>
        <button
          onClick={() => onShare?.(post.id)}
          className="flex items-center gap-2 hover:text-green-400 transition-colors"
        >
          <Share className="w-4 h-4" />
          <span className="text-sm">{post.shares}</span>
        </button>
        <button
          onClick={handleGift}
          className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
        >
          <Gift className="w-4 h-4" />
          <span className="text-sm">{post.gifts || 0}</span>
        </button>
        <button
          onClick={handleBookmark}
          className="flex items-center gap-2 hover:text-purple-400 transition-colors"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};