import React from 'react';
import { X, Home, TrendingUp, Compass, Gamepad2, MessageCircle, Gift, Bot, Video, Bell, RotateCcw, Grid3X3, Bookmark, Coins, Play, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/home' },
    { id: 'launch-token', label: 'Launch Your Token', icon: Coins, path: '/launch-token' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, path: '/trending' },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
    { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
    { id: 'staking', label: 'Staking', icon: Coins, path: '/staking' },
    { id: 'games', label: 'Games', icon: Gamepad2, path: '/games' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    { id: 'rewards', label: 'Rewards', icon: Gift, path: '/rewards' },
    { id: 'video', label: 'Video', icon: Play, path: '/video' },
    { id: 'ai', label: 'Wegram AI', icon: Bot, path: '/ai' },
    { id: 'livestream', label: 'Livestream', icon: Video, path: '/livestream' },
    { id: 'buy-wegram', label: 'Buy Wegram', icon: ShoppingCart, path: '/buy-wegram' }
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-80 max-w-sm bg-opacity-95 backdrop-blur-sm overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
        {/* Header with logo */}
        <div className="p-6 pb-20">
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="https://i.ibb.co/TxdWc0kL/IMG-9101.jpg"
              alt="WEGRAM Logo" 
              className="w-10 h-10 rounded-xl object-cover shadow-2xl border border-purple-400/30"
            />
            <span className="text-xl font-bold text-primary">WEGRAM</span>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.path)}
                className="w-full flex items-center gap-4 py-4 hover:bg-gray-700 transition-all duration-200 text-left group"
              >
                <Icon className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors duration-200" 
                      style={{
                        filter: 'drop-shadow(0 0 2px currentColor)',
                        background: 'linear-gradient(135deg, #00D4FF, #9945FF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }} />
                <span className="font-medium bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-200 bg-clip-text text-transparent">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Right side content area */}
      <div className="flex-1 relative" onClick={onClose}>
        {/* Top bar in drawer view */}
        <div className="p-4 flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search @handle or posts..."
              className="input pl-4 pr-4 text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Gift className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};